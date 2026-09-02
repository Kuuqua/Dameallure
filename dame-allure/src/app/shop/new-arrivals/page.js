import { getNewArrivals } from "@/data/products";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ShopProductBrowser from "@/components/shop/ShopProductBrowser";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "New Arrivals",
  description: "The newest pieces at Dame Allure.",
};

export default function NewArrivalsPage() {
  const items = getNewArrivals();

  return (
    <>
      <section className="container-edit pb-6 pt-10 md:pt-14">
        <Breadcrumbs items={[{ label: "Shop", href: "/shop" }, { label: "New Arrivals" }]} />
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">New Arrivals</h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">
          The newest additions, across every category.
        </p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <ShopProductBrowser
          products={items}
          emptyStateProps={{
            ctaLabel: "Explore The Shop",
            ctaHref: "/shop",
          }}
        />
      </section>

      <CTASection />
    </>
  );
}
