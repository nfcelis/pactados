"use client";

import { BarChart3, Eye, Flame, HandCoins } from "lucide-react";

const pilares = [
  {
    titulo: "Consecuencia economica real",
    descripcion:
      "Cuando hay algo que perder, el cerebro activa un modo diferente. La apuesta economica vuelve la meta mas seria.",
    icon: HandCoins,
  },
  {
    titulo: "Compromiso publico",
    descripcion:
      "Decirle a los amigos que vas a hacerlo aumenta la presion social y multiplica las probabilidades de cumplir.",
    icon: Eye,
  },
  {
    titulo: "Accountability diario",
    descripcion:
      "Un recordatorio cada dia. Un grupo que te vigila. Un registro constante para que no desaparezcas.",
    icon: BarChart3,
  },
];

export function CienciaDetras() {
  return (
    <section
      id="ciencia"
      className="relative z-10 px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-8 lg:px-14 lg:pb-14 lg:pt-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_20%_0%,rgba(255,211,156,0.2),transparent_26%),radial-gradient(circle_at_80%_0%,rgba(255,144,74,0.16),transparent_22%)]" />

      <div className="relative mx-auto max-w-[1120px]">
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-display text-center text-[clamp(2.2rem,4vw,3.7rem)] uppercase tracking-wide text-[#fff0dd] [text-shadow:0_10px_30px_rgba(96,21,7,0.18)]">
            La ciencia detras
          </h2>

          <div className="mt-4 flex w-full items-center justify-center gap-3 md:mt-5 md:gap-4">
            <Flame className="h-8 w-8 shrink-0 text-[#ffcb70] drop-shadow-[0_0_16px_rgba(255,186,88,0.42)] md:h-10 md:w-10" />
            <div className="font-body flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(255,229,201,0.2)_0%,rgba(255,188,135,0.08)_100%)] px-5 text-center text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#ffe8cd] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_28px_rgba(106,21,7,0.12)] md:min-h-14 md:px-7 md:text-[0.94rem]">
              Compromiso publico + consecuencia economica = disciplina real
            </div>
            <Flame className="h-8 w-8 shrink-0 text-[#ffcb70] drop-shadow-[0_0_16px_rgba(255,186,88,0.42)] md:h-10 md:w-10" />
          </div>

          <div className="mt-10 grid w-full gap-8 md:mt-12 md:grid-cols-3 md:gap-8">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;

              return (
                <article
                  key={pilar.titulo}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[#ffd6a3] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-7 w-7" strokeWidth={1.9} />
                  </div>
                  <h3 className="font-display text-[1.7rem] uppercase leading-[0.92] tracking-wide text-[#fff0dd]">
                    {pilar.titulo}
                  </h3>
                  <p className="font-body mt-3 max-w-[28ch] text-[1rem] leading-7 text-[#ffe1c3]/90">
                    {pilar.descripcion}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
