import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { RetosDestacados } from "@/components/landing/RetosDestacados";
import { PorQueFunciona } from "@/components/landing/PorQueFunciona";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />
      <Hero />
      <ComoFunciona />
      <RetosDestacados />
      <PorQueFunciona />
      <CTA />
      <Footer />
    </main>
  );
}
