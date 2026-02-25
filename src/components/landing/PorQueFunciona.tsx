import { DollarSign, Eye, BarChart2, type LucideIcon } from "lucide-react";

const razones: { icon: LucideIcon; titulo: string; descripcion: string }[] = [
  {
    icon: DollarSign,
    titulo: "Consecuencia económica real",
    descripcion:
      "El dinero habla. Cuando hay algo que perder, el cerebro activa un modo diferente. No es motivación — es ingeniería del comportamiento.",
  },
  {
    icon: Eye,
    titulo: "Compromiso público",
    descripcion:
      "Decirle a tus amigos que vas a hacer algo multiplica las probabilidades de que lo hagas. La vergüenza social es poderosa.",
  },
  {
    icon: BarChart2,
    titulo: "Accountability diario",
    descripcion:
      "Un recordatorio cada día. Un grupo que te vigila. Un registro que no miente. Sin excusas, sin negaciones.",
  },
];

export function PorQueFunciona() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#EDE8DF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium mb-3 uppercase tracking-widest"
            style={{ color: "#1A1A1A", fontFamily: "var(--font-dm-sans)" }}
          >
            La ciencia detrás
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl uppercase"
            style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
          >
            Por qué funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {razones.map((razon) => (
            <div key={razon.titulo} className="text-center">
              <div className="flex justify-center mb-6">
                <razon.icon className="w-14 h-14" style={{ color: "#1A1A1A" }} />
              </div>
              <h3
                className="text-2xl uppercase mb-4"
                style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}
              >
                {razon.titulo}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {razon.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Formula visual */}
        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{ backgroundColor: "#1A1A1A", border: "1px solid #1A1A1A" }}
        >
          <p
            className="text-3xl sm:text-4xl md:text-5xl uppercase"
            style={{ fontFamily: "var(--font-bebas)", color: "#FFFFFF" }}
          >
            Compromiso público{" "}
            <span style={{ color: "#F9D67A" }}>+</span>{" "}
            Consecuencia económica{" "}
            <span style={{ color: "#F9D67A" }}>=</span>{" "}
            <span style={{ color: "#F9D67A" }}>Disciplina real</span>
          </p>
        </div>
      </div>
    </section>
  );
}
