"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Dumbbell,
  BookOpen,
  GraduationCap,
  Brain,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
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
    <main className="landing-stage overflow-hidden px-4 pb-0 pt-6 md:px-6 lg:px-8">
      <div className="landing-orb landing-orb-left" aria-hidden="true" />
      <div className="landing-orb landing-orb-right" aria-hidden="true" />

      <div className="relative flex min-h-screen flex-col">
        <section className="relative mx-auto w-full max-w-[1120px] flex-1 pb-16 pt-24 md:pt-28 lg:pt-32">
          <Navbar />
          <div className="landing-grid absolute inset-x-0 top-0 h-52 opacity-30" />

          {/* Hero header */}
          <div className="relative z-10 mb-10">
            <div className="animate-fade-in-up delay-100">
              <div className="landing-chip mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Elige tu siguiente compromiso
              </div>
            </div>

            <h1 className="font-display animate-fade-in-up delay-200 text-[clamp(4.5rem,10vw,8.5rem)] uppercase leading-[0.88] tracking-tight">
              <span className="hero-title-solid block">Todos los</span>
              <span className="landing-highlight block">retos</span>
            </h1>

            <p className="font-body animate-fade-in-up delay-300 mt-5 max-w-lg text-[1.02rem] leading-7 text-black/62">
              Escoge el reto que más te incomoda.{" "}
              <strong className="font-semibold text-[#a5441f]">
                Ese suele ser el que más te cambia.
              </strong>
            </p>
          </div>

          {/* Filters row */}
          <div className="animate-fade-in-up delay-400 relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat.valor}
                  onClick={() => setCategoriaActiva(cat.valor)}
                  className="font-body inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor:
                      categoriaActiva === cat.valor ? "#2a1409" : "rgba(255,255,255,0.62)",
                    color:
                      categoriaActiva === cat.valor ? "#fff7ef" : "rgba(42,20,9,0.68)",
                    borderColor:
                      categoriaActiva === cat.valor
                        ? "rgba(42,20,9,0.18)"
                        : "rgba(255,255,255,0.48)",
                    backdropFilter: "blur(10px)",
                    boxShadow:
                      categoriaActiva === cat.valor
                        ? "0 10px 24px rgba(42,20,9,0.22)"
                        : "0 4px 12px rgba(124,50,18,0.08)",
                  }}
                >
                  {cat.icon && <cat.icon className="h-4 w-4" />}
                  {cat.label}
                </button>
              ))}
            </div>

            <Link
              href="/retos/crear"
              className="font-body inline-flex items-center gap-2 rounded-full bg-[#f47432] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(244,116,50,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e8672d]"
            >
              <PenLine className="h-4 w-4" />
              Crear reto personalizado
            </Link>
          </div>

          {/* Cards bento grid */}
          {retosFiltrados.length === 0 ? (
            <div className="landing-panel landing-panel-warm relative z-10 mt-8 px-6 py-14 text-center">
              <p className="font-body text-black/58">
                Todavía no hay retos en esta categoría.
              </p>
            </div>
          ) : retosFiltrados.length === 4 ? (
            <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {retosFiltrados.map((reto, i) => {
                const isFeatured = i === 0 || i === 3;
                return (
                  <motion.div
                    key={reto.slug}
                    className={isFeatured ? "lg:col-span-2" : "lg:col-span-1"}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <RetoCard reto={reto} featured={isFeatured} />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {retosFiltrados.map((reto, i) => (
                <motion.div
                  key={reto.slug}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RetoCard reto={reto} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <div className="mx-auto w-full max-w-[1120px]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
