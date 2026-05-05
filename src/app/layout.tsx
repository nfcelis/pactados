import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import DoodleBackground from "@/components/DoodleBackground";
import ClickSpark from "@/components/ui/click-spark";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pactados - Plataforma de Metas con Consecuencias",
  description:
    "La plataforma donde tus metas tienen consecuencias reales. Elige un reto, invita a tus amigos y demuestra tu disciplina.",
  openGraph: {
    title: "Pactados - Plataforma de Metas con Consecuencias",
    description:
      "Y si perder dinero te hiciera mas disciplinado? Unete a un reto hoy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}
        style={{ backgroundColor: "#f5f0e8", color: "#1a1a1a" }}
      >
        <ClickSpark
          sparkColor="#f08a34"
          sparkSize={12}
          sparkRadius={18}
          sparkCount={8}
          duration={420}
          easing="ease-out"
          extraScale={1.15}
        >
          <DoodleBackground bgColor="#f5f0e8" doodleColor="#110f0f">
            {children}
          </DoodleBackground>
        </ClickSpark>
      </body>
    </html>
  );
}
