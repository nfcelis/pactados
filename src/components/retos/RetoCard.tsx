import Link from "next/link";
import { Activity, BookOpen, GraduationCap, WifiOff, type LucideIcon } from "lucide-react";
import { Reto, Dificultad } from "@/types";

const RETO_ICONS: Record<string, LucideIcon> = {
  Activity,
  BookOpen,
  GraduationCap,
  WifiOff,
};

const dificultadColor: Record<Dificultad, string> = {
  facil: "#22c55e",
  medio: "#F7A04B",
  dificil: "#ef4444",
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

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:border-[#F26430] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(242,100,48,0.35)]"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E0D0" }}
    >
      

      <div className="mb-5 flex items-start justify-between">
        <div
          className="rounded-xl p-2.5"
          style={{ backgroundColor: "#FFF5EF", border: "1px solid #F8DCCF" }}
        >
          <Icon className="h-6 w-6" style={{ color: "#F26430" }} />
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{
            color: dificultadColor[reto.dificultad],
            backgroundColor: `${dificultadColor[reto.dificultad]}20`,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {dificultadLabel[reto.dificultad]}
        </span>
      </div>

      <h3
        className="mb-2 text-2xl uppercase leading-none"
        style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
      >
        {reto.titulo}
      </h3>

      <p className="mb-4 text-xs text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
        {reto.duracion_dias} dias
      </p>

      <p
        className="mb-6 min-h-20 text-sm leading-relaxed text-gray-600"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {reto.descripcion}
      </p>

      <div
        className="mb-4 rounded-lg px-3 py-2 text-xs"
        style={{ backgroundColor: "#F8F3EA", color: "#6A5E54", fontFamily: "var(--font-dm-sans)" }}
      >
        Meta diaria: <span className="font-semibold">{reto.meta_diaria}</span>
      </div>

      <Link
        href={`/retos/${reto.slug}`}
        className="inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 group-hover:shadow-[0_12px_24px_rgba(224,50,40,0.28)]"
        style={{
          background: "linear-gradient(135deg, #F26430, #E03228)",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Quiero este reto &rarr;
      </Link>
    </div>
  );
}
