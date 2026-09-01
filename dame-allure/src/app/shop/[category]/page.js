import { notFound } from "next/navigation";
import Link from "next/link";
import { shopCategories, getCategory } from "@/data/shop-categories";
import { getProductsByCategory } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";
import CTASection from "@/components/editorial/CTASection";

export function generateStaticParams() {
  return shopCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: category.label,
    description: category.copy,
  };
}

export default function ShopCategoryPage({ params }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <Link
          href="/shop"
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 hover:text-plum"
        >
          ← All Collections
        </Link>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          {category.label}
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">{category.copy}</p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <ProductGrid products={items} />
      </section>

      <CTASection
        eyebrow="Not seeing what she needs?"
        heading="Let us curate it instead."
        copy="Tell us the occasion, the budget and her style — we'll build the rest of the edit around it."
      />
    </>
  );
}
