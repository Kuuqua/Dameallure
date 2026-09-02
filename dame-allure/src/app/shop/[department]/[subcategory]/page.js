import { notFound } from "next/navigation";
import {
  departments,
  getDepartment,
  getSubcategorySlug,
  findSubcategoryByRouteSlug,
} from "@/data/shop-taxonomy";
import { getProductsBySubcategory } from "@/data/products";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ShopProductBrowser from "@/components/shop/ShopProductBrowser";
import CTASection from "@/components/editorial/CTASection";

export function generateStaticParams() {
  return departments.flatMap((d) =>
    d.subcategories.map((sub) => ({
      department: d.slug,
      subcategory: getSubcategorySlug(sub),
    }))
  );
}

export function generateMetadata({ params }) {
  const department = getDepartment(params.department);
  if (!department) return {};
  const subcategory = findSubcategoryByRouteSlug(department, params.subcategory);
  if (!subcategory) return {};
  return {
    title: `${subcategory} — ${department.label}`,
    description: `${subcategory} at Dame Allure.`,
  };
}

export default function ShopSubcategoryPage({ params }) {
  const department = getDepartment(params.department);
  if (!department) notFound();
  const subcategory = findSubcategoryByRouteSlug(department, params.subcategory);
  if (!subcategory) notFound();

  const items = getProductsBySubcategory(department.slug, subcategory);

  return (
    <>
      <section className="container-edit pb-6 pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: department.label, href: `/shop/${department.slug}` },
            { label: subcategory },
          ]}
        />
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">{subcategory}</h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">
          Part of {department.label.toLowerCase()} — thoughtfully selected, not endlessly stocked.
        </p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <ShopProductBrowser
          products={items}
          emptyStateProps={{
            message: "Coming soon to Dame Allure.",
            ctaLabel: "Explore Other Categories",
            ctaHref: `/shop/${department.slug}`,
          }}
        />
      </section>

      <CTASection
        eyebrow="Not seeing what she needs?"
        heading="Let us curate it instead."
        copy="Tell us the occasion, the budget and her style — we'll build the rest of the curation around it."
      />
    </>
  );
}
