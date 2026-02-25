"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #F26430 0px, #F26430 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #F26430 0px, #F26430 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#F7A04B" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
          style={{ borderColor: "#1A1A1A", color: "#1A1A1A", fontFamily: "var(--font-dm-sans)" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#1A1A1A" }} />
          Retos activos disponibles
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-100 text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6 uppercase tracking-tight"
          style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
        >
          ¿Y si perder{" "}
          <span style={{ color: "#E03228" }}>dinero</span>{" "}
          te hiciera más{" "}
          <span style={{ color: "#E03228" }}>disciplinado?</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up delay-200 text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          La plataforma donde tus metas tienen{" "}
          <strong style={{ color: "#1A1A1A" }}>consecuencias reales</strong>.
          Compromiso público + apuesta económica = disciplina que no falla.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/retos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-white"
            style={{
              background: "linear-gradient(135deg, #F26430, #E03228)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Ver retos disponibles →
          </Link>
        </div>

        {/* Social proof */}
        <p
          className="animate-fade-in-up delay-400 mt-8 text-sm text-gray-500"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Sin pagos. Sin complicaciones. Solo compromisos reales.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8" style={{ backgroundColor: "#DDD6C8" }} />
      </div>
    </section>
  );
}
