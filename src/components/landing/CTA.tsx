"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import ElectricBorder from "@/components/ui/electric-border";
import LightPillar from "@/components/ui/light-pillar";
import GradientText from "@/components/ui/gradient-text";

const SIDE_SPARKLES = [
  { top: "14%", left: "9%" },
  { top: "22%", right: "18%" },
  { top: "54%", left: "7%" },
  { top: "67%", right: "10%" },
];

function SideBadge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute hidden rounded-full border border-[#ffcf75]/75 bg-[radial-gradient(circle_at_35%_30%,rgba(255,199,83,0.22),rgba(255,106,27,0.14)_58%,rgba(0,0,0,0)_100%)] shadow-[inset_0_0_0_1px_rgba(255,228,163,0.16),0_0_28px_rgba(255,177,63,0.2)] lg:flex ${className}`}
    >
      <div className="flex h-full w-full items-center justify-center text-[#ffcf65]">
        {children}
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section
      id="cta"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-visible px-6 pb-18 pt-16 md:px-10 md:pb-22 md:pt-18 lg:px-14 lg:pb-24 lg:pt-20"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[47%] h-[165%] w-[138%] -translate-x-1/2 -translate-y-1/2 overflow-hidden blur-[0.6px] md:h-[175%] md:w-[132%] lg:h-[185%] lg:w-[126%]"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.78) 10%, black 19%, black 78%, rgba(0,0,0,0.66) 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.78) 10%, black 19%, black 78%, rgba(0,0,0,0.66) 92%, transparent 100%)",
        }}
      >
        <LightPillar
          topColor="#ff9827"
          bottomColor="#f24815"
          intensity={1.08}
          rotationSpeed={0.55}
          glowAmount={0.00235}
          pillarWidth={4.15}
          pillarHeight={0.46}
          noiseIntensity={0.28}
          pillarRotation={129}
          mixBlendMode="screen"
          quality="high"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,180,77,0.12),transparent_26%),radial-gradient(circle_at_16%_18%,rgba(255,171,82,0.06),transparent_18%),radial-gradient(circle_at_84%_72%,rgba(255,124,31,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-x-[-6%] bottom-[-3rem] h-[16rem] bg-[radial-gradient(ellipse_at_center,rgba(255,198,91,0.14)_0%,rgba(255,145,46,0.06)_40%,transparent_72%)] blur-[72px]" />

      <div className="pointer-events-none absolute left-[-3%] top-[12%] hidden opacity-40 lg:block">
        <Image
          src="/flame-doodle-bottom-left-transparent.png"
          alt=""
          width={520}
          height={420}
          className="h-auto w-[18rem] -scale-x-100 object-contain"
        />
      </div>
      <div className="pointer-events-none absolute right-[-2%] top-[6%] hidden opacity-35 lg:block">
        <Image
          src="/fuego-doodle-right-large.png"
          alt=""
          width={300}
          height={300}
          className="h-auto w-[14rem] object-contain"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SIDE_SPARKLES.map((item, index) => (
          <Sparkles
            key={index}
            className="absolute h-5 w-5 text-[#ffca67]/70"
            strokeWidth={1.8}
            style={item}
          />
        ))}
      </div>

      <SideBadge className="left-[8.5%] top-[34%] h-[7.4rem] w-[7.4rem]">
        <Target className="h-11 w-11" strokeWidth={2.2} />
      </SideBadge>
      <SideBadge className="right-[12%] top-[20%] h-[7.1rem] w-[7.1rem]">
        <Users className="h-11 w-11" strokeWidth={2.2} />
      </SideBadge>
      <SideBadge className="right-[9%] top-[54%] h-[7.4rem] w-[7.4rem]">
        <Trophy className="h-11 w-11" strokeWidth={2.1} />
      </SideBadge>

      <div className="relative z-10 mx-auto flex w-full max-w-[1080px] flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 scale-[1.45] rounded-full bg-[radial-gradient(circle,rgba(255,207,103,0.4),rgba(255,98,30,0.14)_56%,transparent_72%)] blur-2xl" />
          <div className="relative h-[5.5rem] w-[5.5rem]">
            <Image src="/firee.png" alt="" fill sizes="88px" className="object-contain" />
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-4">
          <span className="hidden h-px w-16 bg-[linear-gradient(90deg,transparent,#ffb647,#ff8a2f)] md:block" />
          <p className="font-display text-[0.95rem] uppercase tracking-[0.34em] text-[#ffd76f] md:text-[1.05rem]">
            No hay atajos
          </p>
          <span className="hidden h-px w-16 bg-[linear-gradient(90deg,#ff8a2f,#ffb647,transparent)] md:block" />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <h2 className="font-display cta-poster-line text-[clamp(3.2rem,7.2vw,6.9rem)] uppercase leading-[0.86] tracking-[-0.05em] text-white [text-shadow:0_10px_22px_rgba(32,9,4,0.24),0_18px_34px_rgba(32,9,4,0.18)]">
            ¿Listo para
          </h2>

          <div className="cta-poster-tilt mt-[-0.1rem]">
            <GradientText
              colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
              animationSpeed={4.2}
              showBorder={false}
              className="hero-gradient-word cta-poster-gradient text-[clamp(5rem,13vw,10.7rem)] uppercase leading-[0.82] tracking-[-0.07em]"
            >
              Pactar
            </GradientText>
          </div>

          <div className="cta-poster-ribbon mt-[-0.45rem] inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-4">
            <span className="font-display text-[clamp(2.6rem,6vw,5.2rem)] uppercase leading-none tracking-[-0.05em] text-white [text-shadow:0_8px_20px_rgba(0,0,0,0.28)]">
              Tu compromiso
            </span>
          </div>

          <h2 className="font-display cta-poster-line mt-1 text-[clamp(3.1rem,7vw,6.4rem)] uppercase leading-[0.88] tracking-[-0.05em] text-white [text-shadow:0_10px_22px_rgba(32,9,4,0.24),0_18px_34px_rgba(32,9,4,0.18)]">
            Y ver{" "}
            <GradientText
              colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
              animationSpeed={4.2}
              showBorder={false}
              className="hero-gradient-word cta-poster-gradient inline-flex text-[1em] uppercase leading-none tracking-[-0.06em]"
            >
              Resultados?
            </GradientText>
          </h2>
        </div>

        <div className="relative mt-10">
          <ElectricBorder
            color="#ffb24c"
            speed={1}
            chaos={0.12}
            thickness={2}
            borderRadius={30}
            className="rounded-[2rem]"
            style={{ borderRadius: 30 }}
          >
            <Link
              href="/retos"
              className="font-display relative inline-flex items-center justify-center gap-3 rounded-[2rem] bg-[linear-gradient(180deg,#e36b1f_0%,#bf4b14_100%)] px-8 py-4 text-[1.18rem] uppercase tracking-[-0.03em] text-[#fff7ec] shadow-[0_0_0_4px_rgba(255,193,112,0.08),0_18px_42px_rgba(74,15,2,0.28),0_0_26px_rgba(255,178,76,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c95518] active:translate-y-0 md:min-w-[31rem] md:px-12 md:py-5 md:text-[1.42rem]"
            >
              <span>Ver todos los retos</span>
              <ArrowRight className="h-7 w-7" strokeWidth={2.7} />
            </Link>
          </ElectricBorder>
          <div className="pointer-events-none absolute inset-x-[-12%] bottom-1/2 h-[4.2rem] translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,171,59,0.5)_0%,rgba(255,136,32,0.18)_48%,transparent_78%)] blur-[16px]" />
          <Image
            src="/button-lines-left.png"
            alt=""
            width={44}
            height={44}
            className="pointer-events-none absolute -left-10 top-1/2 hidden h-auto w-7 -translate-y-1/2 md:block"
          />
          <Image
            src="/button-lines-right.png"
            alt=""
            width={26}
            height={44}
            className="pointer-events-none absolute -right-8 top-1/2 hidden h-auto w-4 -translate-y-1/2 md:block"
          />
        </div>

        <p className="font-body mt-6 flex flex-wrap items-center justify-center gap-2 text-[1rem] text-white/94 md:mt-5 md:text-[1.08rem]">
          <ShieldCheck className="h-6 w-6 text-[#ffcb60]" strokeWidth={2.1} />
          <span>
            Transparencia total. Compromiso real.{" "}
            <span className="font-semibold text-[#ffd45a]">
              Resultados que se sienten.
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
