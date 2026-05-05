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
    await mandarRecordatorio(grupo);
  }

  return Response.json({ ok: true, grupos: grupos.length });
}

async function mandarRecordatorio(grupo: any) {
  const hoy = new Date().toISOString().split("T")[0];

  const { data: verificacionesHoy } = await supabase
    .from("verificaciones")
    .select("participante_id")
    .eq("fecha", hoy)
    .eq("completado", true);

  const yaVerificaron = verificacionesHoy?.map((v) => v.participante_id) || [];

  const { data: miembros } = await supabase
    .from("miembros_grupo")
    .select("*")
    .eq("grupo_id", grupo.id)
    .eq("estado", "activo");

  if (!miembros || miembros.length === 0) return;

  const pendientes = miembros.filter((m) => !yaVerificaron.includes(m.id));
  const completados = miembros.filter((m) => yaVerificaron.includes(m.id));

  const mensaje = `☀️ *¡Buenos días, Pactados!*

📋 *Reto:* ${grupo.retos.titulo}
🎯 *Meta de hoy:* ${grupo.retos.meta_diaria}

${completados.length > 0 ? `✅ Ya verificaron: ${completados.map((m: any) => m.nombre).join(", ")}` : ""}
${pendientes.length > 0 ? `⏳ Pendientes: ${pendientes.map((m: any) => m.nombre).join(", ")}` : "✅ ¡Todos verificaron ayer!"}

_Manda tu verificación cuando completes el reto de hoy 💪_`;

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
