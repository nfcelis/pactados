import Link from "next/link";
import { PenLine, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FormRetoPersonalizado } from "@/components/retos/FormRetoPersonalizado";
import DoodleBackground from "@/components/DoodleBackground";

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
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />
      <DoodleBackground bgColor="#F5F0E8" doodleColor="#110f0f">
      <div
        className="pointer-events-none absolute left-0 top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(242,100,48,0.16)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-96 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(245,230,66,0.16)" }}
      />

      <div className="relative px-4 pb-16 pt-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/retos"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            &larr; Todos los retos
          </Link>

          <section className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div
              className="rounded-3xl border p-7 lg:col-span-2 self-start"
              style={{ backgroundColor: "#E9E1D4", borderColor: "#E9E1D4" }}
            >
              <div
                className="mb-4 inline-flex rounded-xl p-3"
                style={{ backgroundColor: "#F7A04B", border: "1px solid #F7A04B" }}
              >
                <PenLine className="h-7 w-7" style={{ color: "#46413C" }} />
              </div>
              <h1
                className="text-5xl uppercase leading-none sm:text-6xl"
                style={{ fontFamily: "var(--font-bebas)",  color:"#46413C"}}
              >
                Crea tu reto
              </h1>
              <p
                className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base"
                style={{ fontFamily: "var(--font-dm-sans)", color:"#46413C"}}
              >
                Define objetivo, frecuencia y consecuencias. Solo tu grupo ve el reto.
              </p>

              <div className="mt-7 space-y-3">
                {bullets.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
                    style={{ backgroundColor: "#F7A04B" ,  borderColor: "#F7A04B" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "#4A443E" }} />
                    <span className="text-sm text-gray-200" style={{ fontFamily: "var(--font-dm-sans)", color: "#0F0F0F" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl border p-6 sm:p-8 lg:col-span-3"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#DDD6C8", boxShadow: "0 22px 44px rgba(26,26,26,0.08)" }}
            >
              <FormRetoPersonalizado />
            </div>
          </section>
        </div>
      </div>
      </DoodleBackground>
      <Footer />
    </main>
  );
}
