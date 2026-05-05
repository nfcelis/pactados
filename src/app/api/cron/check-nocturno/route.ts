import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: grupos } = await supabase
    .from("grupos_retos")
    .select("*, retos(*)")
    .eq("estado", "activo")
    .eq("activo", true);

  if (!grupos || grupos.length === 0) {
    return Response.json({ ok: true, message: "No hay grupos activos" });
  }

  for (const grupo of grupos) {
    await checkNocturno(grupo);
  }

  return Response.json({ ok: true });
}

async function checkNocturno(grupo: any) {
  const hoy = new Date().toISOString().split("T")[0];

  const { data: miembros } = await supabase
    .from("miembros_grupo")
    .select("*")
    .eq("grupo_id", grupo.id)
    .eq("estado", "activo");

  if (!miembros) return;

  const { data: verificacionesHoy } = await supabase
    .from("verificaciones")
    .select("participante_id")
    .eq("fecha", hoy)
    .eq("completado", true);

  const yaVerificaron = verificacionesHoy?.map((v) => v.participante_id) || [];
  const pendientes = miembros.filter((m) => !yaVerificaron.includes(m.id));
  const completados = miembros.filter((m) => yaVerificaron.includes(m.id));

  for (const miembro of pendientes) {
    await supabase
      .from("miembros_grupo")
      .update({ racha_actual: 0 })
      .eq("id", miembro.id);
  }

  for (const miembro of completados) {
    const nuevaRacha = (miembro.racha_actual || 0) + 1;
    await supabase
      .from("miembros_grupo")
      .update({
        racha_actual: nuevaRacha,
        racha_maxima: Math.max(nuevaRacha, miembro.racha_maxima || 0),
        dias_verificados: (miembro.dias_verificados || 0) + 1,
      })
      .eq("id", miembro.id);
  }

  const emoji = pendientes.length === 0 ? "🔥" : "📊";
  const mensaje = `${emoji} *Resumen del día — ${hoy}*

✅ Cumplieron (${completados.length}): ${completados.length > 0 ? completados.map((m: any) => m.nombre).join(", ") : "nadie aún"}
❌ Fallaron (${pendientes.length}): ${pendientes.length > 0 ? pendientes.map((m: any) => m.nombre).join(", ") : "¡ninguno!"}

${pendientes.length === 0 ? "¡Día perfecto! Todos cumplieron 🏆" : `${pendientes.map((m: any) => m.nombre).join(", ")} ${pendientes.length === 1 ? "perdió" : "perdieron"} la racha de hoy 😬`}`;

  await fetch(
    `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.EVOLUTION_API_KEY!,
      },
      body: JSON.stringify({
        number: grupo.whatsapp_group_id,
        text: mensaje,
      }),
    }
  );
}
