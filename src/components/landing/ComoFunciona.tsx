"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { BellRing, Coins, Users, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Grainient from "@/components/ui/grainient";
import ShinyText from "@/components/ui/shiny-text";
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
      "Selecciona entre los retos disponibles o propón uno propio. Fitness, lectura, estudio, hábitos - lo que necesites cambiar.",
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
      className={`group relative flex min-h-[320px] flex-col items-center justify-start border border-white/24 bg-[linear-gradient(180deg,rgba(255,244,232,0.34)_0%,rgba(255,227,201,0.22)_100%)] p-7 pt-20 text-center shadow-[0_22px_34px_rgba(112,41,14,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 overflow-visible ${className}`}
    >
      <div className="font-display absolute right-5 top-4 text-5xl uppercase leading-none text-[#ffd4af]/12">
        {paso.numero}
      </div>

      {index === 0 ? (
        <div
          className={`${assetWrapperClass} -rotate-[10deg]`}
          aria-hidden="true"
        >
          <Image
            src="/target-card.png"
            alt=""
            width={126}
            height={126}
            className="h-[7.35rem] w-[7.35rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.28)]"
          />
        </div>
      ) : index === 1 ? (
        <div
          className={`${assetWrapperClass} rotate-[4deg]`}
          aria-hidden="true"
        >
          <Image
            src="/pacto-card.png"
            alt=""
            width={116}
            height={116}
            className="h-[7.15rem] w-[7.15rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.24)]"
          />
        </div>
      ) : index === 2 ? (
        <div
          className={`${assetWrapperClass} -rotate-[6deg]`}
          aria-hidden="true"
        >
          <Image
            src="/whatsapp-card.png"
            alt=""
            width={122}
            height={122}
            className="h-[7.15rem] w-[7.15rem] object-contain drop-shadow-[0_10px_18px_rgba(67,31,29,0.28)]"
          />
        </div>
      ) : (
        <div className="mb-6 inline-flex rounded-full bg-white/14 p-4 text-[#fff0d6] ring-1 ring-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <paso.icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
      )}

      <h3 className="font-display mb-4 mt-2 text-[1.68rem] uppercase leading-[0.95] tracking-wide text-[#fffaf4] [text-shadow:0_2px_10px_rgba(91,34,15,0.18)]">
        {paso.titulo}
      </h3>
      <p className="font-body mx-auto max-w-[24ch] text-[0.98rem] leading-7 text-white/92 [text-shadow:0_1px_8px_rgba(91,34,15,0.12)]">
        {paso.descripcion}
      </p>
    </SpotlightCard>
  );
}

