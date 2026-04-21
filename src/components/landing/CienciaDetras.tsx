"use client";

import Image from "next/image";
import {
  BarChart3,
  Brain,
  Flame,
  HandCoins,
  Sparkles,
  Users,
} from "lucide-react";

import MetaBalls from "@/components/MetaBalls";
import GradientText from "@/components/ui/gradient-text";
import { RainbowBordersButton } from "@/components/ui/rainbow-borders-button";
import ShinyText from "@/components/ui/shiny-text";

const resumenSuperior = [
  {
    titulo: "Compromiso público",
    descripcion: "La presión social te mantiene enfocado.",
    imageSrc: "/ciencia-manos.png",
    imageAlt: "Icono de apretón de manos",
    imageClassName: "object-contain scale-[1.14]",
  },
  {
    titulo: "Apuesta económica",
    descripcion: "Tu dinero en juego activa tu responsabilidad.",
    imageSrc: "/ciencia-coin.png",
    imageAlt: "Icono de moneda",
    imageClassName: "object-contain scale-[1.08]",
  },
  {
    titulo: "Disciplina real",
    descripcion: "Las consecuencias reales generan cambios reales.",
    imageSrc: "/firee.png",
    imageAlt: "Icono de fuego",
    imageClassName:
      "object-contain scale-[1.02] drop-shadow-[0_6px_10px_rgba(255,122,49,0.18)]",
  },
];

const pilares = [
  {
    titulo: "Ciencia del comportamiento",
    descripcion:
      "Entendemos cómo funciona tu mente. Usamos sesgos, motivadores y hábitos a tu favor para que cumplir no dependa de la motivación, sino del sistema.",
    icon: Brain,
  },
  {
    titulo: "Compromiso público",
    descripcion:
      "Decirlo en voz alta te hace más consciente. Tu grupo te observa, te apoya y te reta. La vergüenza social es poderosa.",
    icon: Users,
  },
  {
    titulo: "Accountability diario",
    descripcion:
      "Registrar tu progreso cada día te mantiene presente. Un registro que no miente. Sin excusas, sin negociaciones.",
    icon: BarChart3,
  },
];

