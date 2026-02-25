import { notFound } from "next/navigation";
import {
  Activity, BookOpen, GraduationCap, WifiOff,
  Zap, Check, type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FormRegistro } from "@/components/retos/FormRegistro";
import { RETOS, getRetoPorSlug } from "@/lib/retos-predefinidos";
import { Dificultad } from "@/types";
import type { Metadata } from "next";

const RETO_ICONS: Record<string, LucideIcon> = {
  Activity,
  BookOpen,
  GraduationCap,
  WifiOff,
};

const dificultadLabel: Record<Dificultad, string> = {
  facil: "Fácil",
  medio: "Medio",
  dificil: "Difícil",
};

const dificultadColor: Record<Dificultad, string> = {
  facil: "#22c55e",
  medio: "#F7A04B",
  dificil: "#ef4444",
};

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return RETOS.map((reto) => ({ id: reto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const reto = getRetoPorSlug(id);
  if (!reto) return {};
  return {
    title: `${reto.titulo} – Pactados`,
    description: reto.descripcion,
  };
}

export default async function RetoDetallePage({ params }: Props) {
  const { id } = await params;
  const reto = getRetoPorSlug(id);

  if (!reto) notFound();

  return (
    <main style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero del reto */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <a href="/retos" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  ← Todos los retos
                </a>
              </span>
            </div>

            <div className="mb-6">
              {(() => { const Icon = RETO_ICONS[reto.iconName] ?? Activity; return <Icon className="w-20 h-20" style={{ color: "#F26430" }} />; })()}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="text-sm font-bold px-4 py-1.5 rounded-full"
                style={{
                  color: dificultadColor[reto.dificultad],
                  backgroundColor: `${dificultadColor[reto.dificultad]}20`,
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {dificultadLabel[reto.dificultad]}
              </span>
              <span
                className="text-sm text-gray-500"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {reto.duracion_dias} días
              </span>
            </div>

            <h1
              className="text-6xl sm:text-7xl md:text-8xl uppercase leading-none mb-6"
              style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
            >
              {reto.titulo}
            </h1>

            <p
              className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {reto.descripcion}
            </p>

            {/* Meta diaria */}
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD6C8" }}
            >
              <Zap className="w-6 h-6 shrink-0" style={{ color: "#F26430" }} />
              <div>
                <p
                  className="text-xs text-gray-500 uppercase tracking-widest mb-0.5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Meta diaria
                </p>
                <p
                  className="font-medium"
                  style={{ color: "#1A1A1A", fontFamily: "var(--font-dm-sans)" }}
                >
                  {reto.meta_diaria}
                </p>
              </div>
            </div>
          </div>

          {/* Layout: detalle + formulario */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna izquierda: info adicional */}
            <div>
              <div
                className="rounded-xl p-6 mb-6"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD6C8" }}
              >
                <h2
                  className="text-2xl uppercase mb-4"
                  style={{ fontFamily: "var(--font-bebas)", color: "#F26430" }}
                >
                  ¿En qué consiste?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#1A1A1A" }} />
                    <span
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {reto.meta_diaria} durante {reto.duracion_dias} días
                      consecutivos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#1A1A1A" }} />
                    <span
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Grupo de WhatsApp con seguimiento diario
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#1A1A1A" }} />
                    <span
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Accountability con tus amigos y compañeros
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#1A1A1A" }} />
                    <span
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Define tu propia consecuencia si fallas
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#1A1A1A", border: "1px solid #1A1A1A" }}
              >
                <p
                  className="text-2xl uppercase text-center"
                  style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
                >
                  Sin excusas. Sin atajos.
                  <br />
                  <span style={{ color: "#F9D67A" }}>Solo resultados.</span>
                </p>
              </div>
            </div>

            {/* Columna derecha: formulario */}
            <div>
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #DDD6C8" }}
              >
                <h2
                  className="text-3xl uppercase mb-6"
                  style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
                >
                  Registrarme en este reto
                </h2>
                <FormRegistro reto={reto} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
