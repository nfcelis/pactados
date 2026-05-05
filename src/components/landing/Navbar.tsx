import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-end gap-4 px-6 pt-3 md:px-8 md:pt-4 lg:px-10">
      <Link
        href="/"
        className="pointer-events-auto absolute left-6 top-[-3.4rem] transition-opacity hover:opacity-90 md:left-8 md:top-[-4.1rem] lg:left-10"
      >
        <Image
          src="/pactados-logo-hero.png"
          alt="Pactados"
          width={260}
          height={140}
          className="h-auto w-[10.75rem] object-contain md:w-[12rem]"
          priority
        />
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="#sistema"
          className="pointer-events-auto font-body hidden rounded-full border border-black/10 bg-white/44 px-4 py-2 text-sm font-medium text-black/70 shadow-[0_10px_24px_rgba(255,255,255,0.1)] backdrop-blur-[3px] transition hover:bg-white/58 md:inline-flex"
        >
          El sistema
        </Link>
        <Link
          href="/retos"
          className="pointer-events-auto font-body inline-flex items-center rounded-full bg-[#f47432] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(244,116,50,0.35)] transition hover:-translate-y-0.5 hover:bg-[#e7662b]"
        >
          Ver retos
        </Link>
      </div>
    </nav>
  );
}
