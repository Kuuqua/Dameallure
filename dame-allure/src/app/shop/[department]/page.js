import { notFound } from "next/navigation";
import Link from "next/link";
import { departments, getDepartment, getSubcategorySlug } from "@/data/shop-taxonomy";
import { getProductsByDepartment } from "@/data/products";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ShopProductBrowser from "@/components/shop/ShopProductBrowser";
import CTASection from "@/components/editorial/CTASection";

export function generateStaticParams() {
  return departments.map((d) => ({ department: d.slug }));
}

export function generateMetadata({ params }) {
  const department = getDepartment(params.department);
  if (!department) return {};
  return {
    title: department.label,
    description: department.copy,
  };
}

export default function ShopDepartmentPage({ params }) {
  const department = getDepartment(params.department);
  if (!department) notFound();

  const items = getProductsByDepartment(department.slug);

  return (
    <>
      <section className="container-edit pb-6 pt-10 md:pt-14">
        <Breadcrumbs items={[{ label: "Shop", href: "/shop" }, { label: department.label }]} />
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          {department.label}
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">{department.copy}</p>

        {department.subcategories.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {department.subcategories.map((sub) => (
              <Link
                key={sub}
                href={`/shop/${department.slug}/${getSubcategorySlug(sub)}`}
                className="rounded-sm border border-plum/20 px-3.5 py-1.5 text-[12px] text-plum/80 hover:border-plum hover:text-plum"
              >
                {sub}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="container-edit py-10 md:py-14">
        <ShopProductBrowser
          products={items}
          emptyStateProps={{
            message: "Coming soon to Dame Allure.",
            ctaLabel: "Explore Other Categories",
            ctaHref: "/shop",
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
