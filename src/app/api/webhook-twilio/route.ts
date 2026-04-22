import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // Twilio manda form-urlencoded, no JSON
  const formData = await req.formData();
  
  const body = formData.get("Body") as string;
  const from = formData.get("From") as string; // "whatsapp:+573001234567"
  const to = formData.get("To") as string;     // "whatsapp:+14155238886" (sandbox)

  console.log("MENSAJE RECIBIDO:", { body, from, to });

  // Limpiar el número
  const senderPhone = from.replace("whatsapp:+", "");

  // Por ahora usamos un grupo de prueba fijo
  const { data: grupoReto } = await supabase
    .from("grupos_retos")
    .select("*, retos(*)")
    .eq("whatsapp_group_id", "120363TEST@g.us")
    .eq("activo", true)
    .single();

  if (!grupoReto) {
    return new Response(twilioReply("No hay reto activo configurado."), {
      headers: { "Content-Type": "text/xml" },
    });
  }

  // Evaluar con Claude
  const evaluacion = await evaluarVerificacion({
    contenido: body,
    tipo: "texto",
    metaDiaria: grupoReto.retos.meta_diaria,
    tituloReto: grupoReto.retos.titulo,
  });

  console.log("EVALUACION:", JSON.stringify(evaluacion, null, 2));

  // Twilio espera una respuesta TwiML
  if (!evaluacion.esVerificacion) {
    return new Response(twilioReply(""), {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const mensaje = evaluacion.aprobado
    ? `${evaluacion.emoji} *¡Verificación aprobada!*\n${evaluacion.razon}`
    : `${evaluacion.emoji} *No aprobado.*\n${evaluacion.razon}\n\n_Manda más detalles 💪_`;

  // Guardar si fue aprobado
  if (evaluacion.aprobado) {
    const participante = await buscarParticipante(senderPhone, grupoReto.reto_id);
    if (participante) {
      await supabase.from("verificaciones").insert({
        participante_id: participante.id,
        fecha: new Date().toISOString().split("T")[0],
        completado: true,
        transcripcion: body,
        metodo: "texto_whatsapp",
      });
    }
  }

  return new Response(twilioReply(mensaje), {
    headers: { "Content-Type": "text/xml" },
  });
}

// Twilio necesita respuesta en formato TwiML
function twilioReply(mensaje: string): string {
  if (!mensaje) return `<Response></Response>`;
  return `<Response><Message>${mensaje}</Message></Response>`;
}

async function evaluarVerificacion({ contenido, tipo, metaDiaria, tituloReto }: any) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: `Eres el verificador de PMC, una plataforma de retos de disciplina personal.
Responde ÚNICAMENTE en JSON con este formato exacto:
{
  "esVerificacion": true/false,
  "aprobado": true/false,
  "razon": "máximo 2 oraciones en español",
  "emoji": "✅ o ❌ o 🤔"
}

Criterios ESTRICTOS:
- esVerificacion: ¿el mensaje claramente intenta reportar que completó la actividad?
- aprobado: debe tener AL MENOS 3 de estos:
    1. Cantidad específica (páginas, km, minutos)
    2. Contenido concreto (tema, capítulo, concepto)
    3. Reflexión o aprendizaje propio
    4. Contexto temporal (hoy, esta mañana, etc)
- Mensajes vagos como "hoy lo hice" NO son válidos.
- Sé estricto: si hay duda, no aprobar.`,
      messages: [
        {
          role: "user",
          content: `Reto: ${tituloReto}
Meta diaria: ${metaDiaria}
Tipo: ${tipo}

Contenido:
"${contenido}"

¿Es verificación válida?`,
        },
      ],
    }),
  });

  const result = await res.json();
  try {
    const text = result.content[0].text;
    const clean = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    console.log("ERROR CLAUDE:", JSON.stringify(result, null, 2));
    return { esVerificacion: false, aprobado: false, razon: "Error evaluando", emoji: "🤔" };
  }
}

async function buscarParticipante(telefono: string, retoId: string) {
  const { data } = await supabase
    .from("participantes")
    .select("*")
    .eq("reto_id", retoId)
    .ilike("telefono", `%${telefono}%`)
    .single();
  return data;
}