import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import DoodleBackground from "@/components/DoodleBackground";

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
  title: "Pactados – Plataforma de Metas con Consecuencias",
  description:
    "La plataforma donde tus metas tienen consecuencias reales. Elige un reto, invita a tus amigos y demuestra tu disciplina.",
  openGraph: {
    title: "Pactados – Plataforma de Metas con Consecuencias",
    description:
      "¿Y si perder dinero te hiciera más disciplinado? Únete a un reto hoy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} antialiased`}
        style={{ backgroundColor: "#F5F0E8", color: "#1A1A1A" }}
      >
        <DoodleBackground bgColor="#F5F0E8" doodleColor="#110f0f">
          {children}
        </DoodleBackground>
      </body>
    </html>
  );
}
