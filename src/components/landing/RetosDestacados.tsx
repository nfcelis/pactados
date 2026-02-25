import Link from "next/link";
import { Activity, BookOpen, GraduationCap, WifiOff, type LucideIcon } from "lucide-react";
import { RETOS } from "@/lib/retos-predefinidos";
import { Dificultad } from "@/types";

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
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

export function RetosDestacados() {
  const destacados = RETOS.slice(0, 3);

  return (
    <section
      className="py-24 px-4"
      style={{ backgroundColor: "#FDFAF5", borderTop: "1px solid #E8E0D0" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <p
              className="text-sm font-medium mb-3 uppercase tracking-widest"
              style={{ color: "#F26430", fontFamily: "var(--font-dm-sans)" }}
            >
              Empieza hoy
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl uppercase"
              style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
            >
              Retos disponibles
            </h2>
          </div>
          <Link
            href="/retos"
            className="text-sm font-medium underline underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ color: "#F26430", fontFamily: "var(--font-dm-sans)" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacados.map((reto) => {
            const Icon = RETO_ICONS[reto.iconName] ?? Activity;
            return (
            <Link
              key={reto.slug}
              href={`/retos/${reto.slug}`}
              className="group relative p-6 rounded-xl border transition-all duration-300 hover:border-[#F26430] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(242,100,48,0.12)]"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E8E0D0",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-10 h-10" style={{ color: "#F26430" }} />
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    color: dificultadColor[reto.dificultad],
                    backgroundColor: `${dificultadColor[reto.dificultad]}15`,
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {dificultadLabel[reto.dificultad]}
                </span>
              </div>

              <h3
                className="text-2xl uppercase mb-2"
                style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
              >
                {reto.titulo}
              </h3>
              <p
                className="text-sm text-gray-500 mb-4 line-clamp-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {reto.descripcion}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-xs text-gray-600"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {reto.duracion_dias} días
                </span>
                <span
                  className="text-sm font-medium group-hover:text-[#F26430] transition-colors"
                  style={{
                    color: "#7A6F65",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  Quiero este reto →
                </span>
              </div>
            </Link>
          );})}
        </div>
      </div>
    </section>
  );
}
