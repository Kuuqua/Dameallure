import { departments } from "@/data/shop-taxonomy";
import CategoryTile from "@/components/shop/CategoryTile";
import Link from "next/link";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "Shop",
  description:
    "Shop Dame Allure by category — Clothing, Shoes, Bags, Jewellery & Accessories, Beauty & Self-Care, Travel and Gifts.",
};

export default function ShopPage() {
  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Shop</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-plum md:text-5xl">
          Everything she needs, thoughtfully curated.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] text-charcoal/80">
          Shop by category, or if you&apos;d rather start from a moment in
          her life —{" "}
          <Link href="/shop-by-occasion" className="underline decoration-gold underline-offset-4">
            shop by occasion
          </Link>{" "}
          instead. Not sure where to start at all? Skip the browsing —{" "}
          <Link href="/create-your-curation" className="underline decoration-gold underline-offset-4">
            create your curation
          </Link>
          .
        </p>
      </section>

      <section className="container-edit py-12 md:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <CategoryTile
              key={department.slug}
              category={department}
              href={`/shop/${department.slug}`}
            />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
