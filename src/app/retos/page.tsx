"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Dumbbell,
  Flame,
  GraduationCap,
  PenLine,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import GradientText from "@/components/ui/gradient-text";
import { RetoCard } from "@/components/retos/RetoCard";
import { RETOS } from "@/lib/retos-predefinidos";
import { Categoria } from "@/types";

const categorias: { valor: Categoria | "todos"; label: string; icon?: LucideIcon }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "fitness", label: "Fitness", icon: Dumbbell },
  { valor: "lectura", label: "Lectura", icon: BookOpen },
  { valor: "estudio", label: "Estudio", icon: GraduationCap },
  { valor: "habitos", label: "Habitos", icon: Brain },
];

export default function RetosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">("todos");

  const retosFiltrados =
    categoriaActiva === "todos"
      ? RETOS
      : RETOS.filter((r) => r.categoria === categoriaActiva);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f6ead7_0%,#f4d5a7_20%,#f2d0a5_42%,#f3dcb9_72%,#f7efe2_100%)]">
      <Navbar />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[18rem] bg-[radial-gradient(circle_at_top,rgba(255,251,245,0.96),rgba(255,240,212,0.44)_42%,transparent_74%)]" />
        <div className="absolute left-[-7rem] top-[9rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,157,66,0.2),transparent_72%)] blur-[40px]" />
        <div className="absolute right-[-8rem] top-[14rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,212,120,0.2),transparent_76%)] blur-[46px]" />
        <div className="absolute left-1/2 top-[16rem] h-[34rem] w-[min(110vw,88rem)] -translate-x-1/2 rounded-[50%] border border-[#f2bb7e]/45 opacity-80" />
        <div className="absolute left-[8%] top-[11rem] hidden h-12 w-12 rounded-full border border-[#f0bb83]/60 bg-white/18 lg:block" />
        <div className="absolute right-[9%] top-[15rem] hidden h-4 w-4 rounded-full bg-[#ffad4f]/70 blur-[2px] lg:block" />
      </div>

      <div className="relative px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <section className="relative overflow-hidden rounded-[2.4rem] border border-[#f2d7b8] bg-[linear-gradient(180deg,rgba(255,249,241,0.92),rgba(255,238,212,0.72))] px-6 py-10 shadow-[0_30px_70px_rgba(171,88,26,0.12),inset_0_1px_0_rgba(255,255,255,0.72)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_78%)]" />
            <div className="absolute -left-16 bottom-[-2rem] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,170,74,0.16),transparent_72%)] blur-[30px]" />
            <div className="absolute -right-8 top-[-1rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,206,121,0.18),transparent_74%)] blur-[32px]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-[#ef7726]">
                  <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.28em]">
                    Biblioteca de retos
                  </span>
                </div>

                <h1 className="font-display mt-4 text-[clamp(3.2rem,8vw,7rem)] uppercase leading-[0.88] tracking-[-0.04em] text-[#201b18]">
                  <span className="block">elige el reto</span>
                  <span className="block">
                    que mas te haga{" "}
                    <GradientText
                      colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                      animationSpeed={4.2}
                      showBorder={false}
                      className="hero-gradient-word inline-flex"
                    >
                      crecer
                    </GradientText>
                  </span>
                </h1>

                <p className="font-body mt-5 max-w-[42rem] text-[1rem] leading-7 text-[#876d5a] sm:text-[1.06rem]">
                  Aqui no vienes a inspirarte cinco minutos. Vienes a elegir una
                  estructura, pactar una regla y sostenerla hasta ver resultados.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[1.6rem] border border-[#f0d4b2] bg-white/62 px-5 py-4 shadow-[0_18px_32px_rgba(179,101,39,0.08)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_10px_20px_rgba(232,113,39,0.22)]">
                      <Target className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="font-display text-3xl leading-none text-[#2a2320]">
                        {retosFiltrados.length}
                      </p>
                      <p className="font-body text-sm text-[#947e6d]">
                        retos visibles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[#f0d4b2] bg-white/58 px-5 py-4 shadow-[0_18px_32px_rgba(179,101,39,0.08)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffd47a,#ffb347)] text-[#8a3d11] shadow-[0_10px_20px_rgba(255,179,71,0.18)]">
                      <Flame className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="font-display text-3xl leading-none text-[#2a2320]">
                        {RETOS.length}
                      </p>
                      <p className="font-body text-sm text-[#947e6d]">
                        pactos listos
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/retos/crear"
                  className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(232,113,39,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_36px_rgba(232,113,39,0.34)]"
                >
                  <PenLine className="h-4 w-4" strokeWidth={2.2} />
                  Crear reto personalizado
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-[#efd7bb] bg-[linear-gradient(180deg,rgba(255,250,244,0.9),rgba(255,240,216,0.72))] px-4 py-4 shadow-[0_20px_40px_rgba(165,95,30,0.08)] sm:px-5">
            <div className="flex flex-wrap items-center gap-3">
              {categorias.map((cat) => {
                const activa = categoriaActiva === cat.valor;
                return (
                  <button
                    key={cat.valor}
                    onClick={() => setCategoriaActiva(cat.valor)}
                    className="font-body inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: activa
                        ? "linear-gradient(180deg,#ff8a2f,#ff681b)"
                        : "linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,243,225,0.92))",
                      color: activa ? "#ffffff" : "#9a6541",
                      border: `1px solid ${activa ? "#ff7b26" : "#eed3b4"}`,
                      boxShadow: activa
                        ? "0 14px 26px rgba(232,113,39,0.24)"
                        : "0 8px 16px rgba(177,108,47,0.08)",
                    }}
                  >
                    {cat.icon ? <cat.icon className="h-4 w-4" strokeWidth={2.1} /> : null}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#c1783f]">
                  retos disponibles
                </p>
                <h2 className="font-display mt-2 text-[clamp(2rem,4vw,3.25rem)] uppercase leading-none text-[#2a2320]">
                  una coleccion pensada para{" "}
                  <span className="text-[#d95d1c]">cumplir</span>
                </h2>
              </div>

              <div className="hidden rounded-full border border-[#efd1ae] bg-white/60 px-4 py-2 text-sm text-[#9a7a63] shadow-[0_10px_20px_rgba(170,100,35,0.06)] md:block">
                {categoriaActiva === "todos"
                  ? "Mostrando todos los retos"
                  : `Categoria activa: ${categorias.find((c) => c.valor === categoriaActiva)?.label}`}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {retosFiltrados.map((reto) => (
                <RetoCard key={reto.slug} reto={reto} />
              ))}
            </div>

            {retosFiltrados.length === 0 && (
              <div className="mt-8 rounded-[1.8rem] border border-[#edd2b3] bg-[linear-gradient(180deg,rgba(255,251,246,0.92),rgba(255,239,216,0.76))] px-6 py-14 text-center shadow-[0_18px_34px_rgba(170,98,33,0.08)]">
                <p className="font-body text-[1rem] text-[#8e7767]">
                  Todavia no hay retos en esta categoria.
                </p>
              </div>
            )}

            <div className="mt-10 rounded-[2rem] border border-[#f0d6b8] bg-[linear-gradient(180deg,rgba(255,249,241,0.88),rgba(255,237,209,0.7))] px-6 py-7 shadow-[0_20px_38px_rgba(170,97,30,0.08)] sm:px-8">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#c1783f]">
                    quieres algo mas especifico?
                  </p>
                  <h3 className="font-display mt-2 text-[clamp(2rem,4vw,3.2rem)] uppercase leading-none text-[#241d19]">
                    crea tu propio <span className="text-[#df631f]">pacto</span>
                  </h3>
                  <p className="font-body mt-3 max-w-[34rem] text-[0.98rem] leading-7 text-[#8d7564]">
                    Si ninguno te incomoda lo suficiente, diseña uno con tus reglas,
                    tu meta diaria y tu consecuencia.
                  </p>
                </div>

                <Link
                  href="/retos/crear"
                  className="font-body inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(232,113,39,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_rgba(232,113,39,0.32)]"
                >
                  Empezar mi reto
                  <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
