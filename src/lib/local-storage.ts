import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

type LocalRegistroPayload = {
  fecha_iso: string;
  reto_titulo: string;
  reto_meta_diaria: string;
  reto_duracion_dias: number;
  creador_nombre_apodo: string;
  creador_telefono: string;
  num_participantes: number;
  participantes_info: string;
  consecuencia_texto: string;
};

function getStoragePath() {
  const customPath = process.env.LOCAL_STORAGE_FILE?.trim();
  if (customPath) return customPath;
  return path.join(process.cwd(), ".data", "registros.ndjson");
}

export async function appendRegistroToLocalFile(payload: LocalRegistroPayload) {
  const filePath = getStoragePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
  return { saved: true, path: filePath } as const;
}
