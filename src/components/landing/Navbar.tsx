import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      style={{ backgroundColor: "rgba(245, 240, 232, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Pactados"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            priority
          />
        </Link>
        <Link
          href="/retos"
          className="px-5 py-2 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 text-white"
          style={{
            background: "linear-gradient(135deg, #F26430, #E03228)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Ver retos
        </Link>
      </div>
    </nav>
  );
}
