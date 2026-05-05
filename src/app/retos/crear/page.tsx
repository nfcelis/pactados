import Link from "next/link";
import { PenLine, CheckCircle2, ShieldCheck, Users, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FormRetoPersonalizado } from "@/components/retos/FormRetoPersonalizado";

export const metadata = {
  title: "Crea tu reto - Pactados",
  description: "Define tu propio reto con tus reglas y condiciones.",
};

const bullets = [
  { icon: CheckCircle2, text: "Define reglas claras y medibles" },
  { icon: Users, text: "Invita a tus personas de confianza" },
  { icon: ShieldCheck, text: "Compromiso privado con consecuencias reales" },
];

export default function CrearRetoPage() {
  return (
    <main className="landing-stage overflow-hidden px-4 pb-0 pt-6 md:px-6 lg:px-8">
      <div className="landing-orb landing-orb-left" aria-hidden="true" />
      <div className="landing-orb landing-orb-right" aria-hidden="true" />

      <div className="relative flex min-h-screen flex-col">
        <section className="relative mx-auto w-full max-w-[1120px] flex-1 pb-16 pt-24 md:pt-28 lg:pt-32">
          <Navbar />
          <div className="landing-grid absolute inset-x-0 top-0 h-52 opacity-30" />

          <div className="relative z-10">
            <div className="animate-fade-in-up delay-100">
              <Link
                href="/retos"
                className="font-body mb-8 inline-flex items-center gap-2 text-sm font-medium text-black/52 transition hover:text-black/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Todos los retos
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Left ember panel */}
              <div className="landing-panel landing-panel-ember animate-fade-in-up delay-200 p-7 lg:col-span-2 lg:self-start">
                <div className="mb-5 inline-flex rounded-2xl border border-white/18 bg-white/12 p-3 text-[#ffd8a8] backdrop-blur-sm">
                  <PenLine className="h-7 w-7" />
                </div>

                <h1 className="font-display text-[clamp(3rem,6vw,4.8rem)] uppercase leading-[0.88] tracking-tight text-[#fff7ef] [text-shadow:0_8px_24px_rgba(97,27,9,0.28)]">
                  Crea tu
                  <br />
                  <span className="text-[#ffd8a8]">reto</span>
                </h1>

                <p className="font-body mt-4 text-[0.95rem] leading-relaxed text-white/80">
                  Define objetivo, frecuencia y consecuencias. Solo tu grupo ve el reto.
                </p>

                <div className="mt-7 space-y-3">
                  {bullets.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 rounded-2xl border border-white/14 bg-white/10 px-3 py-2.5 backdrop-blur-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#ffd8a8]" />
                      <span className="font-body text-sm text-white/82">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form panel */}
              <div className="landing-panel landing-panel-warm animate-fade-in-up delay-300 p-6 sm:p-8 lg:col-span-3">
                <h2 className="font-display mb-6 text-[2.6rem] uppercase leading-none tracking-tight">
                  <span className="hero-title-solid">Tu reto</span>,{" "}
                  <span className="landing-highlight">tus reglas</span>
                </h2>
                <FormRetoPersonalizado />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1120px]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
