import Hero from "@/components/editorial/Hero";
import PreparingFor from "@/components/home/PreparingFor";
import PhilosophyQuote from "@/components/editorial/PhilosophyQuote";
import Exclusives from "@/components/editorial/Exclusives";
import CTASection from "@/components/editorial/CTASection";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <PreparingFor />
      </Reveal>
      <Reveal>
        <PhilosophyQuote />
      </Reveal>
      <Reveal>
        <Exclusives />
      </Reveal>
      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
