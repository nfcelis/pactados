import { Target, Users, Smartphone, type LucideIcon } from "lucide-react";

const pasos: { numero: string; icon: LucideIcon; titulo: string; descripcion: string }[] = [
  {
    numero: "01",
    icon: Target,
    titulo: "Elige un reto o crea el tuyo",
    descripcion:
      "Selecciona entre los retos disponibles o propón uno propio. Fitness, lectura, estudio, hábitos — lo que necesites cambiar.",
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
    icon: Smartphone,
    titulo: "Grupo de WhatsApp con seguimiento",
    descripcion:
      "Recibirán un grupo de WhatsApp con recordatorios diarios. Transparencia total. Sin escapatoria.",
  },
];

export function ComoFunciona() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium mb-3 uppercase tracking-widest"
            style={{ color: "#F26430", fontFamily: "var(--font-dm-sans)" }}
          >
            El sistema
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl uppercase"
            style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
          >
            Cómo funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="relative p-8 rounded-xl border transition-all duration-300 hover:border-[#F26430] group"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#DDD6C8",
              }}
            >
              {/* Número de fondo */}
              <div
                className="absolute top-4 right-6 text-8xl font-black opacity-5 select-none"
                style={{ fontFamily: "var(--font-bebas)", color: "#F26430" }}
              >
                {paso.numero}
              </div>

              <paso.icon className="w-10 h-10 mb-4" style={{ color: "#F26430" }} />
              <h3
                className="text-2xl mb-3 uppercase"
                style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
              >
                {paso.titulo}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
