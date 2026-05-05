const EVOLUTION_URL = process.env.EVOLUTION_API_URL!;
const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE = process.env.EVOLUTION_INSTANCE!;

function getServiceSupabase() {
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ─── Verificar si ya existe un grupo activo con estos teléfonos ────

export async function grupoYaExiste(
  retoId: string,
  telefonos: string[]
): Promise<boolean> {
  const supabase = getServiceSupabase();

  const { data } = await supabase
    .from("grupos_retos")
    .select("participantes_telefonos")
    .eq("reto_id", retoId)
    .eq("activo", true);

  if (!data || data.length === 0) return false;

  for (const grupo of data) {
    const telefonosGrupo: string[] = grupo.participantes_telefonos || [];
    const mismosParticipantes = telefonos.every((t) => telefonosGrupo.includes(t));
    if (mismosParticipantes) return true;
  }

  return false;
}

// ─── Crear grupo en WhatsApp vía Evolution API ─────────────────────

export async function crearGrupoWhatsApp(
  nombreGrupo: string,
  participantes: string[]
): Promise<{ groupId: string | null; noAgregados: string[] }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${EVOLUTION_URL}/group/create/${INSTANCE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: EVOLUTION_KEY,
      },
      body: JSON.stringify({
        subject: nombreGrupo,
        participants: participantes.map((p) => `${p}@s.whatsapp.net`),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await res.json();
    console.log("GRUPO CREADO:", JSON.stringify(data, null, 2));

    const groupId = data?.id || null;

    // Detectar quiénes no fueron añadidos
    const agregados = (data?.participants || [])
      .map((p: any) => p.phoneNumber?.replace("@s.whatsapp.net", ""))
      .filter(Boolean);

    const noAgregados = participantes.filter((p) => !agregados.includes(p));

    console.log("No agregados:", noAgregados);

    return { groupId, noAgregados };
  } catch (error) {
    console.error("Error creando grupo:", error);
    return { groupId: null, noAgregados: [] };
  }
}

// ─── Mensaje de bienvenida al grupo ───────────────────────────────
export async function mandarBienvenida(
  groupId: string,
  tituloReto: string,
  metaDiaria: string,
  nombreOrganizador: string,
  faltantes: string[] = [],
  linkGrupo?: string
) {
  console.log("MANDANDO BIENVENIDA a:", groupId);
  const mensajeFaltantes = faltantes.length > 0
    ? `\n⚠️ No pudimos añadir a *${faltantes.join(", ")}* automáticamente.\nCompárteles este link para que se unan:\n${linkGrupo}\n`
    : "";

  const mensaje = `🎯 *¡Bienvenidos a Pactados!*

Han sido añadidos al reto: *${tituloReto}*
${mensajeFaltantes}
📋 *Meta diaria:* ${metaDiaria}

📲 *¿Cómo verificar?*
Cada día manda un audio o mensaje contando:
1️⃣ Cuánto hiciste (páginas, km, minutos)
2️⃣ Qué aprendiste o cómo te fue
3️⃣ Cuándo lo hiciste

El bot evaluará automáticamente si tu verificación es válida.

*Organizador:* ${nombreOrganizador}
¡Mucho éxito a todos! 💪`;

  const resBienvenida = await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: EVOLUTION_KEY,
    },
    body: JSON.stringify({ number: groupId, text: mensaje }),
  });
  const dataBienvenida = await resBienvenida.json();
  console.log("RESPUESTA BIENVENIDA (Evolution API):", JSON.stringify(dataBienvenida, null, 2));
}
// ─── Obtener link de invitación del grupo ──────────────────────────

export async function obtenerLinkInvitacion(groupId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${EVOLUTION_URL}/group/inviteCode/${INSTANCE}?groupJid=${groupId}`,
      {
        headers: { apikey: EVOLUTION_KEY },
      }
    );
    const data = await res.json();
    console.log("LINK INVITACION:", JSON.stringify(data, null, 2));
    return data?.inviteCode
      ? `https://chat.whatsapp.com/${data.inviteCode}`
      : null;
  } catch {
    return null;
  }
}



// ─── Función principal ─────────────────────────────────────────────

