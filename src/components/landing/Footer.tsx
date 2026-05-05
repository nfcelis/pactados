import Link from "next/link";
import { Instagram, MessageCircleMore, MoveRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
      <div className="font-body flex flex-wrap items-center gap-3 text-sm text-black/48">
        <span>Pactados</span>
        <span className="text-black/18">/</span>
        <Link href="/retos" className="transition hover:text-black/78">
          Explorar retos
        </Link>
        <Link href="/retos/crear" className="transition hover:text-black/78">
          Crear reto
        </Link>
        <Link href="#sistema" className="transition hover:text-black/78">
          Como funciona
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/retos"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/45 text-black/65 transition hover:bg-white/65"
          aria-label="Ver retos"
        >
          <MoveRight className="h-4 w-4" />
        </Link>
        <Link
          href="/retos/crear"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/45 text-black/65 transition hover:bg-white/65"
          aria-label="Crear reto"
        >
          <MessageCircleMore className="h-4 w-4" />
        </Link>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/45 text-black/28"
          aria-hidden="true"
        >
          <Instagram className="h-4 w-4" />
        </span>
        <p className="font-body ml-2 text-sm text-black/42">
          c {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
