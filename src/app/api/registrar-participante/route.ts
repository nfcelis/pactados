import { appendRegistroToGoogleSheets } from "@/lib/google-sheets";
import { getRetoPorSlug } from "@/lib/retos-predefinidos";
import { createResend } from "@/lib/resend";
import { createSupabaseClient } from "@/lib/supabase";
import { crearGrupoParaReto } from "@/lib/whatsapp-grupos";

type RegistroBody = {
  reto_slug: string;
  reto_titulo: string;
  reto_modalidad?: string;
  reto_meta_diaria: string;
  reto_duracion?: number;
  nombre_apodo: string;
  telefono_codigo: string;
  telefono_numero: string;
  num_participantes: number;
  participantes: Array<{ nombre: string; telefono_codigo: string; telefono_numero: string }>;
  consecuencia_monto: number;
  consecuencia_frecuencia: string;
};

function sanitizePhone(raw: string) {
  return raw.replace(/[^\d]/g, "");
}

function buildFallbackEmail(telefonoCompleto: string) {
  const digits = sanitizePhone(telefonoCompleto);
  return `${digits || Date.now()}@sin-email.local`;
}

function asSheetText(value: unknown) {
  const text = String(value ?? "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function inferDuracionDias(
  retoSlug: string,
  retoTitulo: string,
  retoDuracion?: number
) {
  if (typeof retoDuracion === "number" && retoDuracion > 0) return retoDuracion;

  const predefined = getRetoPorSlug(retoSlug);
  if (predefined?.duracion_dias) return predefined.duracion_dias;

  const match = retoTitulo.match(/(\d+)\s*d[ií]as?/i);
  if (match) return Number(match[1]);

  return 0;
}

export async function POST(req: Request) {
  let body: RegistroBody;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Cuerpo invalido" }, { status: 400 });
  }

  try {
    const {
      reto_slug,
      reto_titulo,
      reto_modalidad,
      reto_meta_diaria,
      reto_duracion,
      nombre_apodo,
      telefono_codigo,
      telefono_numero,
      num_participantes,
      participantes,
      consecuencia_monto,
      consecuencia_frecuencia,
    } = body;

    if (
      !reto_slug ||
      !reto_titulo ||
      !reto_meta_diaria ||
      !nombre_apodo ||
      !telefono_codigo ||
      !telefono_numero ||
      !num_participantes ||
      !Array.isArray(participantes) ||
      participantes.length !== num_participantes ||
      participantes.some((p) => !p?.nombre || !p?.telefono_codigo || !p?.telefono_numero) ||
      !consecuencia_monto ||
      !consecuencia_frecuencia
    ) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const duracionDias = inferDuracionDias(reto_slug, reto_titulo, reto_duracion);
    if (!duracionDias) {
      return Response.json({ error: "No se pudo determinar la duracion del reto" }, { status: 400 });
    }

    const telefonoCompleto = `${telefono_codigo} ${telefono_numero}`.trim();
    const consecuenciaTexto = `$${consecuencia_monto} (${consecuencia_frecuencia})`;
    const participantesInfo = participantes
      .map((p, i) => `${i + 1}. ${p.nombre} - ${p.telefono_codigo} ${p.telefono_numero}`)
      .join(" | ");

    let savedInSupabase = false;
    let savedInSheets = false;

    const hasSupabaseEnv =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (hasSupabaseEnv) {
      try {
        const supabase = createSupabaseClient();
        const { error } = await supabase.from("participantes").insert({
          reto_slug,
          nombre: nombre_apodo,
          email: buildFallbackEmail(telefonoCompleto),
          telefono: telefonoCompleto,
      condiciones: consecuenciaTexto,
      num_participantes,
      nombres_amigos: participantesInfo,
      mensaje: `Reto: ${reto_titulo} | Modalidad: ${reto_modalidad || "no definida"} | Meta: ${reto_meta_diaria} | Duracion: ${duracionDias} dias`,
    });

        if (error) {
          console.error("Supabase error:", error);
        } else {
          savedInSupabase = true;
        }
      } catch (supabaseError) {
        console.error("Supabase runtime error:", supabaseError);
      }
    } else {
      console.warn("Supabase no configurado. Se omitira guardado en Supabase.");
    }

    try {
      const sheetsResult = await appendRegistroToGoogleSheets({
        fecha_iso: asSheetText(new Date().toISOString()),
        reto_titulo: asSheetText(reto_titulo),
        reto_meta_diaria: asSheetText(reto_meta_diaria),
        reto_modalidad: asSheetText(reto_modalidad || "no definida"),
        reto_duracion_dias: asSheetText(duracionDias),
        creador_nombre_apodo: asSheetText(nombre_apodo),
        creador_telefono: asSheetText(telefonoCompleto),
        num_participantes: asSheetText(num_participantes),
        participantes_info: asSheetText(participantesInfo),
        consecuencia_texto: asSheetText(consecuenciaTexto),
        reto_meta: asSheetText(reto_meta_diaria),
        duracion: asSheetText(duracionDias),
        reto_duracion: asSheetText(duracionDias),
        reto_duracion_dias_alt: asSheetText(duracionDias),
        nombre_apodo: asSheetText(nombre_apodo),
        nombre: asSheetText(nombre_apodo),
        telefono_completo: asSheetText(telefonoCompleto),
        telefono: asSheetText(telefonoCompleto),
        participantes: asSheetText(participantesInfo),
        nombres_amigos: asSheetText(participantesInfo),
        consecuencia: asSheetText(consecuenciaTexto),
        condiciones: asSheetText(consecuenciaTexto),
        consecuencia_monto: asSheetText(consecuencia_monto),
        consecuencia_frecuencia: asSheetText(consecuencia_frecuencia),
      });

      if (!sheetsResult.sent) {
        console.warn(
          "Google Sheets no configurado. Falta GOOGLE_SHEETS_WEBHOOK_URL en variables de entorno."
        );
      } else {
        savedInSheets = true;
      }
    } catch (sheetsError) {
      console.error("Google Sheets error:", sheetsError);
    }

    if (!hasSupabaseEnv && !process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      return Response.json(
        { error: "No hay almacenamiento configurado (Supabase ni Google Sheets)." },
        { status: 500 }
      );
    }

    if (!savedInSupabase && !savedInSheets) {
      return Response.json(
        { error: "No se pudo guardar el registro en Supabase ni Google Sheets." },
        { status: 500 }
      );
    }

    // Crear grupo de WhatsApp (no bloquea el registro si falla)
    if (process.env.EVOLUTION_API_URL && process.env.EVOLUTION_API_KEY) {
      crearGrupoParaReto({
        retoSlug: reto_slug,
        tituloReto: reto_titulo,
        metaDiaria: reto_meta_diaria,
        nombreOrganizador: nombre_apodo,
        telefonoCodigoOrganizador: telefono_codigo,
        telefonoNumeroOrganizador: telefono_numero,
        participantes,
      }).catch((err) => console.error("Error creando grupo WhatsApp:", err));
    }

    if (process.env.RESEND_API_KEY && process.env.CREATOR_EMAIL) {
      try {
        const resend = createResend();
        await resend.emails.send({
          from: "Pactados <onboarding@resend.dev>",
          to: process.env.CREATOR_EMAIL,
          subject: `Nuevo registro WhatsApp: ${nombre_apodo} - ${reto_titulo}`,
          html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 24px; border-radius: 12px;">
            <h2 style="color: #F5E642; font-size: 24px; margin-bottom: 16px;">Nuevo registro para bot WhatsApp</h2>
            <p><strong>Nombre/Apodo:</strong> ${nombre_apodo}</p>
            <p><strong>Telefono:</strong> ${telefonoCompleto}</p>
            <p><strong>Reto:</strong> ${reto_titulo}</p>
            <p><strong>Modalidad:</strong> ${reto_modalidad || "No definida"}</p>
            <p><strong>Meta diaria:</strong> ${reto_meta_diaria}</p>
            <p><strong>Duracion:</strong> ${duracionDias} dias</p>
            <p><strong>Participantes:</strong> ${num_participantes}</p>
            <p><strong>Lista participantes:</strong><br/>${participantesInfo}</p>
            <p><strong>Consecuencia economica:</strong> ${consecuenciaTexto}</p>
          </div>
        `,
        });
      } catch (mailError) {
        console.error("Resend error:", mailError);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("API registrar-participante error:", error);
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
