import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="py-8 px-4"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div
          className="rounded-xl p-2"
          style={{ backgroundColor: "#F5F0E8" }}
        >
          <Image
            src="/logo.png"
            alt="Pactados"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Plataforma de Metas con Consecuencias
        </p>
        <p
          className="text-sm text-gray-500"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
