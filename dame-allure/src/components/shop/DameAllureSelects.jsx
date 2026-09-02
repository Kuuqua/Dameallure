import { selectSlugs } from "@/data/dame-allure-selects";
import { getProduct } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";

export default function DameAllureSelects() {
  const items = selectSlugs.map((slug) => getProduct(slug)).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="container-edit py-16 md:py-24">
      <div className="max-w-xl">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Dame Allure Selects
        </p>
        <h2 className="mt-4 font-display text-3xl text-plum md:text-4xl">
          Pieces we&apos;re loving right now.
        </h2>
      </div>

      <div className="mt-10">
        <ProductGrid products={items} />
      </div>
    </section>
  );
}
