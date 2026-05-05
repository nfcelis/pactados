import { BarChart2, DollarSign, Eye, type LucideIcon } from "lucide-react";

const razones: { icon: LucideIcon; titulo: string; descripcion: string }[] = [
  {
    icon: DollarSign,
    titulo: "Consecuencia economica real",
    descripcion:
      "Cuando hay algo que perder, tu cerebro deja de negociar contigo.",
  },
  {
    icon: Eye,
    titulo: "Compromiso publico",
    descripcion:
      "Decirlo en voz alta y mostrar avances cambia la forma en que respondes.",
  },
  {
    icon: BarChart2,
    titulo: "Accountability diario",
    descripcion:
      "Cada dia cuenta. Cada reporte queda. Cada omision se nota.",
  },
];

export function PorQueFunciona() {
  return (
    <section id="ciencia" className="mt-auto px-6 pb-6 md:px-8 lg:px-10">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(49,14,5,0.9),rgba(26,8,3,0.97))] px-5 py-6 shadow-[0_30px_70px_rgba(0,0,0,0.28)] md:px-6">
        <div className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-[#ff8b41]/18 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-[#ff5c2b]/16 blur-3xl" />

        <div className="relative z-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
            La ciencia detras
          </p>
          <h2 className="font-display mt-2 text-4xl uppercase tracking-wide text-white md:text-5xl">
            Por que funciona
          </h2>

          <div className="font-body mt-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/72">
            <span>Compromiso publico</span>
            <span className="text-[#ff934d]">+</span>
            <span>Consecuencia economica</span>
            <span className="text-[#ff934d]">+</span>
            <span>Seguimiento diario</span>
          </div>
        </div>

        <div className="relative z-10 mt-7 grid gap-4 md:grid-cols-3">
          {razones.map((razon) => (
            <div
              key={razon.titulo}
              className="rounded-[24px] border border-white/8 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-[#ff8b41]/12 p-3 text-[#ff8b41]">
                <razon.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                {razon.titulo}
              </h3>
              <p className="font-body mt-3 text-sm leading-6 text-white/68">
                {razon.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