export function CienciaDetras() {
  return (
    <section
      id="ciencia"
      className="relative left-1/2 z-10 isolate w-screen -translate-x-1/2 overflow-hidden px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-8 lg:px-14 lg:pb-14 lg:pt-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-7rem] h-[18rem] w-[min(92vw,72rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,237,196,0.42)_0%,rgba(255,173,92,0.22)_34%,rgba(240,111,50,0.08)_58%,transparent_78%)] blur-3xl" />
        <div className="absolute left-1/2 top-[11rem] h-[24rem] w-[min(100vw,88rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,190,116,0.18)_0%,rgba(233,115,49,0.12)_42%,transparent_76%)] blur-[120px]" />
        <div
          className="absolute inset-x-[-6%] top-0 h-[24rem] opacity-95 md:h-[32rem]"
          style={{
            maskImage:
              "radial-gradient(circle at center, black 0%, black 42%, rgba(0,0,0,0.84) 56%, rgba(0,0,0,0.3) 68%, transparent 86%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 0%, black 42%, rgba(0,0,0,0.84) 56%, rgba(0,0,0,0.3) 68%, transparent 86%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              filter: "blur(4px)",
            }}
          >
            <MetaBalls
              color="#ffbf73"
              cursorBallColor="#fff2d8"
              cursorBallSize={2.2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.15}
              clumpFactor={1.08}
              speed={0.28}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-[8%] top-[4.5rem] h-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,215,151,0.2),rgba(255,154,77,0.08)_48%,transparent_72%)] blur-3xl md:top-[6rem] md:h-64" />
        <div className="pointer-events-none absolute inset-x-[16%] top-[7rem] h-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,245,227,0.16),rgba(255,255,255,0.02)_60%,transparent_78%)] blur-2xl md:top-[8.5rem] md:h-36" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[5.8rem] h-[18rem] w-[120%] -translate-x-1/2 rounded-[50%] border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7.2rem] h-[14rem] w-[108%] -translate-x-1/2 rounded-[50%] border border-white/8"
        />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex w-full justify-center">
            <Brain
              className="absolute left-[14%] top-3 hidden h-12 w-12 text-[#fff1d7]/90 drop-shadow-[0_0_18px_rgba(255,214,144,0.18)] md:block"
              strokeWidth={1.6}
            />
            <Sparkles
              className="absolute left-[19%] top-0 hidden h-5 w-5 text-[#ffe6b8]/70 md:block"
              strokeWidth={1.8}
            />
            <Flame
              className="absolute right-[14%] top-2 hidden h-12 w-12 text-[#fff1d7]/90 drop-shadow-[0_0_18px_rgba(255,214,144,0.18)] md:block"
              strokeWidth={1.6}
            />
            <Sparkles
              className="absolute right-[19%] top-0 hidden h-5 w-5 text-[#ffe6b8]/70 md:block"
              strokeWidth={1.8}
            />

            <h2 className="science-title-shell font-display relative text-center text-[clamp(3rem,5.2vw,5.25rem)] uppercase tracking-[0.005em] leading-[0.88]">
              <span aria-hidden="true" className="science-title-glow" />
              <span className="science-title relative z-10 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-0 text-[#fff0dd]">
                <span className="science-title-static">La</span>
                <GradientText
                  colors={["#fff6df", "#ffd688", "#ff9955", "#fff2c8", "#ffd688"]}
                  animationSpeed={4.8}
                  showBorder={false}
                  className="science-title-gradient"
                >
                  ciencia
                </GradientText>
                <span className="science-title-static">
                  <ShinyText
                    text={"detrás"}
                    speed={3.4}
                    delay={0.35}
                    color="#fff0dd"
                    shineColor="#fff8ea"
                    spread={108}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                  />
                </span>
              </span>
            </h2>
          </div>

          <p className="font-body mt-0.5 max-w-[35rem] text-center text-[0.88rem] leading-[1.45] text-[#8f5a39] md:text-[0.96rem]">
            Convertimos la{" "}
            <strong className="font-semibold text-[#a55225]">psicología</strong>,
            el{" "}
            <strong className="font-semibold text-[#a55225]">compromiso</strong> y
            el <strong className="font-semibold text-[#a55225]">dinero</strong> en
            el sistema que te hace{" "}
            <strong className="font-semibold text-[#f0672d]">cumplir</strong>.
          </p>

          <div className="relative mt-4 w-full max-w-[68rem]">
            <RainbowBordersButton
              className="science-pill-button"
              contentClassName="science-pill-button-content min-h-[5.65rem] md:min-h-[5.9rem]"
            >
              <div className="grid w-full gap-2 md:grid-cols-3 md:gap-0">
                {resumenSuperior.map((item, index) => {
                  return (
                    <div
                      key={item.titulo}
                      className={`flex items-center gap-4 px-3 py-1.5 text-left md:px-7 ${
                        index !== 0 ? "md:border-l md:border-white/10" : ""
                      }`}
                    >
                      <RainbowBordersButton
                        radius="999px"
                        className="h-[4.15rem] w-[4.15rem] shrink-0 shadow-none"
                        contentClassName="h-full min-h-0 w-full rounded-full p-0"
                      >
                        <div className="relative h-[2.3rem] w-[2.3rem]">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            unoptimized
                            sizes="36px"
                            className={item.imageClassName}
                          />
                        </div>
                      </RainbowBordersButton>
                      <div className="min-w-0">
                        <p className="font-display text-[1.12rem] uppercase leading-none tracking-[0.01em] text-[#c45524]">
                          {item.titulo}
                        </p>
                        <p className="font-body mt-1.5 text-[0.89rem] leading-[1.26] text-[#71452f]">
                          {item.descripcion}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RainbowBordersButton>
          </div>

          <div className="mt-11 grid w-full gap-6 md:mt-12 md:grid-cols-3 md:gap-0">
            {pilares.map((pilar, index) => {
              const Icon = pilar.icon;

              return (
                <article
                  key={pilar.titulo}
                  className={`relative flex flex-col items-center px-4 text-center md:px-8 ${
                    index !== 0 ? "md:border-l md:border-[#efc08b]/35" : ""
                  }`}
                >
                  <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#ffd9aa]/70 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(255,233,201,0.88)_40%,rgba(255,198,116,0.58)_100%)] text-[#f17130] shadow-[0_0_0_2px_rgba(255,226,182,0.12),0_14px_24px_rgba(77,20,6,0.16)]">
                    <Icon className="h-7 w-7" strokeWidth={1.9} />
                    <Sparkles
                      className="absolute -right-2 -top-2 h-4 w-4 text-[#ffb35f]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3 className="font-display max-w-[9ch] text-[2rem] uppercase leading-[0.88] tracking-[0.01em] text-[#f05d2b] [text-shadow:0_10px_24px_rgba(255,242,215,0.1)]">
                    {pilar.titulo}
                  </h3>
                  <p className="font-body mt-4 max-w-[28ch] text-[0.93rem] leading-6 text-[#8f5030]">
                    {pilar.descripcion}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-9 flex w-full justify-center">
            <div className="font-body inline-flex items-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,246,226,0.38),rgba(255,222,181,0.18))] px-4 py-2 text-center text-[0.76rem] font-semibold text-[#af5c2d] shadow-[0_10px_22px_rgba(122,34,10,0.1)] md:text-[0.82rem]">
              <HandCoins
                className="h-4 w-4 shrink-0 text-[#f17230]"
                strokeWidth={2.1}
              />
              <span>
                No se trata de motivación. Se trata de diseñar un sistema donde
                fallar{" "}
                <strong className="text-[#f0672d]">
                  duela más que esforzarse
                </strong>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