export function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopSceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const desktopScene = desktopSceneRef.current;
    const pin = pinRef.current;
    const circle = circleRef.current;
    const introTitle = introTitleRef.current;
    const content = contentRef.current;

    if (!section || !desktopScene || !pin || !circle || !introTitle || !content) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const headingBits = gsap
          .utils.toArray<HTMLElement>(content.querySelectorAll("[data-system-copy]"))
          .filter((element) => !element.hasAttribute("data-system-title"));
        const headingTitle = gsap.utils.toArray<HTMLElement>(
          content.querySelectorAll("[data-system-title]")
        );
        const introWords = gsap.utils.toArray<HTMLElement>(
          introTitle.querySelectorAll("[data-system-word]")
        );
        const cards = gsap.utils.toArray<HTMLElement>(
          content.querySelectorAll("[data-system-card]")
        );

        gsap.set(circle, {
          scale: 0,
          autoAlpha: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(introTitle, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(introWords, {
          autoAlpha: 0,
          y: 22,
          scale: 0.94,
          filter: "blur(20px)",
          force3D: true,
        });
        gsap.set(headingBits, {
          autoAlpha: 0,
          y: 42,
          filter: "blur(20px)",
          force3D: true,
        });
        gsap.set(headingTitle, {
          autoAlpha: 0,
          y: 60,
          scale: 1.1,
          filter: "blur(15px) brightness(2)",
          force3D: true,
        });
        gsap.set(cards, {
          autoAlpha: 0,
          y: 56,
          force3D: true,
        });

        const preOpenTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: desktopScene,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        preOpenTimeline.to(circle, {
          scale: 0.34,
          autoAlpha: 0.86,
          duration: 1,
          ease: "power2.out",
        });
        preOpenTimeline.to(
          introWords,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.16,
            stagger: 0.16,
            ease: "power2.out",
          },
          0.08
        );

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: desktopScene,
            start: "top top",
            end: "+=1900",
            scrub: 0.95,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            circle,
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.92,
              ease: "power2.out",
            },
            0
          )
          .to(
            introTitle,
            {
              autoAlpha: 0,
              scale: 0.78,
              y: -18,
              duration: 0.26,
              ease: "power2.out",
            },
            0.16
          )
          .to(
            introWords,
            {
              autoAlpha: 0,
              y: -10,
              scale: 0.94,
              filter: "blur(20px)",
              duration: 0.22,
              stagger: 0.03,
              ease: "power2.out",
            },
            0.16
          )
          .to(
            headingBits,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.48,
              stagger: 0.06,
              ease: "power2.out",
            },
            0.24
          )
          .to(
            headingTitle,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px) brightness(1)",
              duration: 0.64,
              ease: "power2.out",
            },
            0.24
          )
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.36
          )
          .to(
            circle,
            {
              scale: 0.08,
              autoAlpha: 0,
              duration: 1.12,
              ease: "power2.inOut",
            },
            0.98
          )
          .to(
            headingBits,
            {
              autoAlpha: 0,
              y: -24,
              filter: "blur(20px)",
              duration: 0.9,
              stagger: 0.04,
              ease: "power2.inOut",
            },
            0.98
          )
          .to(
            headingTitle,
            {
              autoAlpha: 0,
              y: -28,
              scale: 0.94,
              filter: "blur(18px) brightness(1.2)",
              duration: 0.9,
              ease: "power2.inOut",
            },
            0.98
          )
          .to(
            cards,
            {
              autoAlpha: 0,
              y: 34,
              filter: "blur(16px)",
              duration: 0.96,
              stagger: 0.06,
              ease: "power2.inOut",
            },
            1.02
          );
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sistema"
      className="relative overflow-visible px-6 pb-14 pt-10 md:-mt-[10rem] md:px-10 md:pb-[4.5rem] md:pt-2 lg:-mt-[12rem] lg:px-14 lg:pt-4"
    >
      <div className="absolute left-[10%] top-8 h-20 w-20 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute right-[12%] top-16 h-24 w-24 rounded-full bg-[#ffb35f]/14 blur-3xl" />

      <div className="relative z-10 md:hidden">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#fff1e5]/82">
            El sistema
          </p>
          <h2 className="font-display text-3xl uppercase tracking-wide text-[#fff7ef]">
            <ShinyText
              text={"\u00BFC\u00F3mo funciona el sistema?"}
              speed={3.2}
              delay={0.2}
              color="#fff2df"
              shineColor="#ffffff"
              spread={115}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </h2>
          <div className="h-[2px] w-24 rounded-full bg-[#ffd8bb]/45" />
        </div>

        <div className="grid gap-5">
          {pasos.map((paso, index) => (
            <SistemaCard key={paso.numero} paso={paso} index={index} />
          ))}
        </div>
      </div>

      <div ref={desktopSceneRef} className="relative hidden h-[280vh] md:block">
        <div ref={pinRef} className="relative h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div
              ref={circleRef}
              className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_24px_120px_rgba(132,45,17,0.14)]"
              style={{
                width: "min(calc(100% - 2rem), 1080px)",
              }}
            >
              <Grainient
                color1="#8b2916"
                color2="#cc5a27"
                color3="#e8aa67"
                timeSpeed={0.18}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={24}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={1.4}
                grainAmount={0.18}
                grainScale={1.4}
                grainAnimated={false}
                contrast={1.9}
                gamma={0.92}
                saturation={1.05}
                centerX={0}
                centerY={0}
                zoom={0.92}
              />
              <div
                ref={introTitleRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-[9%] z-10 flex flex-col items-center justify-center gap-y-0.5 text-center"
              >
                <span
                  data-system-word
                  className="system-circle-line font-display block w-full text-[clamp(3.75rem,6.85vw,7.35rem)] uppercase leading-[0.76] tracking-[0.005em] text-[#fff7ef]"
                >
                  {"\u00BFC\u00F3mo funciona"}
                </span>
                <span
                  data-system-word
                  className="system-circle-line system-circle-neon font-body block w-full text-[clamp(3.35rem,5.95vw,6.15rem)] italic leading-[0.78] tracking-[0.005em] text-[#ffcf68]"
                >
                  el sistema?
                </span>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="relative z-10 flex h-full flex-col justify-center">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <p
                data-system-copy
                className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#fff1e5]/82"
              >
                El sistema
              </p>
              <h2
                data-system-copy
                data-system-title
                className="font-display text-[clamp(3rem,4.25vw,4.45rem)] uppercase tracking-wide text-[#fff7ef]"
              >
                <ShinyText
                  text={"\u00BFC\u00F3mo funciona el sistema?"}
                  speed={3.2}
                  delay={0.2}
                  color="#fff2df"
                  shineColor="#ffffff"
                  spread={115}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </h2>
              <div
                data-system-copy
                className="h-[2px] w-24 rounded-full bg-[#ffd8bb]/45"
              />
            </div>

            <div className="mx-auto grid w-full max-w-[1120px] grid-cols-3 gap-6">
              {pasos.map((paso, index) => (
                <div key={paso.numero} data-system-card>
                  <SistemaCard
                    paso={paso}
                    index={index}
                    className="min-h-[350px] px-7 py-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
