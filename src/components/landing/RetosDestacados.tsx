import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  GraduationCap,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { RETOS } from "@/lib/retos-predefinidos";
import { Categoria, Dificultad } from "@/types";

const RETO_ICONS: Record<string, LucideIcon> = {
  Activity,
  BookOpen,
  GraduationCap,
  WifiOff,
};

const dificultadColor: Record<Dificultad, string> = {
  facil: "text-emerald-700",
  medio: "text-amber-700",
  dificil: "text-rose-700",
};

const dificultadLabel: Record<Dificultad, string> = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Dificil",
};

const categoriaStyles: Record<Categoria, string> = {
  fitness:
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,238,228,0.86))] border-white/35",
  lectura:
    "bg-[linear-gradient(180deg,rgba(255,248,231,0.92),rgba(255,233,196,0.85))] border-white/30",
  estudio:
    "bg-[linear-gradient(180deg,rgba(245,248,255,0.95),rgba(220,233,255,0.88))] border-white/30",
  habitos:
    "bg-[linear-gradient(180deg,rgba(255,244,236,0.95),rgba(255,220,205,0.88))] border-white/35",
};

export function RetosDestacados() {
  const destacados = RETOS.slice(0, 4);

  return (
    <section id="retos" className="px-6 pb-6 pt-7 md:px-8 lg:px-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
            Curados para arrancar
          </p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-white md:text-5xl">
            Retos disponibles
          </h2>
        </div>
        <Link
          href="/retos"
          className="font-body inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          Ver catalogo completo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {destacados.map((reto) => {
          const Icon = RETO_ICONS[reto.iconName] ?? Activity;

          return (
            <Link
              key={reto.slug}
              href={`/retos/${reto.slug}`}
              className={`group flex min-h-[212px] flex-col rounded-[28px] border p-5 shadow-[0_22px_48px_rgba(80,20,7,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(80,20,7,0.25)] ${categoriaStyles[reto.categoria]}`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="rounded-2xl bg-black/5 p-3 text-[#f47432]">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`font-body rounded-full bg-black/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${dificultadColor[reto.dificultad]}`}
                >
                  {dificultadLabel[reto.dificultad]}
                </span>
              </div>

              <h3 className="font-display max-w-[16ch] text-[1.8rem] uppercase leading-[0.95] text-[#2a1409]">
                {reto.titulo}
              </h3>
              <p className="font-body mt-3 line-clamp-3 text-sm leading-6 text-black/62">
                {reto.descripcion}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="font-body text-sm font-medium text-black/58">
                  {reto.duracion_dias} dias
                </span>
                <span className="font-body inline-flex items-center gap-2 text-sm font-semibold text-[#a5441f] transition group-hover:translate-x-1">
                  Quiero este reto
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
