"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BellRing, Coins, Users, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GradientText from "@/components/ui/gradient-text";
import MagicRings from "@/components/ui/magic-rings";
import SpotlightCard from "@/components/ui/spotlight-card";

gsap.registerPlugin(ScrollTrigger);

const pasos: {
  numero: string;
  icon: LucideIcon;
  titulo: string;
  descripcion: string;
}[] = [
  {
    numero: "01",
    icon: Coins,
    titulo: "Elige un reto o crea el tuyo",
    descripcion:
      "Selecciona entre los retos disponibles o propón uno propio. Fitness, lectura, estudio, hábitos: lo que necesites cambiar.",
  },
  {
    numero: "02",
    icon: Users,
    titulo: "Invita a tus amigos y define las reglas",
    descripcion:
      "Más participantes = más presión social = más probabilidad de éxito. Define las condiciones y el precio de fallar.",
  },
  {
    numero: "03",
    icon: BellRing,
    titulo: "Grupo de WhatsApp con seguimiento",
    descripcion:
      "Recibirán un grupo de WhatsApp con recordatorios diarios. Transparencia total. Sin escapatoria.",
  },
];

function SistemaCard({
  paso,
  index,
  className = "",
}: {
  paso: (typeof pasos)[number];
  index: number;
  className?: string;
}) {
  const assetWrapperClass =
    "pointer-events-none absolute left-1/2 top-[-2.45rem] z-10 -translate-x-1/2";

  return (
    <SpotlightCard
      spotlightColor="rgba(255, 241, 214, 0.46)"
      className={`group relative flex min-h-[320px] flex-col items-center justify-start overflow-visible border border-white/24 bg-[linear-gradient(180deg,rgba(255,244,232,0.34)_0%,rgba(255,227,201,0.22)_100%)] p-7 pt-20 text-center shadow-[0_22px_34px_rgba(112,41,14,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="font-display absolute right-5 top-4 text-5xl uppercase leading-none text-[#ffd4af]/12">
        {paso.numero}
      </div>

      {index === 0 ? (
        <div className={`${assetWrapperClass} -rotate-[10deg]`} aria-hidden="true">
          <Image
            src="/target-card.png"
            alt=""
            width={126}
            height={126}
            className="h-[7.35rem] w-[7.35rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.28)]"
          />
        </div>
      ) : index === 1 ? (
        <div className={`${assetWrapperClass} rotate-[4deg]`} aria-hidden="true">
          <Image
            src="/pacto-card.png"
            alt=""
            width={116}
            height={116}
            className="h-[7.15rem] w-[7.15rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.24)]"
          />
        </div>
      ) : (
        <div className={`${assetWrapperClass} -rotate-[6deg]`} aria-hidden="true">
          <Image
            src="/whatsapp-card.png"
            alt=""
            width={122}
            height={122}
            className="h-[7.15rem] w-[7.15rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.28)]"
          />
        </div>
      )}

      <h3 className="font-display mb-4 mt-2 text-[1.68rem] uppercase leading-[0.95] tracking-wide text-[#a64217] [text-shadow:0_1px_0_rgba(255,244,224,0.2)]">
        {paso.titulo}
      </h3>
      <p className="font-body mx-auto max-w-[24ch] text-[0.98rem] leading-7 text-[#7a4a31]">
        {paso.descripcion}
      </p>
    </SpotlightCard>
  );
}

export function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-system-shell]"),
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-reveal-hdr]"),
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-reveal-card]"),
        { autoAlpha: 0, y: 52 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 66%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sistema"
      className="relative -mt-2 overflow-visible px-6 pb-20 pt-2 md:-mt-3 md:px-10 md:pb-28 md:pt-3 lg:-mt-4 lg:px-14 lg:pb-32 lg:pt-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+18rem)] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-[-3rem] h-[6rem] bg-[linear-gradient(180deg,rgba(248,239,224,0)_0%,rgba(247,226,191,0.42)_44%,rgba(241,199,138,0.14)_78%,transparent_100%)] blur-[16px]" />
        <div className="absolute left-1/2 top-[-0.35rem] h-[6.25rem] w-[min(98vw,64rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,246,228,0.58)_0%,rgba(255,221,170,0.16)_46%,transparent_82%)] blur-[30px]" />
        <div
          className="absolute left-1/2 top-1/2 h-[136%] w-[min(142vw,120rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.42]"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.66) 12%, rgba(0,0,0,0.92) 22%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,0.66) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.66) 12%, rgba(0,0,0,0.92) 22%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,0.66) 92%, transparent 100%)",
          }}
        >
          <div className="absolute left-1/2 top-1/2 h-[128%] w-[128%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen">
            <MagicRings
              color="#f7a055"
              colorTwo="#f1d263"
              ringCount={6}
              speed={1.04}
              attenuation={9.2}
              lineThickness={2}
              baseRadius={0.35}
              radiusStep={0.1}
              scaleRate={0.1}
              opacity={0.82}
              blur={0}
              noiseAmount={0.03}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              followMouse={false}
              mouseInfluence={0.2}
              hoverScale={1.2}
              parallax={0.025}
              clickBurst={false}
            />
          </div>
        </div>
        <div
          className="absolute left-1/2 top-[56%] h-[30rem] w-[min(86vw,56rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.78]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 36%, rgba(0,0,0,0.42) 72%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 36%, rgba(0,0,0,0.42) 72%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 mix-blend-screen">
            <MagicRings
              color="#f7a055"
              colorTwo="#f1d263"
              ringCount={6}
              speed={1.08}
              attenuation={8.1}
              lineThickness={2.25}
              baseRadius={0.24}
              radiusStep={0.082}
              scaleRate={0.11}
              opacity={1}
              blur={0}
              noiseAmount={0.022}
              rotation={0}
              ringGap={1.42}
              fadeIn={0.68}
              fadeOut={0.54}
              followMouse={false}
              mouseInfluence={0.2}
              hoverScale={1.16}
              parallax={0.02}
              clickBurst={false}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,206,123,0.065),transparent_34%),radial-gradient(circle_at_18%_24%,rgba(255,176,92,0.04),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(212,93,28,0.04),transparent_28%)]" />
      </div>

      <div data-system-shell className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-14 flex flex-col items-center gap-3 text-center md:mb-16">
          <p
            data-reveal-hdr
            className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#b56a3b]/86"
          >
            El sistema
          </p>
          <h2
            data-reveal-hdr
            className="font-display text-[clamp(2.4rem,4.25vw,4.45rem)] uppercase leading-[0.92] tracking-wide text-[#b94819]"
          >
            <span className="block md:whitespace-nowrap">
              <span>{"\u00bfC\u00f3mo "}</span>
              <GradientText
                colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                animationSpeed={4.2}
                showBorder={false}
                className="hero-gradient-word inline-flex"
              >
                funciona
              </GradientText>
              <span> el</span>
            </span>
            <span className="block md:whitespace-nowrap">sistema?</span>
          </h2>
          <div
            data-reveal-hdr
            className="h-[2px] w-24 rounded-full bg-[linear-gradient(90deg,rgba(217,92,28,0.08),rgba(217,92,28,0.78),rgba(217,92,28,0.08))]"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {pasos.map((paso, index) => (
            <div key={paso.numero} data-reveal-card>
              <SistemaCard
                paso={paso}
                index={index}
                className="md:min-h-[350px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
