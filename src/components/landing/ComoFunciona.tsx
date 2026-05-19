import Image from "next/image";
import { BellRing, Coins, Users, type LucideIcon } from "lucide-react";

import GradientText from "@/components/ui/gradient-text";
import SpotlightCard from "@/components/ui/spotlight-card";

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
      className={`group relative flex min-h-[320px] flex-col items-center justify-start overflow-visible border border-white/24 bg-[linear-gradient(180deg,rgba(255,244,232,0.34)_0%,rgba(255,227,201,0.22)_100%)] p-7 pt-20 text-center shadow-[0_22px_34px_rgba(112,41,14,0.16)] ${className}`}
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
  return (
    <section
      id="sistema"
      className="relative mt-10 overflow-visible px-6 pb-20 pt-6 md:mt-14 md:px-10 md:pb-28 md:pt-8 lg:mt-16 lg:px-14 lg:pb-32 lg:pt-10"
    >
      <div
        aria-hidden="true"
        className="como-funciona-bg pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+18rem)] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,210,140,0.18),rgba(255,160,70,0.08)_54%,transparent_80%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mb-14 flex flex-col items-center gap-3 text-center md:mb-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#b56a3b]/86">
            El sistema
          </p>
          <h2 className="font-display text-[clamp(2.4rem,4.25vw,4.45rem)] uppercase leading-[0.92] tracking-wide text-[#b94819]">
            <span className="block md:whitespace-nowrap">
              <span>{"¿Cómo "}</span>
              <GradientText
                colors={["#FFB300", "#FF6A00", "#A80000", "#FF6A00", "#FFB300"]}
                showBorder={false}
                className="hero-gradient-word inline-flex"
              >
                funciona
              </GradientText>
              <span> el</span>
            </span>
            <span className="block md:whitespace-nowrap">sistema?</span>
          </h2>
          <div className="h-[2px] w-24 rounded-full bg-[linear-gradient(90deg,rgba(217,92,28,0.08),rgba(217,92,28,0.78),rgba(217,92,28,0.08))]" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {pasos.map((paso, index) => (
            <div key={paso.numero}>
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
