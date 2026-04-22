"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Flame,
  Target,
  Users,
} from "lucide-react";

import MetaBalls from "@/components/MetaBalls";
import GradientText from "@/components/ui/gradient-text";
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

function DoodleRays({
  className = "",
  colorClassName = "bg-[#ffe9b5]/90",
}: {
  className?: string;
  colorClassName?: string;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <span className={`absolute left-0 top-0 h-6 w-[2px] rounded-full ${colorClassName} rotate-[-28deg]`} />
      <span className={`absolute left-5 top-2 h-4 w-[2px] rounded-full ${colorClassName}`} />
      <span className={`absolute left-10 top-4 h-5 w-[2px] rounded-full ${colorClassName} rotate-[34deg]`} />
    </div>
  );
}

export function CienciaDetras() {
  return (
    <section
      id="ciencia"
      className="relative left-1/2 z-10 isolate w-screen -translate-x-1/2 px-6 pb-8 pt-4 md:-mt-[4.5rem] md:px-10 md:pb-10 md:pt-[8.5rem] lg:-mt-[6rem] lg:px-14 lg:pb-12 lg:pt-[9.5rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 inset-y-[-12rem] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 12%, black 24%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 12%, black 24%, black 100%)",
        }}
      >
        <div className="absolute left-1/2 top-[-14rem] h-[28rem] w-[min(148vw,112rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,250,239,0.2)_0%,rgba(255,239,212,0.14)_28%,rgba(255,218,173,0.1)_46%,transparent_72%)] blur-[86px]" />
        <div className="absolute left-1/2 top-[-10rem] h-[23rem] w-[min(122vw,96rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,252,244,0.42)_0%,rgba(255,236,199,0.18)_36%,rgba(255,186,118,0.08)_62%,transparent_84%)] blur-[96px]" />
        <div className="absolute left-1/2 top-[-2.5rem] h-[36rem] w-[min(116vw,88rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.44)_0%,rgba(255,244,220,0.24)_28%,rgba(255,204,138,0.1)_52%,transparent_82%)] blur-[128px]" />
        <div className="absolute left-1/2 top-[14rem] h-[26rem] w-[min(112vw,90rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,220,163,0.2)_0%,rgba(255,173,92,0.12)_38%,rgba(233,115,49,0.08)_58%,transparent_82%)] blur-[120px]" />

        <div
          className="absolute inset-x-[-10%] top-[-3rem] h-[30rem] opacity-80 md:h-[38rem]"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 14%, black 28%, black 70%, rgba(0,0,0,0.54) 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 14%, black 28%, black 70%, rgba(0,0,0,0.54) 86%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 blur-[9px]">
            <MetaBalls
              color="#ffca82"
              cursorBallColor="#fff5dd"
              cursorBallSize={2.25}
              ballCount={34}
              animationSize={34}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.12}
              clumpFactor={1.18}
              speed={0.24}
            />
          </div>
        </div>

        <div
          className="absolute inset-x-[-12%] top-[10rem] h-[34rem] opacity-58 md:top-[12rem] md:h-[38rem]"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.44) 10%, rgba(0,0,0,0.92) 26%, rgba(0,0,0,0.8) 68%, rgba(0,0,0,0.34) 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.44) 10%, rgba(0,0,0,0.92) 26%, rgba(0,0,0,0.8) 68%, rgba(0,0,0,0.34) 88%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 blur-[12px]">
            <MetaBalls
              color="#ffe1ae"
              cursorBallColor="#fff9ea"
              cursorBallSize={1.8}
              ballCount={26}
              animationSize={44}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.08}
              clumpFactor={1.34}
              speed={0.15}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[16.5rem] h-[15rem] w-[min(82vw,42rem)] -translate-x-1/2 opacity-46 md:top-[17rem] md:h-[17rem] md:w-[min(66vw,44rem)]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.42) 68%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.42) 68%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 blur-[7px]">
            <MetaBalls
              color="#ffe6ae"
              cursorBallColor="#fffaf0"
              cursorBallSize={1.9}
              ballCount={24}
              animationSize={36}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.1}
              clumpFactor={1.05}
              speed={0.17}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[21.5rem] h-[13rem] w-[min(68vw,34rem)] -translate-x-1/2 opacity-36 md:top-[22rem] md:h-[15rem] md:w-[min(52vw,36rem)]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 38%, rgba(0,0,0,0.34) 72%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 38%, rgba(0,0,0,0.34) 72%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 blur-[9px]">
            <MetaBalls
              color="#fff1c9"
              cursorBallColor="#ffffff"
              cursorBallSize={1.5}
              ballCount={18}
              animationSize={32}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.08}
              clumpFactor={0.94}
              speed={0.12}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[26rem] h-[11rem] w-[min(62vw,28rem)] -translate-x-1/2 opacity-30 md:top-[26.5rem] md:h-[12rem] md:w-[min(44vw,30rem)]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.28) 74%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.28) 74%, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 blur-[10px]">
            <MetaBalls
              color="#ffe0a0"
              cursorBallColor="#fff7df"
              cursorBallSize={1.3}
              ballCount={14}
              animationSize={28}
              enableMouseInteraction
              enableTransparency
              hoverSmoothness={0.08}
              clumpFactor={0.88}
              speed={0.11}
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-[8rem] h-[20rem] w-[min(166vw,114rem)] -translate-x-1/2 rounded-[50%] border border-white/12 opacity-60" />
        <div className="absolute left-1/2 top-[10rem] h-[17rem] w-[min(152vw,106rem)] -translate-x-1/2 rounded-[50%] border border-white/8 opacity-42" />
        <div className="absolute left-1/2 bottom-[-9rem] h-[19rem] w-[min(172vw,118rem)] -translate-x-1/2 rounded-[50%] border border-white/10 opacity-38" />
        <div className="absolute left-1/2 bottom-[-12rem] h-[23rem] w-[min(182vw,124rem)] -translate-x-1/2 rounded-[50%] border border-white/8 opacity-24" />

        <div className="absolute left-[6%] top-[14rem] h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,247,228,0.7),rgba(255,222,160,0.16)_54%,transparent_76%)] blur-2xl" />
        <div className="absolute right-[5%] top-[13rem] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,248,233,0.68),rgba(255,222,160,0.12)_54%,transparent_76%)] blur-2xl" />
        <div className="absolute left-[10%] bottom-[10rem] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,248,235,0.48),rgba(255,220,162,0.16)_54%,transparent_76%)] blur-2xl" />
        <div className="absolute right-[10%] bottom-[9rem] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,248,235,0.46),rgba(255,220,162,0.14)_54%,transparent_76%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="absolute left-[5%] top-[19.5rem] hidden grid-cols-4 gap-3 opacity-55 md:grid">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={`dots-left-${index}`}
              className="h-1.5 w-1.5 rounded-full bg-[#fff0c8]/76"
            />
          ))}
        </div>
        <div className="absolute right-[5%] top-[23rem] hidden grid-cols-4 gap-3 opacity-55 md:grid">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={`dots-right-${index}`}
              className="h-1.5 w-1.5 rounded-full bg-[#fff0c8]/76"
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex w-full max-w-[70rem] justify-center pt-1 md:pt-2">
            <div className="absolute left-[8%] top-1 hidden md:block">
              <Brain
                className="h-12 w-12 text-[#fff0c6]/92 drop-shadow-[0_0_18px_rgba(255,233,181,0.2)] lg:h-14 lg:w-14"
                strokeWidth={1.8}
              />
              <DoodleRays className="-left-10 -top-7" />
            </div>
            <div className="absolute right-[8%] top-0 hidden md:block">
              <Flame
                className="h-12 w-12 text-[#fff0c6]/92 drop-shadow-[0_0_18px_rgba(255,233,181,0.18)] lg:h-14 lg:w-14"
                strokeWidth={1.8}
              />
              <DoodleRays className="left-12 -top-5" />
            </div>

            <h2 className="science-title-shell font-display relative text-center text-[clamp(2.9rem,5.9vw,5.2rem)] uppercase leading-[0.84] tracking-[-0.03em]">
              <span
                aria-hidden="true"
                className="science-title-glow"
                style={{
                  width: "min(72vw, 44rem)",
                  height: "clamp(4.3rem, 11vw, 7rem)",
                  top: "48%",
                  opacity: 0.98,
                }}
              />
              <span className="science-title relative z-10 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-0 text-[#fff5eb]">
                <span className="science-title-static">La</span>
                <GradientText
                  colors={["#fff7e1", "#ffd777", "#ff9955", "#fff2ce", "#ffd777"]}
                  animationSpeed={4.8}
                  showBorder={false}
                  className="science-title-gradient"
                >
                  ciencia
                </GradientText>
                <span className="science-title-static">
                  <ShinyText
                    text="detrás"
                    speed={3.4}
                    delay={0.35}
                    color="#fff4e8"
                    shineColor="#ffffff"
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

          <p className="font-body mt-2 max-w-[40rem] text-center text-[0.95rem] leading-[1.34] text-[#5d3b2a] md:text-[1.02rem]">
            Convertimos la{" "}
            <strong className="font-semibold text-[#b1481f]">
              psicología, el compromiso y el dinero
            </strong>
            <br className="hidden md:block" /> en el sistema que te hace{" "}
            <span className="relative inline-flex">
              <strong className="font-semibold text-[#ea6425]">cumplir.</strong>
              <span className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-[linear-gradient(90deg,rgba(255,194,98,0.2),rgba(255,177,61,0.9),rgba(240,109,44,0.2))]" />
            </span>
          </p>

          <div className="relative mt-5 w-full max-w-[76rem]">
            <div className="absolute inset-0 rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(255,248,229,0.34),rgba(255,228,185,0.14)_50%,transparent_78%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[999px] border border-[#fff4d7]/70 bg-[linear-gradient(180deg,rgba(255,244,223,0.18),rgba(255,226,186,0.12))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_0_0_1px_rgba(255,251,239,0.08),0_24px_80px_rgba(166,74,18,0.08)] backdrop-blur-[7px] md:px-6 md:py-4">
              <div className="grid gap-3 md:grid-cols-3 md:gap-0">
                {resumenSuperior.map((item, index) => (
                  <div
                    key={item.titulo}
                    className="relative flex items-center gap-3 px-1 py-1 text-left md:px-5"
                  >
                    {index !== 0 ? (
                      <div className="absolute left-0 top-1/2 hidden h-[4rem] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(240,126,56,0.78),transparent)] md:block" />
                    ) : null}

                    <div className="relative flex h-[4.35rem] w-[4.35rem] shrink-0 items-center justify-center rounded-full border border-[#f0a066] bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.98),rgba(255,243,224,0.92)_38%,rgba(255,211,149,0.62)_82%,rgba(255,171,91,0.28)_100%)] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.3),0_0_28px_rgba(255,244,217,0.38),0_10px_26px_rgba(189,88,28,0.12)] md:h-[4.5rem] md:w-[4.5rem]">
                      <div className="relative h-[2.25rem] w-[2.25rem] md:h-[2.4rem] md:w-[2.4rem]">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          unoptimized
                          sizes="42px"
                          className={item.imageClassName}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="font-display text-[1.02rem] uppercase leading-[0.92] tracking-[0.01em] text-[#b94819] md:text-[1.16rem] lg:text-[1.24rem]">
                        {item.titulo}
                      </p>
                      <p className="font-body mt-1.5 max-w-[18ch] text-[0.9rem] leading-[1.32] text-[#8e4322] md:max-w-[17ch] md:text-[0.92rem]">
                        {item.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-8 grid w-full max-w-[74rem] gap-6 md:mt-9 md:grid-cols-3 md:gap-0">
            {pilares.map((pilar, index) => {
              const Icon = pilar.icon;

              return (
                <article
                  key={pilar.titulo}
                  className="relative flex flex-col items-center px-4 text-center md:px-8"
                >
                  {index !== 0 ? (
                    <div className="absolute left-0 top-[3.6rem] hidden h-[12.75rem] w-px bg-[linear-gradient(180deg,transparent,rgba(234,124,47,0.44),transparent)] md:block" />
                  ) : null}

                  <div className="relative mb-4 inline-flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full border border-[#f0a066] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.98),rgba(255,244,227,0.92)_42%,rgba(255,205,132,0.5)_100%)] text-[#ef6f2b] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.24),0_0_24px_rgba(255,239,205,0.3),0_10px_24px_rgba(182,83,24,0.1)]">
                    <Icon className="h-7 w-7" strokeWidth={1.9} />
                    <DoodleRays
                      className="-right-6 -top-1"
                      colorClassName="bg-[#ffc955]/90"
                    />
                  </div>

                  {index === 0 ? (
                    <DoodleRays
                      className="-left-2 top-[6rem] hidden md:block"
                      colorClassName="bg-[#ff8f51]/90"
                    />
                  ) : null}

                  {index === pilares.length - 1 ? (
                    <DoodleRays
                      className="right-[-0.5rem] top-[7rem] hidden rotate-[62deg] md:block"
                      colorClassName="bg-[#ff8f51]/90"
                    />
                  ) : null}

                  <h3 className="font-display max-w-[10ch] text-[clamp(1.9rem,2.85vw,2.8rem)] uppercase leading-[0.88] tracking-[-0.03em] text-[#e95d1c] [text-shadow:0_10px_24px_rgba(255,242,215,0.08)]">
                    {pilar.titulo}
                  </h3>
                  <div className="mt-2.5 h-[4px] w-10 rounded-full bg-[linear-gradient(90deg,rgba(255,181,75,0.18),rgba(239,106,33,0.9),rgba(255,181,75,0.18))]" />
                  <p className="font-body mt-3 max-w-[20ch] text-[0.92rem] font-medium leading-[1.44] text-[#463226] md:text-[0.96rem]">
                    {pilar.descripcion}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="relative mt-8 flex w-full justify-center">
            <div className="absolute inset-x-[18%] top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,244,219,0.6),transparent)] md:block" />
            <div className="relative inline-flex max-w-[54rem] items-center gap-3 rounded-full border border-[#fff0cf]/72 bg-[linear-gradient(180deg,rgba(255,241,217,0.28),rgba(255,229,193,0.18))] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_16px_42px_rgba(177,84,24,0.08)] backdrop-blur-sm md:pl-4 md:pr-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f0a066]/70 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95),rgba(255,244,226,0.92)_42%,rgba(255,204,136,0.34)_100%)] text-[#ef6b2a] shadow-[0_0_18px_rgba(255,240,208,0.24)] md:h-10 md:w-10">
                <Target className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <span className="font-body text-center text-[0.84rem] font-medium leading-[1.3] text-[#d26a31] md:text-[0.92rem]">
                No se trata de motivación. Se trata de diseñar un sistema donde
                fallar{" "}
                <strong className="font-semibold text-[#e25920]">
                  duela más que esforzarse.
                </strong>
              </span>
              <ArrowRight
                className="hidden h-5 w-5 shrink-0 rotate-[12deg] text-[#ee8740] md:block"
                strokeWidth={2.2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
