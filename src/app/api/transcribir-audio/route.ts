export async function POST(req: Request) {
  const { messageData } = await req.json();

  try {
    // 1. Descargar audio de Evolution API
    const evoRes = await fetch(
      `${process.env.EVOLUTION_API_URL}/chat/getBase64FromMediaMessage/${process.env.EVOLUTION_INSTANCE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.EVOLUTION_API_KEY!,
        },
        body: JSON.stringify({ message: messageData }),
      }
    );
    const { base64 } = await evoRes.json();
    if (!base64) return Response.json({ error: "No se pudo descargar el audio" }, { status: 400 });

    // 2. Transcribir con Whisper
    const audioBuffer = Buffer.from(base64, "base64");
    const formData = new FormData();
    formData.append("file", new Blob([audioBuffer], { type: "audio/ogg" }), "audio.ogg");
    formData.append("model", "whisper-1");
    formData.append("language", "es");

    const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: formData,
    });

    const { text } = await whisperRes.json();
    if (!text) return Response.json({ error: "No se pudo transcribir" }, { status: 400 });

    return Response.json({ transcripcion: text });
  } catch (error) {
    console.error("Error transcribiendo:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
