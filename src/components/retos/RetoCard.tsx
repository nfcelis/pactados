import Link from "next/link";
import { Activity, ArrowRight, BookOpen, GraduationCap, WifiOff, type LucideIcon } from "lucide-react";
import { Reto, Dificultad } from "@/types";

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
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

const cardStyle = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,237,218,0.92) 100%)",
};

interface RetoCardProps {
  reto: Reto;
  featured?: boolean;
}

export function RetoCard({ reto, featured = false }: RetoCardProps) {
  const Icon = RETO_ICONS[reto.iconName] ?? Activity;

  if (featured) {
    return (
      <Link
        href={`/retos/${reto.slug}`}
        className="landing-panel landing-panel-warm group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_80px_rgba(80,20,7,0.32)] sm:flex-row sm:p-8"
        style={cardStyle}
      >
        {/* Left: icon + title + CTA */}
        <div className="flex flex-col justify-between sm:w-1/2 sm:pr-8">
          <div>
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-black/6 p-3 text-[#f47432]">
                <Icon className="h-6 w-6" />
              </div>
              <span
                className={`font-body rounded-full bg-black/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${dificultadColor[reto.dificultad]}`}
              >
                {dificultadLabel[reto.dificultad]}
              </span>
            </div>
            <h3 className="font-display text-[clamp(2.4rem,3.8vw,3.2rem)] uppercase leading-[0.88] tracking-tight text-[#2a1409]">
              {reto.titulo}
            </h3>
            <p className="font-body mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/42">
              {reto.duracion_dias} días
            </p>
          </div>
          <div className="mt-6">
            <span className="font-body inline-flex items-center gap-2 text-sm font-semibold text-[#a5441f] transition group-hover:translate-x-1">
              Quiero este reto
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Right: description + meta */}
        <div className="mt-5 flex flex-col justify-center sm:mt-0 sm:w-1/2 sm:border-l sm:border-black/6 sm:pl-8">
          <p className="font-body text-sm leading-6 text-black/58">{reto.descripcion}</p>
          <div className="font-body mt-4 rounded-2xl bg-black/5 px-3 py-2.5 text-xs text-black/52">
            Meta diaria:{" "}
            <span className="font-semibold text-black/68">{reto.meta_diaria}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/retos/${reto.slug}`}
      className="landing-panel landing-panel-warm group flex h-full min-h-[268px] flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_80px_rgba(80,20,7,0.32)]"
      style={cardStyle}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-black/6 p-3 text-[#f47432]">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`font-body rounded-full bg-black/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${dificultadColor[reto.dificultad]}`}
        >
          {dificultadLabel[reto.dificultad]}
        </span>
      </div>

      <h3 className="font-display mb-1.5 text-[2.1rem] uppercase leading-[0.9] tracking-tight text-[#2a1409]">
        {reto.titulo}
      </h3>

      <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-black/42">
        {reto.duracion_dias} días
      </p>

      <p className="font-body mt-3 line-clamp-3 text-sm leading-6 text-black/58">
        {reto.descripcion}
      </p>

      <div className="font-body mt-3 rounded-2xl bg-black/5 px-3 py-2 text-xs text-black/52">
        Meta diaria:{" "}
        <span className="font-semibold text-black/68">{reto.meta_diaria}</span>
      </div>

      <div className="mt-auto flex items-center justify-end pt-4">
        <span className="font-body inline-flex items-center gap-2 text-sm font-semibold text-[#a5441f] transition group-hover:translate-x-1">
          Quiero este reto
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
