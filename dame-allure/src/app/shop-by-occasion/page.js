import { occasions } from "@/data/occasions";
import Link from "next/link";
import OccasionCard from "@/components/home/OccasionCard";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "Shop By Occasion",
  description:
    "Start with the moment in her life, not the product category — Work, Friday, Sunday, Vacation, Travel, Date Night, Occasions, Self-Care and Gifting.",
};

export default function ShopByOccasionPage() {
  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Shop By Occasion
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-plum md:text-5xl">
          What are you preparing for?
        </h1>
        <p className="mt-4 max-w-lg text-[15px] text-charcoal/80">
          Start with the situation, not the category, and we&apos;ll show
          you what belongs together. Prefer to browse by product instead?{" "}
          <Link href="/shop" className="underline decoration-gold underline-offset-4">
            Shop by category
          </Link>
          .
        </p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <div className="grid grid-cols-1 gap-x-10 border-b border-plum/15 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion) => (
            <OccasionCard
              key={occasion.key}
              label={occasion.label}
              copy={occasion.copy}
              href={occasion.href}
            />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
