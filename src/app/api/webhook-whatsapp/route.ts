import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { event, data } = body;

  if (event !== "messages.upsert") return Response.json({ ok: true });

  const groupId = data?.key?.remoteJid;
  const isGroup = groupId?.endsWith("@g.us");
  if (!isGroup) return Response.json({ ok: true });

  const senderPhone = data?.key?.participant?.replace("@s.whatsapp.net", "");
  const isAudio = !!data?.message?.audioMessage;
  const isText = !!(data?.message?.conversation || data?.message?.extendedTextMessage?.text);
  const isImage = !!data?.message?.imageMessage;
  const texto = data?.message?.conversation || data?.message?.extendedTextMessage?.text || "";

  if (!isAudio && !isText && !isImage) return Response.json({ ok: true });

  // Buscar grupo en Supabase
  const { data: grupoReto } = await supabase
    .from("grupos_retos")
    .select("*, retos(*)")
    .eq("whatsapp_group_id", groupId)
    .eq("activo", true)
    .single();

  if (!grupoReto) return Response.json({ ok: true });

  // Determinar tipo de mensaje
  let tipo = "ignorar";

  if (isImage && grupoReto.estado === "esperando_pagos") {
    tipo = "comprobante";
  } else if (isText && /^(confirmo|rechazo)\s+\w+/i.test(texto) && grupoReto.estado === "esperando_pagos") {
    tipo = "confirmacion_pago";
  } else if ((isAudio || isText) && grupoReto.estado === "activo") {
    tipo = "verificacion";
  }

  if (tipo === "ignorar") return Response.json({ ok: true });

  console.log("MANDANDO A N8N:", { tipo, groupId, senderPhone });

  // Mandar todo a n8n
  const webhookUrl = tipo === "verificacion"
    ? process.env.N8N_WEBHOOK_VALIDACIONES
    : process.env.N8N_WEBHOOK_PAGOS;

  console.log("WEBHOOK URL:", webhookUrl);

  const n8nRes = await fetch(webhookUrl!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo,
      groupId,
      senderPhone,
      isAudio,
      isText,
      isImage,
      texto,
      messageData: data,
      reto: {
        id: grupoReto.reto_id,
        titulo: grupoReto.retos.titulo,
        metaDiaria: grupoReto.retos.meta_diaria,
        categoria: grupoReto.retos.categoria,
        dificultad: grupoReto.retos.dificultad,
      },
      grupo: {
        id: grupoReto.id,
        estado: grupoReto.estado,
        modalidad: grupoReto.modalidad,
        organizador_telefono: grupoReto.organizador_telefono,
        monto_por_persona: grupoReto.monto_por_persona,
      }
    }),
  });

  let resultado: any = {};
  try {
    const text = await n8nRes.text();
    console.log("RESPUESTA N8N RAW:", text);
    resultado = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error("ERROR PARSEANDO N8N:", e);
    resultado = {};
  }
  // Si n8n devuelve un mensaje para mandar al grupo
  if (resultado?.mensajeGrupo) {
    await enviarMensaje(groupId, resultado.mensajeGrupo);
  }

  return Response.json({ ok: true });
}

async function enviarMensaje(groupId: string, texto: string) {
  await fetch(
    `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.EVOLUTION_API_KEY!,
      },
      body: JSON.stringify({ number: groupId, text: texto }),
    }
  );
}