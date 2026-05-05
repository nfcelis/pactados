import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity, BookOpen, GraduationCap, WifiOff,
  Zap, Check, Flame, Clock3, ArrowLeft, type LucideIcon,
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
  facil: "text-emerald-700",
  medio: "text-amber-700",
  dificil: "text-rose-700",
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
    <main className="landing-stage overflow-hidden px-4 pb-0 pt-6 md:px-6 lg:px-8">
      <div className="landing-orb landing-orb-left" aria-hidden="true" />
      <div className="landing-orb landing-orb-right" aria-hidden="true" />

      <div className="relative flex min-h-screen flex-col">
        <section className="relative mx-auto w-full max-w-[1120px] flex-1 pb-16 pt-24 md:pt-28 lg:pt-32">
          <Navbar />
          <div className="landing-grid absolute inset-x-0 top-0 h-52 opacity-30" />

          <div className="relative z-10">
            <div className="animate-fade-in-up delay-100">
              <Link
                href="/retos"
                className="font-body mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/52 transition hover:text-black/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Todos los retos
              </Link>
            </div>

            {/* Main header panel */}
            <div className="landing-panel landing-panel-warm animate-fade-in-up delay-200 mb-6 p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-black/6 p-3 text-[#f47432]">
                  <Icon className="h-8 w-8" />
                </div>
                <span
                  className={`font-body rounded-full bg-black/6 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] ${dificultadColor[reto.dificultad]}`}
                >
                  {dificultadLabel[reto.dificultad]}
                </span>
              </div>

              <h1 className="font-display mt-5 text-[clamp(3.5rem,9vw,7.5rem)] uppercase leading-[0.88] tracking-tight">
                <span className="hero-title-solid">{reto.titulo}</span>
              </h1>
              <p className="font-body mt-4 max-w-3xl text-base leading-relaxed text-black/58 sm:text-lg">
                {reto.descripcion}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: "Duración", icon: Clock3, value: `${reto.duracion_dias} días` },
                  { label: "Meta diaria", icon: Zap, value: reto.meta_diaria },
                  { label: "Intensidad", icon: Flame, value: "Compromiso diario" },
                ].map(({ label, icon: StatIcon, value }) => (
                  <div
                    key={label}
                    className="rounded-[20px] border border-white/50 bg-white/52 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="font-body mb-1 text-xs font-semibold uppercase tracking-wider text-black/40">
                      {label}
                    </p>
                    <p className="font-body inline-flex items-center gap-2 text-sm font-semibold text-[#2a1409]">
                      <StatIcon className="h-4 w-4 text-[#f47432]" />
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom two-column grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                {/* How it works */}
                <div className="landing-panel landing-panel-warm animate-fade-in-up delay-300 p-6">
                  <h2 className="font-display mb-4 text-[2.2rem] uppercase leading-none tracking-tight">
                    <span className="hero-title-solid">Cómo funciona</span>
                  </h2>
                  <ul className="space-y-3">
                    {[
                      `Cumples la meta durante ${reto.duracion_dias} días seguidos.`,
                      "Tu avance se reporta en un grupo de WhatsApp.",
                      "Puedes sumar amigos para reforzar el compromiso.",
                      "Si quieres, defines consecuencias concretas al fallar.",
                    ].map((text) => (
                      <li key={text} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f47432]" />
                        <span className="font-body text-sm leading-relaxed text-black/60">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ember accent block */}
                <div className="landing-panel landing-panel-ember animate-fade-in-up delay-400 p-7">
                  <p className="font-display text-center text-[2.6rem] uppercase leading-[0.9] tracking-tight text-[#fff7ef] [text-shadow:0_8px_24px_rgba(97,27,9,0.28)]">
                    No es motivación.
                    <br />
                    <span className="text-[#ffd8a8]">Es estructura.</span>
                  </p>
                </div>
              </div>

              {/* Registration form */}
              <div className="landing-panel landing-panel-warm animate-fade-in-up delay-300 p-6 sm:p-8">
                <h2 className="font-display mb-5 text-[2.8rem] uppercase leading-none tracking-tight">
                  <span className="hero-title-solid">Unirme al reto</span>
                </h2>
                <FormRegistro reto={reto} />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1120px]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
