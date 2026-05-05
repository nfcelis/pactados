import { Reto } from "@/types";

export const RETOS: Reto[] = [
  {
    slug: "correr-30-dias",
    titulo: "30 dias corriendo",
    iconName: "Activity",
    categoria: "fitness",
    duracion_dias: 30,
    meta_diaria: "Correr minimo 2 km cada dia",
    dificultad: "medio",
    descripcion:
      "Un mes sin saltarte ni un dia. Construye el habito desde cero o lleva tu rutina al siguiente nivel.",
  },
  {
    slug: "leer-un-libro",
    titulo: "Leer 1 libro en 21 dias",
    iconName: "BookOpen",
    categoria: "lectura",
    duracion_dias: 21,
    meta_diaria: "Leer minimo 20 paginas al dia",
    dificultad: "facil",
    descripcion:
      "21 dias. 20 paginas diarias. Un libro completo. Simple, verificable, transformador.",
  },
  {
    slug: "estudiar-diario",
    titulo: "Estudiar 1 hora por 30 dias",
    iconName: "GraduationCap",
    categoria: "estudio",
    duracion_dias: 30,
    meta_diaria: "1 hora de estudio enfocado sin distracciones",
    dificultad: "medio",
    descripcion:
      "Sin telefono, sin redes. Solo tu y el tema que quieres dominar.",
  },
  {
    slug: "sin-redes-sociales",
    titulo: "7 dias sin redes sociales",
    iconName: "WifiOff",
    categoria: "habitos",
    duracion_dias: 7,
    meta_diaria: "Cero Instagram, TikTok, Twitter/X",
    dificultad: "dificil",
    descripcion:
      "La semana mas dificil que tendras. Y probablemente la mas productiva de tu vida.",
  },
];

export function getRetoPorSlug(slug: string): Reto | undefined {
  return RETOS.find((r) => r.slug === slug);
}
