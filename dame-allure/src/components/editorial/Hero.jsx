import Image from "next/image";
import Button from "@/components/ui/Button";
import { placeholderImage } from "@/lib/placeholder";

export default function Hero() {
  return (
    <section className="container-edit grid grid-cols-1 items-center gap-12 pb-16 pt-10 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-14">
      <div className="order-2 md:order-1 md:col-span-5">
        <p className="mb-5 text-[12px] tracking-[0.15em] text-gold-deep">
          A curated lifestyle brand
        </p>
        <h1 className="font-display text-5xl leading-[0.95] text-plum sm:text-6xl md:text-[3.4rem] lg:text-[3.8rem]">
          Dame Allure
        </h1>
        <p className="mt-3 font-display text-2xl italic text-plum/80 md:text-3xl">
          Curated for her.
        </p>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/75">
          Fashion, lifestyle and thoughtful experiences curated around the
          woman you are — and the life you&apos;re living.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/create-your-edit" variant="primary">
            Create Your Edit
          </Button>
          <Button href="/shop" variant="secondary">
            Explore The Collections
          </Button>
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-7">
        {/*
          Temporary placeholder photography (see src/lib/placeholder.js).
          Swap the src below for a real cinematic image of the Dame Allure
          woman once photography is available — everything else on this
          panel (the overlay caption) can stay as-is.
        */}
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
          <Image
            src={placeholderImage({
              width: 1000,
              height: 1250,
              label: "Dame Allure",
              seed: "hero",
            })}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-8 bottom-8 border-t border-gold/40 pt-4 md:inset-x-10 md:bottom-10">
            <p className="text-[11px] uppercase tracking-[0.15em] text-ivory/70">
              You tell us what you need.
            </p>
            <p className="font-display text-lg italic text-ivory/90">
              We curate the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
