"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell, BookOpen, GraduationCap, Brain, PenLine, Sparkles, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RetoCard } from "@/components/retos/RetoCard";
import { RETOS } from "@/lib/retos-predefinidos";
import { Categoria } from "@/types";
import DoodleBackground from "@/components/DoodleBackground";


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
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />
      <DoodleBackground bgColor="#F5F0E8" doodleColor="#110f0f">
      <div
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(242,100,48,0.14)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-56 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(245,230,66,0.15)" }}
      />

      <div className="relative px-4 pb-16 pt-24">
        <div className="mx-auto max-w-6xl">
          <section
            className="mb-10 rounded-3xl border px-6 py-10 sm:px-10"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.9), rgba(253,250,245,0.85))",
              borderColor: "#E6DCCB",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{ borderColor: "#E4D7C4", color: "#7A6F65", fontFamily: "var(--font-dm-sans)" }}>
              <Sparkles className="h-3.5 w-3.5" />
              Elige tu siguiente compromiso
            </div>

            <h1
              className="text-5xl uppercase leading-none sm:text-7xl md:text-8xl"
              style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
            >
              Todos los retos
            </h1>
            <p
              className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Escoge el reto que mas te incomoda. Ese suele ser el que mas te cambia.
            </p>
          </section>

          <section className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {categorias.map((cat) => (
                <button
                  key={cat.valor}
                  onClick={() => setCategoriaActiva(cat.valor)}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: categoriaActiva === cat.valor ? "#1A1A1A" : "#FFFFFF",
                    color: categoriaActiva === cat.valor ? "#FFFFFF" : "#7A6F65",
                    border: `1px solid ${categoriaActiva === cat.valor ? "#1A1A1A" : "#DDD6C8"}`,
                    fontFamily: "var(--font-dm-sans)",
                    boxShadow:
                      categoriaActiva === cat.valor
                        ? "0 10px 24px rgba(26,26,26,0.2)"
                        : "0 8px 18px rgba(80,60,20,0.06)",
                  }}
                >
                  {cat.icon && <cat.icon className="h-4 w-4" />}
                  {cat.label}
                </button>
              ))}
            </div>

            <Link
              href="/retos/crear"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F26430, #E03228)",
                fontFamily: "var(--font-dm-sans)",
                boxShadow: "0 14px 24px rgba(224,50,40,0.28)",
              }}
            >
              <PenLine className="h-4 w-4" />
              Crear reto personalizado
            </Link>
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {retosFiltrados.map((reto) => (
              <RetoCard key={reto.slug} reto={reto} />
            ))}
          </section>

          {retosFiltrados.length === 0 && (
            <div
              className="mt-8 rounded-2xl border px-6 py-14 text-center"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#DDD6C8" }}
            >
              <p className="text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Todavia no hay retos en esta categoria.
              </p>
            </div>
          )}
        </div>
      </div>
      </DoodleBackground>
      <Footer />
    </main>
  );
}
