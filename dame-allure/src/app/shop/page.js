import { shopCategories } from "@/data/shop-categories";
import CategoryTile from "@/components/shop/CategoryTile";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "Shop",
  description:
    "Shop Dame Allure by lifestyle, not by aisle — The Work Edit, The Friday Edit, The Sunday Edit and more, each curated around how she actually lives.",
};

export default function ShopPage() {
  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Shop</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-plum md:text-5xl">
          Shop by edit, not by aisle.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] text-charcoal/80">
          Every collection is built around a moment in her life. Not sure
          where to start? Skip the browsing —{" "}
          <a href="/create-your-edit" className="underline decoration-gold underline-offset-4">
            create your edit
          </a>{" "}
          instead.
        </p>
      </section>

      <section className="container-edit py-12 md:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shopCategories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
