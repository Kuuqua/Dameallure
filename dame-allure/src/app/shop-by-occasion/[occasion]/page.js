import { notFound } from "next/navigation";
import Link from "next/link";
import { occasions } from "@/data/occasions";
import { getProductsByOccasion } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";
import CTASection from "@/components/editorial/CTASection";

// Only occasions routed to /shop-by-occasion/[slug] itself get a static
// page here — Travel and Gifting have their own dedicated pages instead
// (see src/data/occasions.js for where each card actually links).
const routedOccasions = occasions.filter((o) => o.href === `/shop-by-occasion/${o.key}`);

export function generateStaticParams() {
  return routedOccasions.map((o) => ({ occasion: o.key }));
}

export function generateMetadata({ params }) {
  const occasion = routedOccasions.find((o) => o.key === params.occasion);
  if (!occasion) return {};
  return {
    title: occasion.label,
    description: occasion.copy,
  };
}

export default function ShopByOccasionDetailPage({ params }) {
  const occasion = routedOccasions.find((o) => o.key === params.occasion);
  if (!occasion) notFound();

  const items = getProductsByOccasion(occasion.label);

  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <Link
          href="/shop-by-occasion"
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 hover:text-plum"
        >
          ← Shop By Occasion
        </Link>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          {occasion.label}
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">{occasion.copy}</p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <ProductGrid products={items} />
      </section>

      <CTASection
        eyebrow="Not seeing what she needs?"
        heading="Let us curate it instead."
        copy={`Tell us your budget and style, and your Curator will build the rest of your ${occasion.label.toLowerCase()} curation around it.`}
      />
    </>
  );
}
