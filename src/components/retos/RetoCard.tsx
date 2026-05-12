import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Target,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

import { Reto, Dificultad } from "@/types";

const RETO_ICONS: Record<string, LucideIcon> = {
  Activity,
  BookOpen,
  GraduationCap,
  WifiOff,
};

const dificultadColor: Record<Dificultad, string> = {
  facil: "#34b56a",
  medio: "#f39c41",
  dificil: "#eb5a44",
};

const dificultadLabel: Record<Dificultad, string> = {
  facil: "Facil",
  medio: "Medio",
  dificil: "Dificil",
};

interface RetoCardProps {
  reto: Reto;
}

export function RetoCard({ reto }: RetoCardProps) {
  const Icon = RETO_ICONS[reto.iconName] ?? Activity;
  const color = dificultadColor[reto.dificultad];

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[#efd3b1] bg-[linear-gradient(180deg,rgba(255,251,245,0.94),rgba(255,238,212,0.76))] p-6 shadow-[0_22px_44px_rgba(171,91,27,0.1),inset_0_1px_0_rgba(255,255,255,0.78)] transition duration-300 hover:-translate-y-1.5 hover:border-[#f1a15f] hover:shadow-[0_28px_54px_rgba(210,101,28,0.16)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,207,120,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,153,71,0.1),transparent_34%)] opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}22, inset 0 0 0 2px rgba(255,255,255,0.24)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(180deg,#fff5ea,#ffe2c0)] shadow-[0_10px_18px_rgba(190,109,41,0.12)]">
            <Icon className="h-6 w-6" style={{ color }} strokeWidth={2.2} />
          </div>
          <div>
            <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#cb7e44]">
              Reto pactado
            </p>
            <h3 className="font-display mt-1 text-[2rem] uppercase leading-[0.88] text-[#201b18]">
              {reto.titulo}
            </h3>
          </div>
        </div>

        <span
          className="font-body rounded-full px-3 py-1.5 text-xs font-bold shadow-[0_8px_16px_rgba(130,77,27,0.08)]"
          style={{
            color,
            backgroundColor: `${color}18`,
            border: `1px solid ${color}24`,
          }}
        >
          {dificultadLabel[reto.dificultad]}
        </span>
      </div>

      <p className="font-body relative z-10 mt-5 min-h-[6.5rem] text-[0.98rem] leading-7 text-[#876d5a]">
        {reto.descripcion}
      </p>

      <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.15rem] border border-[#f1dcc4] bg-white/58 px-4 py-3 shadow-[0_10px_18px_rgba(176,106,45,0.06)]">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#c3834c]">
            Duracion
          </p>
          <p className="font-body mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#6f5343]">
            <Clock3 className="h-4 w-4 text-[#e8782b]" strokeWidth={2.1} />
            {reto.duracion_dias} dias
          </p>
        </div>

        <div className="rounded-[1.15rem] border border-[#f1dcc4] bg-white/58 px-4 py-3 shadow-[0_10px_18px_rgba(176,106,45,0.06)]">
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#c3834c]">
            Meta diaria
          </p>
          <p className="font-body mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#6f5343]">
            <Target className="h-4 w-4 text-[#e8782b]" strokeWidth={2.1} />
            {reto.meta_diaria}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between gap-4 border-t border-[#efd9c1] pt-5">
        <div>
          <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#c3834c]">
            listo para empezar
          </p>
          <p className="font-body mt-1 text-sm text-[#8b7463]">
            Pacto claro. Regla diaria. Resultado medible.
          </p>
        </div>

        <Link
          href={`/retos/${reto.slug}`}
          className="font-body inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(232,113,39,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_28px_rgba(232,113,39,0.28)]"
        >
          Ver reto
          <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
        </Link>
      </div>
    </article>
  );
}
