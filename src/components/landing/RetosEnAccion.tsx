"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Footprints,
  Move,
  ShieldBan,
  Users,
} from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import Stack from "@/components/ui/stack";

const retos = [
  {
    titulo: "Reto Estudio",
    imagen: "/reto-estudio.jpeg",
    alt: "Chat de WhatsApp con evidencias de un reto de estudio",
    participantes: 4,
    Icon: BookOpen,
    acento: "#f28b3f",
  },
  {
    titulo: "Reto NO redes sociales",
    imagen: "/reto-no-redes.jpeg",
    alt: "Chat de WhatsApp con evidencia de un reto sin redes sociales",
    participantes: 4,
    Icon: ShieldBan,
    acento: "#f26c3d",
  },
  {
    titulo: "Reto 2km min diarios",
    imagen: "/reto-running.jpeg",
    alt: "Chat de WhatsApp con evidencia de un reto de running",
    participantes: 3,
    Icon: Footprints,
    acento: "#ef8c39",
  },
  {
    titulo: "Reto Lectura",
    imagen: "/reto-lectura.jpeg",
    alt: "Chat de WhatsApp con evidencia de un reto de lectura",
    participantes: 4,
    Icon: BookOpen,
    acento: "#df7c72",
  },
];

function RetoCard({
  titulo,
  imagen,
  alt,
  participantes,
  Icon,
  acento,
}: (typeof retos)[number]) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-[2rem] border border-[#f2d8bf] bg-[linear-gradient(180deg,rgba(255,251,246,0.98),rgba(255,240,219,0.92))] p-4 shadow-[0_26px_48px_rgba(188,100,34,0.14),inset_0_1px_0_rgba(255,255,255,0.78)]">
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: `inset 0 0 0 2px ${acento}26, 0 0 0 1px ${acento}22, 0 0 30px ${acento}20`,
        }}
      />

      <div className="relative z-10 mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fff6eb,#ffe1be)] shadow-[0_8px_18px_rgba(196,106,33,0.14)]">
          <Icon className="h-5 w-5" style={{ color: acento }} strokeWidth={2.1} />
        </span>
        <h3 className="font-body text-[1.08rem] font-bold leading-tight text-[#2f2c2a]">
          {titulo}
        </h3>
      </div>

      <div className="relative overflow-hidden rounded-[1.45rem] border border-[#f0e2d0] bg-white/80">
        <Image
          src={imagen}
          alt={alt}
          width={760}
          height={1040}
          sizes="(max-width: 768px) 88vw, (max-width: 1200px) 40vw, 32rem"
          quality={72}
          className="h-[24rem] w-full object-cover object-top md:h-[28rem] lg:h-[31rem]"
        />
      </div>

      <div className="relative z-10 mt-3 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(255,248,239,0.98),rgba(255,233,203,0.92))] px-3 py-2 text-[#b37241] shadow-[0_8px_20px_rgba(190,114,42,0.1)]">
        <Users className="h-4 w-4" strokeWidth={2.1} />
        <span className="font-body text-sm font-semibold">
          {participantes} participantes
        </span>
      </div>
    </article>
  );
}

export function RetosEnAccion() {
  const cards = useMemo(
    () =>
      retos.map((reto) => (
        <RetoCard
          key={reto.titulo}
          titulo={reto.titulo}
          imagen={reto.imagen}
          alt={reto.alt}
          participantes={reto.participantes}
          Icon={reto.Icon}
          acento={reto.acento}
        />
      )),
    []
  );

  return (
    <section
      id="retos-en-accion"
      className="relative -mt-16 overflow-visible px-6 pb-0 pt-0 md:-mt-20 md:px-10 md:pb-1 md:pt-2 lg:-mt-24 lg:px-14 lg:pb-2 lg:pt-3"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "980px",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="max-w-[31rem] lg:pr-2">
            <div className="inline-flex items-center gap-2 text-[#ee7328]">
              <Flame className="h-4 w-4" strokeWidth={2.2} />
              <span className="font-body text-sm font-semibold uppercase tracking-[0.26em]">
                Retos en acción
              </span>
            </div>

            <h2 className="font-display mt-3 text-[clamp(2.5rem,5.9vw,5.2rem)] uppercase leading-[0.88] tracking-[-0.04em] text-[#1f1c1a]">
              <span className="block">
                <span>Personas </span>
                <GradientText
                  colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                  showBorder={false}
                  className="hero-gradient-word inline-flex"
                >
                  reales,
                </GradientText>
              </span>
              <span className="block">
                <span>compromisos </span>
                <GradientText
                  colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                  showBorder={false}
                  className="hero-gradient-word inline-flex"
                >
                  reales
                </GradientText>
              </span>
            </h2>

            <p className="font-body mt-4 max-w-[34rem] text-[1rem] leading-7 text-[#8e7a6a] md:text-[1.08rem]">
              Así es como nuestra comunidad está cumpliendo sus retos cada día.
              Cada captura es una prueba real de personas pactando, reportando y
              terminando lo que prometieron.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(255,248,239,0.96),rgba(255,235,207,0.92))] px-4 py-3 text-[#a86b3d] shadow-[0_14px_26px_rgba(196,113,42,0.12)]">
              <Users className="h-5 w-5" strokeWidth={2.1} />
              <span className="font-body text-sm font-semibold">
                Comunidad activa y evidencia diaria real
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#f1d1ae] bg-white/55 px-4 py-2 text-[#b06f3d] shadow-[0_10px_22px_rgba(196,113,42,0.08)]">
              <Move className="h-4 w-4" strokeWidth={2.1} />
              <span className="font-body text-sm font-semibold">
                Arrastra las cards para explorar más evidencias
              </span>
            </div>

            <div className="mt-8">
              <Link
                href="/retos"
                className="font-body inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(232,113,39,0.3)]"
              >
                Explorar todos los retos
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div className="relative ml-auto h-[33rem] w-full max-w-[34rem] md:h-[39rem] md:max-w-[36rem] lg:h-[43rem] lg:max-w-[38rem]">
            <Stack
              randomRotation={false}
              sensitivity={110}
              sendToBackOnClick
              cards={cards}
              autoplay={false}
              enableTilt={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
