import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { CienciaDetras } from "@/components/landing/CienciaDetras";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="landing-stage overflow-hidden px-4 pb-0 pt-6 md:px-6 lg:px-8">
      <div className="landing-orb landing-orb-left" aria-hidden="true" />
      <div className="landing-orb landing-orb-right" aria-hidden="true" />

      <div className="relative flex min-h-[calc(100vh-2rem)] flex-col">
        <section className="mx-auto flex min-h-[780px] w-full max-w-[1120px] flex-1 flex-col">
          <Navbar />
          <Hero />
          <ComoFunciona />
          <CienciaDetras />
        </section>

        <CTA />

        <div className="mx-auto w-full max-w-[1120px]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
