import { notFound } from "next/navigation";
import Link from "next/link";
import {
  departments,
  getDepartment,
  getSubcategorySlug,
  getDepartmentFilters,
} from "@/data/shop-taxonomy";
import { getProductsByDepartment, getNewArrivals } from "@/data/products";
import { occasions } from "@/data/occasions";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ShopProductBrowser from "@/components/shop/ShopProductBrowser";
import ProductGrid from "@/components/shop/ProductGrid";
import CTASection from "@/components/editorial/CTASection";

// "new-arrivals" is handled inside this same dynamic route rather than as
// a separate static sibling page — a static route and a dynamic route at
// the same directory level (/shop/new-arrivals/page.js next to
// /shop/[department]/page.js) is a known Next.js App Router conflict
// that breaks routing for the *whole* dynamic segment, not just the
// colliding name. Folding it in here avoids that entirely.
export function generateStaticParams() {
  return [...departments.map((d) => ({ department: d.slug })), { department: "new-arrivals" }];
}

export async function generateMetadata({ params }) {
  const { department: departmentSlug } = await params;
  if (departmentSlug === "new-arrivals") {
    return {
      title: "New Arrivals",
      description: "The newest pieces at Dame Allure.",
    };
  }
  const department = getDepartment(departmentSlug);
  if (!department) return {};
  return {
    title: department.label,
    description: department.copy,
  };
}

export default async function ShopDepartmentPage({ params }) {
  const { department: departmentSlug } = await params;
  if (departmentSlug === "new-arrivals") {
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
            emptyStateProps={{ ctaLabel: "Explore The Shop", ctaHref: "/shop" }}
          />
        </section>

        <CTASection />
      </>
    );
  }

  const department = getDepartment(departmentSlug);
  if (!department) notFound();

  const items = getProductsByDepartment(department.slug);
  const newArrivals = items.filter((p) => p.isNewArrival).slice(0, 4);

  const relevantOccasionLabels = new Set(items.flatMap((p) => p.occasions || []));
  const relevantOccasions = occasions.filter((o) => relevantOccasionLabels.has(o.label));

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

      {newArrivals.length > 0 ? (
        <section className="container-edit py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl text-plum">New Arrivals</h2>
            <Link
              href="/shop/new-arrivals"
              className="text-[11px] uppercase tracking-[0.06em] text-plum/60 hover:text-plum"
            >
              View all
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </section>
      ) : null}

      <section className="container-edit py-10 md:py-14">
        <ShopProductBrowser
          products={items}
          enabledFilters={getDepartmentFilters(department.slug)}
          emptyStateProps={{
            ctaLabel: "Explore Other Categories",
            ctaHref: "/shop",
          }}
        />
      </section>

      {relevantOccasions.length > 0 ? (
        <section className="container-edit border-t border-plum/10 py-12">
          <h2 className="mb-5 font-display text-xl text-plum">Shop By Occasion</h2>
          <div className="flex flex-wrap gap-2">
            {relevantOccasions.map((o) => (
              <Link
                key={o.key}
                href={o.href}
                className="rounded-sm border border-plum/20 px-4 py-2 text-[12px] uppercase tracking-[0.05em] text-plum/80 hover:border-plum hover:text-plum"
              >
                {o.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow={department.slug === "gifts" ? "Something more personal?" : "Not seeing what she needs?"}
        heading={department.slug === "gifts" ? "Let us curate a gift she'll love." : "Let us curate it instead."}
        copy={
          department.slug === "gifts"
            ? "Tell us who she is, the occasion and your budget — your Curator builds the rest."
            : "Tell us the occasion, the budget and her style — we'll build the rest of the curation around it."
        }
        ctaLabel={department.slug === "gifts" ? "Create A Gift Curation" : "Create Your Curation"}
        ctaHref={department.slug === "gifts" ? "/gifting" : "/create-your-curation"}
      />
    </>
  );
}