export async function crearGrupoParaReto({
  retoSlug,
  tituloReto,
  metaDiaria,
  nombreOrganizador,
  telefonoCodigoOrganizador,
  telefonoNumeroOrganizador,
  participantes,
  duracionDias,
  montoPorPersona,
  modalidad,
  frecuenciaPenalidad,
}: {
  retoSlug: string;
  tituloReto: string;
  metaDiaria: string;
  nombreOrganizador: string;
  telefonoCodigoOrganizador: string;
  telefonoNumeroOrganizador: string;
  participantes: Array<{ nombre: string; telefono_codigo: string; telefono_numero: string }>;
  duracionDias?: number;
  montoPorPersona?: number;
  modalidad?: string;
  frecuenciaPenalidad?: string;
}): Promise<{ ok: boolean; groupId?: string; linkInvitacion?: string; error?: string }> {
  const supabase = getServiceSupabase();

  // 1. Obtener reto_id desde el slug
  const { data: reto } = await supabase
    .from("retos")
    .select("id")
    .eq("slug", retoSlug)
    .single();

  if (!reto) {
    console.error("Reto no encontrado para slug:", retoSlug);
    return { ok: false, error: "Reto no encontrado" };
  }

  // 2. Construir lista de teléfonos (sin +, sin espacios)
  const limpiarTelefono = (codigo: string, numero: string) =>
    (codigo + numero).replace(/\D/g, "");

  const telefonoOrganizador = limpiarTelefono(
    telefonoCodigoOrganizador,
    telefonoNumeroOrganizador
  );

  const todosLosTelefonos = [
  ...new Set([
    telefonoOrganizador,
    ...participantes.map((p) => limpiarTelefono(p.telefono_codigo, p.telefono_numero)),
  ])
];



  console.log("Participantes del grupo:", todosLosTelefonos);

  // 3. Anti-spam: verificar si ya existe un grupo igual
  const yaExiste = await grupoYaExiste(reto.id, todosLosTelefonos);
  if (yaExiste) {
    console.log("Grupo ya existe, no se crea otro");
    return { ok: false, error: "Ya existe un grupo con estos participantes" };
  }

  // 4. Crear el grupo
  const nombreGrupo = `Pactados - ${tituloReto}`;
  const { groupId, noAgregados } = await crearGrupoWhatsApp(nombreGrupo, todosLosTelefonos);

  if (!groupId) {
    return { ok: false, error: "No se pudo crear el grupo" };
  }

  // 5. Guardar en Supabase
  const fechaInicio = new Date().toISOString().split("T")[0];
  const fechaFin = duracionDias
    ? new Date(Date.now() + duracionDias * 86400000).toISOString().split("T")[0]
    : null;

  await supabase.from("grupos_retos").insert({
    reto_id: reto.id,
    whatsapp_group_id: groupId,
    activo: true,
    participantes_telefonos: todosLosTelefonos,
    organizador_telefono: telefonoOrganizador,
    fecha_inicio: fechaInicio,
    fecha_fin: fechaFin,
    monto_por_persona: montoPorPersona ?? null,
    modalidad: modalidad ?? null,
    frecuencia_penalidad: frecuenciaPenalidad ?? null,
  });

  // 6. Obtener link siempre
  console.log("OBTENIENDO LINK...");
  const linkGrupo = await obtenerLinkInvitacion(groupId);
  console.log("LINK OBTENIDO:", linkGrupo);

  // 7. Mensaje de bienvenida en el grupo
  const nombresFaltantes = noAgregados.map((tel) => {
    const todos = [
      { nombre: nombreOrganizador, telefono: telefonoOrganizador },
      ...participantes.map((p) => ({
        nombre: p.nombre,
        telefono: limpiarTelefono(p.telefono_codigo, p.telefono_numero),
      })),
    ];
    return todos.find((p) => p.telefono === tel)?.nombre || tel;
  });

  console.log("MANDANDO BIENVENIDA...", { groupId, nombresFaltantes, linkGrupo });
  await mandarBienvenida(
    groupId,
    tituloReto,
    metaDiaria,
    nombreOrganizador,
    nombresFaltantes,
    linkGrupo || undefined
  );
  console.log("BIENVENIDA ENVIADA");

  return { ok: true, groupId, linkInvitacion: linkGrupo || undefined };
}
