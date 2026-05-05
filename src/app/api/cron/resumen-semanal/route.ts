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
    await resumenSemanal(grupo);
  }

  return Response.json({ ok: true });
}

async function resumenSemanal(grupo: any) {
  const { data: miembros } = await supabase
    .from("miembros_grupo")
    .select("*")
    .eq("grupo_id", grupo.id)
    .eq("estado", "activo")
    .order("dias_verificados", { ascending: false });

  if (!miembros || miembros.length === 0) return;

  const tablaEmoji = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

  const tabla = miembros
    .map(
      (m: any, i: number) =>
        `${tablaEmoji[i] || "▪️"} ${m.nombre} — ${m.dias_verificados} días ✅ | racha: ${m.racha_actual} 🔥`
    )
    .join("\n");

  const mensaje = `📊 *Resumen semanal — Pactados*

*Reto:* ${grupo.retos.titulo}

${tabla}

${
  grupo.modalidad === "racha"
    ? "🏆 *Modalidad Racha:* Ganan todos los que no fallen ningún día"
    : "🏆 *Modalidad El que más:* Gana quien más días verifique"
}

_¡Sigan así! La semana no ha terminado 💪_`;

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
