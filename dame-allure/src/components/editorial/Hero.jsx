import Button from "@/components/ui/Button";
import HeroParallaxImage from "@/components/editorial/HeroParallaxImage";

export default function Hero() {
  return (
    <section className="container-edit grid grid-cols-1 items-start gap-12 pb-16 pt-10 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-14">
      <div className="order-2 md:order-1 md:col-span-5 md:pt-10">
        <p className="mb-5 text-[12px] tracking-[0.15em] text-gold-deep">
          A Women&apos;s Lifestyle Destination
        </p>
        <h1 className="font-display text-5xl leading-[0.95] text-plum sm:text-6xl md:text-[3.4rem] lg:text-[3.8rem]">
          Dame Allure
        </h1>
        <p className="mt-3 font-display text-2xl italic text-plum/80 md:text-3xl">
          Curated for her.
        </p>
        <p className="mt-6 max-w-md font-display text-xl text-plum md:text-2xl">
          Everything she needs, thoughtfully curated.
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/75">
          Fashion, lifestyle and thoughtful experiences curated around the
          woman you are — and the life you&apos;re living.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/create-your-curation" variant="primary">
            Create Your Curation
          </Button>
          <Button href="/shop" variant="secondary">
            Explore Dame Allure
          </Button>
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-7">
        {/*
          Temporary placeholder photography (see src/lib/placeholder.js).
          Swap the PlaceholderPhoto inside HeroParallaxImage for a real
          cinematic image of the Dame Allure woman once photography is
          available — the overlay caption and parallax can stay as-is.
        */}
        <HeroParallaxImage />
      </div>
    </section>
  );
}
