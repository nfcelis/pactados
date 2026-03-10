import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity, BookOpen, GraduationCap, WifiOff,
  Zap, Check, Flame, Clock3, type LucideIcon,
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
  facil: "Facil",
  medio: "Medio",
  dificil: "Dificil",
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
    title: `${reto.titulo} - Pactados`,
    description: reto.descripcion,
  };
}

export default async function RetoDetallePage({ params }: Props) {
  const { id } = await params;
  const reto = getRetoPorSlug(id);

  if (!reto) notFound();

  const Icon = RETO_ICONS[reto.iconName] ?? Activity;

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      <div
        className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(242,100,48,0.12)" }}
      />
      <div
        className="pointer-events-none absolute -right-16 top-64 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(245,230,66,0.15)" }}
      />

      <div className="relative px-4 pb-16 pt-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/retos"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            &larr; Todos los retos
          </Link>

          <section
            className="mb-10 rounded-3xl border p-6 sm:p-9"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.9), rgba(253,250,245,0.85))",
              borderColor: "#E5DAC8",
            }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="rounded-2xl p-3"
                style={{ backgroundColor: "#FFF5EF", border: "1px solid #F8DCCF" }}
              >
                <Icon className="h-9 w-9" style={{ color: "#F26430" }} />
              </div>
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  color: dificultadColor[reto.dificultad],
                  backgroundColor: `${dificultadColor[reto.dificultad]}20`,
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {dificultadLabel[reto.dificultad]}
              </span>
            </div>

            <h1
              className="mt-5 text-5xl uppercase leading-none sm:text-7xl"
              style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
            >
              {reto.titulo}
            </h1>
            <p
              className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {reto.descripcion}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border px-4 py-3 hover:border-[#F26430] hover:shadow-[0_0_30px_rgba(242,100,48,0.35)]" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E0D0" }}>
                <p className="mb-1 text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Duracion
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  <Clock3 className="h-4 w-4" />
                  {reto.duracion_dias} dias
                </p>
              </div>

              <div className="rounded-xl border px-4 py-3 hover:border-[#F26430] hover:shadow-[0_0_30px_rgba(242,100,48,0.35)]" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E0D0" }}>
                <p className="mb-1 text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Meta diaria
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  <Zap className="h-4 w-4" />
                  {reto.meta_diaria}
                </p>
              </div>

              <div className="rounded-xl border px-4 py-3 hover:border-[#F26430] hover:shadow-[0_0_30px_rgba(242,100,48,0.35)]" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E0D0" }}>
                <p className="mb-1 text-xs uppercase tracking-wider text-gray-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Intensidad
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  <Flame className="h-4 w-4" />
                  Compromiso diario
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#DDD6C8" }}
              >
                <h2
                  className="mb-4 text-3xl uppercase"
                  style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
                >
                  Como funciona
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#F26430" }} />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Cumples la meta durante {reto.duracion_dias} dias seguidos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#F26430" }} />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Tu avance se reporta en un grupo de WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#F26430" }} />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Puedes sumar amigos para reforzar el compromiso.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#F26430" }} />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Si quieres, defines consecuencias concretas al fallar.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" }}
              >
                <p
                  className="text-center text-3xl uppercase leading-none"
                  style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
                >
                  No es motivacion.
                  <br />
                  Es estructura.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#DDD6C8",
                boxShadow: "0 22px 44px rgba(26,26,26,0.08)",
              }}
            >
              <h2
                className="mb-5 text-4xl uppercase"
                style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
              >
                Unirme al reto
              </h2>
              <FormRegistro reto={reto} />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
