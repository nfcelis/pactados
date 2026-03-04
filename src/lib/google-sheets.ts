import dns from "node:dns";

type RegistroSheetsPayload = {
  fecha_iso: string;
  reto_titulo: string;
  reto_meta_diaria: string;
  reto_duracion_dias: string;
  creador_nombre_apodo: string;
  creador_telefono: string;
  num_participantes: string;
  participantes_info: string;
  consecuencia_texto: string;
  // Compatibilidad con versiones anteriores de Apps Script
  reto_meta?: string;
  duracion?: string;
  reto_duracion?: string;
  reto_duracion_dias_alt?: string;
  nombre_apodo?: string;
  nombre?: string;
  telefono_completo?: string;
  telefono?: string;
  participantes?: string;
  nombres_amigos?: string;
  consecuencia?: string;
  condiciones?: string;
  consecuencia_monto?: string;
  consecuencia_frecuencia?: string;
};

dns.setDefaultResultOrder("ipv4first");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function appendRegistroToGoogleSheets(payload: RegistroSheetsPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { sent: false, reason: "missing_webhook_url" } as const;
  }

  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  const url = new URL(webhookUrl);
  if (secret && !url.searchParams.get("secret")) {
    url.searchParams.set("secret", secret);
  }

  let response: Response | null = null;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
      });
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await sleep(700 * attempt);
      }
    }
  }

  if (!response) {
    throw new Error(
      `Google Sheets webhook network error: ${
        lastError instanceof Error ? lastError.message : String(lastError)
      }`
    );
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    throw new Error(
      `Google Sheets webhook error (${response.status}): ${bodyText || "no body"}`
    );
  }

  const raw = await response.text().catch(() => "");
  if (raw) {
    if (raw.trim().startsWith("<!DOCTYPE html") || raw.includes("no mostró ningún valor")) {
      throw new Error("Google Sheets webhook returned HTML/error page instead of JSON.");
    }

    try {
      const parsed = JSON.parse(raw) as { ok?: boolean; error?: string };
      if (parsed && parsed.ok === false) {
        throw new Error(`Google Sheets webhook rejected request: ${parsed.error || "unknown_error"}`);
      }
    } catch (parseError) {
      if (parseError instanceof Error && parseError.message.includes("Google Sheets webhook rejected")) {
        throw parseError;
      }
      // ignore non-JSON bodies
    }
  }

  return { sent: true } as const;
}
