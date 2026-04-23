import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import ShinyText from "@/components/ui/shiny-text";
import StarBorder from "@/components/ui/star-border";

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden px-6 pb-16 pt-20 md:min-h-[calc(100vh-2rem)] md:px-10 md:pb-36 md:pt-32 lg:px-14 lg:pb-44 lg:pt-36">
      <div className="landing-floating-doodle left-[20.8%] top-[22.6%] hidden lg:block">
        <Image
          src="/fuego-doodle-left.png"
          alt=""
          width={56}
          height={56}
          className="h-[5.6rem] w-[5.6rem] object-contain"
        />
      </div>
      <div className="landing-floating-doodle right-[16.8%] top-[21.2%] hidden lg:block">
        <Image
          src="/fuego-doodle-right-large.png"
          alt=""
          width={74}
          height={74}
          className="h-[7rem] w-[7rem] object-contain"
        />
      </div>
      <div className="landing-floating-doodle bottom-[20.5%] left-[8.6%] hidden lg:block">
        <Image
          src="/fuego-doodle-reference-v2.png"
          alt=""
          width={76}
          height={76}
          className="h-[6.6rem] w-[6.6rem] object-contain"
        />
      </div>
      <div className="landing-star-doodle landing-star-doodle-left" aria-hidden="true" />
      <div className="landing-star-doodle landing-star-doodle-right" aria-hidden="true" />
      <div className="landing-grid absolute inset-x-10 top-12 bottom-8 opacity-30" />

      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center text-center">
        <div className="animate-fade-in-up delay-100">
          <div className="hero-fire" aria-hidden="true">
            <span className="hero-fire-aura" />
            <span className="hero-fire-halo" />
            <Image
              src="/fire-lines-reference.png"
              alt=""
              width={34}
              height={34}
              className="absolute right-[0.55rem] top-[0.05rem] h-[3.85rem] w-[3.85rem] object-contain opacity-90"
            />
            <Image
              src="/firee.png"
              alt=""
              fill
              className="hero-fire-image"
              sizes="220px"
              priority
            />
          </div>

          <h1 className="font-display hero-title mx-auto text-[clamp(2rem,7.5vw,5.35rem)] leading-[0.9] uppercase tracking-tight">
            <span className="hero-title-line block md:whitespace-nowrap">
              <span className="hero-title-solid">{"\u00bfY si "}</span>
              <GradientText
                colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                animationSpeed={4.2}
                showBorder={false}
                className="hero-gradient-word"
              >
                perder dinero
              </GradientText>
              <span className="hero-title-solid"> te</span>
            </span>
            <span className="hero-title-line block md:whitespace-nowrap">
              <span className="hero-title-solid">{"hiciera M\u00C1S "}</span>
              <GradientText
                colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                animationSpeed={4.2}
                showBorder={false}
                className="hero-gradient-word"
              >
                disciplinado?
              </GradientText>
            </span>
          </h1>

          <p className="font-body mt-5 max-w-[58ch] text-[1.02rem] leading-7 text-black/72 md:text-lg">
            La plataforma donde tus metas tienen{" "}
            <strong className="font-semibold text-[#4d3427]">
              <ShinyText
                text="consecuencias reales"
                speed={3.4}
                delay={0.4}
                color="#6a4630"
                shineColor="#fff0cf"
                spread={112}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </strong>
            {". Compromiso p\u00FAblico + apuesta econ\u00F3mica = disciplina que no falla."}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="relative inline-flex items-center justify-center">
              <Image
                src="/button-lines-right.png"
                alt=""
                width={32}
                height={36}
                className="absolute left-[-1.9rem] top-1/2 hidden h-[3.15rem] w-[2.7rem] -translate-y-1/2 object-contain opacity-95 md:block"
              />
              <StarBorder
                as="div"
                className="font-body rounded-full"
                color="#d92626"
                speed="3.4s"
                thickness={4}
                contentClassName="rounded-full"
              >
                <Link
                  href="/retos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f47432] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_16px_24px_rgba(156,44,14,0.24),0_24px_38px_rgba(244,116,50,0.26),0_0_24px_rgba(255,152,88,0.2)] transition hover:-translate-y-0.5 hover:bg-[#e8672d]"
                >
                  Empezar Reto
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </StarBorder>
              <Image
                src="/button-lines-left.png"
                alt=""
                width={34}
                height={26}
                className="absolute right-[-2.35rem] top-[18%] hidden h-[4.1rem] w-[3.5rem] -translate-y-1/2 object-contain opacity-95 md:block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
