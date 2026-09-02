import { notFound } from "next/navigation";
import Link from "next/link";
import { departments, getDepartment } from "@/data/shop-taxonomy";
import { getProductsByDepartment } from "@/data/products";
import DepartmentProductBrowser from "@/components/shop/DepartmentProductBrowser";
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
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <Link
          href="/shop"
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 hover:text-plum"
        >
          ← Shop
        </Link>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          {department.label}
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-charcoal/80">{department.copy}</p>
      </section>

      <section className="container-edit py-10 md:py-14">
        <DepartmentProductBrowser
          products={items}
          subcategories={department.subcategories}
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
