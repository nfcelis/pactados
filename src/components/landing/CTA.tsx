import Link from "next/link";

import LiquidEther from "@/components/LiquidEther";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden px-6 pb-20 pt-16 md:px-10 md:pb-24 md:pt-18 lg:px-14 lg:pb-28 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-8%] inset-y-0 opacity-65"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 84%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 84%, transparent 100%)",
        }}
      >
        <LiquidEther
          colors={["#ffcf8f", "#ff8f52", "#ffd8ab"]}
          mouseForce={16}
          cursorSize={96}
          isViscous
          viscous={26}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.42}
          autoIntensity={1.85}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,243,224,0.16),transparent_26%),radial-gradient(circle_at_18%_84%,rgba(255,178,112,0.12),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(255,115,55,0.12),transparent_24%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,244,228,0.02)_0%,rgba(228,93,48,0.06)_40%,rgba(180,55,23,0.14)_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center text-center">
          <h2 className="font-display max-w-[10ch] text-[clamp(4.2rem,10vw,9rem)] uppercase leading-[0.9] tracking-[0.01em] text-white [text-shadow:0_18px_36px_rgba(104,24,7,0.18)]">
            {"\u00bfListo para comprometerte de verdad?"}
          </h2>
          <p className="font-body mt-6 max-w-xl text-base leading-7 text-white/84 md:text-[1.15rem]">
            No hay atajos. Solo retos, compromiso y resultados.
          </p>
          <Link
            href="/retos"
            className="font-body mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[#ef412c] shadow-[0_18px_36px_rgba(122,29,10,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff3e6] active:translate-y-0"
          >
            Ver todos los retos {"\u2192"}
          </Link>
        </div>
      </div>
    </section>
  );
}
