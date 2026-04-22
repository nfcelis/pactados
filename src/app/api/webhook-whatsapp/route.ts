import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { event, data } = body;

  if (event !== "messages.upsert") {
    return Response.json({ ok: true });
  }

  const isAudio = !!data?.message?.audioMessage;
  const isText = !!(
    data?.message?.conversation ||
    data?.message?.extendedTextMessage?.text
  );
  const groupId = data?.key?.remoteJid;
  const isGroup = groupId?.endsWith("@g.us");
  const senderPhone = data?.key?.participant?.replace("@s.whatsapp.net", "");

  if (!isGroup) return Response.json({ ok: true });

  const { data: grupoReto } = await supabase
    .from("grupos_retos")
    .select("*, retos(*)")
    .eq("whatsapp_group_id", groupId)
    .eq("activo", true)
    .single();

  if (!grupoReto) return Response.json({ ok: true });

  if (isAudio) {
    await procesarAudio({ data, grupoReto, senderPhone, groupId });
  }

  if (isText) {
    const texto =
      data.message?.conversation ||
      data.message?.extendedTextMessage?.text || "";
    await procesarTexto({ texto, grupoReto, senderPhone, groupId });
  }

  return Response.json({ ok: true });
}

async function procesarAudio({ data, grupoReto, senderPhone, groupId }: any) {
  try {
    const mediaRes = await fetch(
      `${process.env.EVOLUTION_API_URL}/chat/getBase64FromMediaMessage/${process.env.EVOLUTION_INSTANCE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.EVOLUTION_API_KEY!,
        },
        body: JSON.stringify({ message: data }),
      }
    );
    const { base64 } = await mediaRes.json();

    const audioBuffer = Buffer.from(base64, "base64");
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([audioBuffer], { type: "audio/ogg" }),
      "audio.ogg"
    );
    formData.append("model", "whisper-1");
    formData.append("language", "es");

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: formData,
      }
    );
    const { text: transcripcion } = await whisperRes.json();

    const evaluacion = await evaluarVerificacion({
      contenido: transcripcion,
      tipo: "audio",
      metaDiaria: grupoReto.retos.meta_diaria,
      tituloReto: grupoReto.retos.titulo,
    });

    const participante = await buscarParticipante(senderPhone, grupoReto.reto_id);
    await responderEnGrupo(groupId, evaluacion, participante?.nombre || senderPhone);

    if (evaluacion.aprobado && participante) {
      await supabase.from("verificaciones").insert({
        participante_id: participante.id,
        fecha: new Date().toISOString().split("T")[0],
        completado: true,
        transcripcion,
        metodo: "audio_whatsapp",
      });
    }
  } catch (error) {
    console.error("Error procesando audio:", error);
  }
}

async function procesarTexto({ texto, grupoReto, senderPhone, groupId }: any) {
  if (texto.length < 15) return;

  try {
    const evaluacion = await evaluarVerificacion({
      contenido: texto,
      tipo: "texto",
      metaDiaria: grupoReto.retos.meta_diaria,
      tituloReto: grupoReto.retos.titulo,
    });
    console.log("EVALUACION:", JSON.stringify(evaluacion, null, 2)); // agregar esto


    if (evaluacion.esVerificacion) {
      const participante = await buscarParticipante(senderPhone, grupoReto.reto_id);
      await responderEnGrupo(groupId, evaluacion, participante?.nombre || senderPhone);

      if (evaluacion.aprobado && participante) {
        await supabase.from("verificaciones").insert({
          participante_id: participante.id,
          fecha: new Date().toISOString().split("T")[0],
          completado: true,
          transcripcion: texto,
          metodo: "texto_whatsapp",
        });
      }
    }
  } catch (error) {
    console.error("Error procesando texto:", error);
  }
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
Tu trabajo: evaluar si un mensaje es una verificación válida del reto diario.

Responde ÚNICAMENTE en JSON con este formato exacto:
{
  "esVerificacion": true/false,
  "aprobado": true/false,
  "razon": "máximo 2 oraciones en español",
  "emoji": "✅ o ❌ o 🤔"
}

Criterios ESTRICTOS:
- esVerificacion: ¿el mensaje claramente intenta reportar que completó la actividad?
- aprobado: el mensaje debe tener AL MENOS 3 de estos elementos:
    1. Cantidad específica (páginas, km, minutos)
    2. Contenido concreto de lo que leyó/hizo (tema, capítulo, concepto)
    3. Reflexión o aprendizaje propio sobre lo que hizo
    4. Contexto temporal (hoy, esta mañana, etc)
- Un audio de menos de 30 segundos o texto muy corto SIN detalles NO es válido.
- "hoy lo hice" o "leí mis páginas" sin más contexto NO es válido.
- Sé estricto: si hay duda, no aprobar.`,
      messages: [
        {
          role: "user",
          content: `Reto: ${tituloReto}
Meta diaria: ${metaDiaria}
Tipo de mensaje: ${tipo}

Contenido:
"${contenido}"

¿Es una verificación válida?`,
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
    console.log("RESULTADO CLAUDE RAW:", JSON.stringify(result, null, 2));
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

async function responderEnGrupo(groupId: string, evaluacion: any, nombre: string) {
  const mensaje = evaluacion.aprobado
    ? `${evaluacion.emoji} *¡Verificación aprobada, ${nombre}!*\n${evaluacion.razon}`
    : `${evaluacion.emoji} *No aprobado, ${nombre}.*\n${evaluacion.razon}\n\n_Manda más detalles 💪_`;

  await fetch(
    `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.EVOLUTION_API_KEY!,
      },
      body: JSON.stringify({ number: groupId, text: mensaje }),
    }
  );
}
