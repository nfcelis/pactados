"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Footprints,
  ShieldBan,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientText from "@/components/ui/gradient-text";
import Stack from "@/components/ui/stack";

gsap.registerPlugin(ScrollTrigger);

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
];

const metricas = [
  { valor: "23", etiqueta: "Retos activos hoy", icono: Flame },
  { valor: "1.248", etiqueta: "Personas pactando ahora mismo", icono: Users },
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-retos-copy]"),
        { autoAlpha: 0, x: -28, y: 18 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-retos-stack]"),
        { autoAlpha: 0, x: 34, y: 18, scale: 0.96 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.82,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-retos-footer]"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      id="retos-en-accion"
      className="relative -mt-4 overflow-visible px-6 pb-0 pt-6 md:-mt-8 md:px-10 md:pb-1 md:pt-8 lg:-mt-10 lg:px-14 lg:pb-2"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-[-5.5rem] h-[9rem] bg-[linear-gradient(180deg,rgba(248,239,224,0)_0%,rgba(248,239,224,0.58)_42%,rgba(245,214,167,0.26)_76%,transparent_100%)] blur-[20px]" />
        <div className="absolute left-1/2 top-[-1.25rem] h-[8rem] w-[min(96vw,62rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.72)_0%,rgba(255,231,194,0.28)_42%,transparent_82%)] blur-[42px]" />
        <div className="absolute left-[6%] top-[20%] hidden lg:block">
          <Image
            src="/fuego-doodle-left.png"
            alt=""
            width={60}
            height={60}
            className="h-[4.4rem] w-[4.4rem] object-contain opacity-72"
          />
        </div>
        <div className="absolute right-[4%] top-[18%] hidden lg:block">
          <Image
            src="/fuego-doodle-right-large.png"
            alt=""
            width={74}
            height={74}
            className="h-[5rem] w-[5rem] object-contain opacity-62"
          />
        </div>
        <div className="absolute left-1/2 top-[20%] h-[28rem] w-[min(104vw,74rem)] -translate-x-1/2 rounded-[50%] border border-[#f4b274]/62 opacity-68" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="max-w-[31rem] lg:pr-2">
            <div
              data-retos-copy
              className="inline-flex items-center gap-2 text-[#ee7328]"
            >
              <Flame className="h-4 w-4" strokeWidth={2.2} />
              <span className="font-body text-sm font-semibold uppercase tracking-[0.26em]">
                Retos en acción
              </span>
            </div>

            <h2
              data-retos-copy
              className="font-display mt-3 text-[clamp(2.5rem,5.9vw,5.2rem)] uppercase leading-[0.88] tracking-[-0.04em] text-[#1f1c1a]"
            >
              <span className="block">
                <span>Personas </span>
                <GradientText
                  colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                  animationSpeed={4.2}
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
                  animationSpeed={4.2}
                  showBorder={false}
                  className="hero-gradient-word inline-flex"
                >
                  reales
                </GradientText>
              </span>
            </h2>

            <p
              data-retos-copy
              className="font-body mt-4 max-w-[34rem] text-[1rem] leading-7 text-[#8e7a6a] md:text-[1.08rem]"
            >
              Así es como nuestra comunidad está cumpliendo sus retos cada día.
              Cada captura es una prueba real de personas pactando, reportando y
              terminando lo que prometieron.
            </p>

            <div
              data-retos-copy
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(255,248,239,0.96),rgba(255,235,207,0.92))] px-4 py-3 text-[#a86b3d] shadow-[0_14px_26px_rgba(196,113,42,0.12)]"
            >
              <Users className="h-5 w-5" strokeWidth={2.1} />
              <span className="font-body text-sm font-semibold">
                Comunidad activa y evidencia diaria real
              </span>
            </div>

            <div data-retos-copy className="mt-8">
              <Link
                href="/retos"
                className="font-body inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(232,113,39,0.3)]"
              >
                Explorar todos los retos
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div
            data-retos-stack
            className="relative ml-auto h-[31rem] w-full max-w-[33rem] md:h-[37rem] md:max-w-[35rem] lg:h-[41rem] lg:max-w-[37rem]"
          >
            <div className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,223,177,0.32)_0%,rgba(255,187,117,0.14)_46%,transparent_78%)] blur-[62px]" />
            <Stack
              randomRotation={false}
              sensitivity={140}
              sendToBackOnClick
              cards={cards}
              autoplay
              autoplayDelay={3200}
              pauseOnHover
            />
          </div>
        </div>

        <div
          data-retos-footer
          className="mt-7 overflow-hidden rounded-[2rem] border border-[#f2d4b6] bg-[linear-gradient(180deg,rgba(255,251,247,0.94),rgba(255,242,226,0.88))] shadow-[0_24px_54px_rgba(180,93,29,0.1),inset_0_1px_0_rgba(255,255,255,0.74)]"
        >
          <div className="grid gap-5 px-5 py-5 md:grid-cols-[1.3fr_0.7fr_0.95fr_1fr] md:items-center md:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_16px_26px_rgba(232,113,39,0.28)]">
                <Users className="h-8 w-8" strokeWidth={2.1} />
              </div>
              <div>
                <h3 className="font-body text-[1.1rem] font-bold text-[#2f2a26]">
                  Nuestra comunidad no para
                </h3>
                <p className="font-body mt-1 max-w-[27ch] text-[0.98rem] leading-6 text-[#8e7a69]">
                  Cada día más personas se comprometen y completan sus retos.
                </p>
              </div>
            </div>

            {metricas.map((item) => (
              <div
                key={item.etiqueta}
                className="flex items-center gap-3 md:justify-center md:border-l md:border-[#efd8c2] md:pl-6"
              >
                <item.icono className="h-6 w-6 text-[#f27823]" strokeWidth={2.1} />
                <div>
                  <p className="font-display text-[2.2rem] leading-none text-[#2a2420]">
                    {item.valor}
                  </p>
                  <p className="font-body text-[0.92rem] text-[#9b8675]">
                    {item.etiqueta}
                  </p>
                </div>
              </div>
            ))}

            <div className="md:border-l md:border-[#efd8c2] md:pl-6">
              <Link
                href="/retos"
                className="font-body inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_16px_28px_rgba(232,113,39,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(232,113,39,0.28)]"
              >
                Explorar todos los retos
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
