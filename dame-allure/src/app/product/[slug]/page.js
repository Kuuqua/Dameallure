import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { getDepartment } from "@/data/shop-taxonomy";
import { whatsappLink } from "@/data/site";
import { completeTheLook } from "@/data/complete-the-look";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductBadge from "@/components/shop/ProductBadge";
import ProductOptions from "@/components/shop/ProductOptions";
import CompleteTheLook from "@/components/shop/CompleteTheLook";
import Accordion from "@/components/ui/Accordion";
import ProductGrid from "@/components/shop/ProductGrid";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const department = getDepartment(product.department);
  const related = products
    .filter((p) => p.department === product.department && p.slug !== product.slug)
    .slice(0, 4);
  const companionSlugs = completeTheLook[product.slug] || [];

  const infoItems = [
    { title: "Material & Fabric", content: product.material },
    { title: "Care Information", content: product.care },
    {
      title: "Delivery Information",
      content:
        "Delivered within Accra in 1–3 business days; nationwide and made-to-order pieces may take longer. Delivery timelines are confirmed at checkout or via WhatsApp.",
    },
    {
      title: "Returns & Exchanges",
      content:
        "Ready-to-wear pieces can be exchanged within 7 days if unworn and in original packaging. Made-to-order and personalised pieces are final sale.",
    },
  ];

  const breadcrumbItems = [{ label: "Shop", href: "/shop" }];
  if (department) {
    breadcrumbItems.push({ label: department.label, href: `/shop/${department.slug}` });
  }
  if (product.subcategory) {
    breadcrumbItems.push({ label: product.subcategory });
  } else {
    breadcrumbItems.push({ label: product.name });
  }

  return (
    <>
      <section className="container-edit pt-10 md:pt-14">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <ProductGallery
              slug={product.slug}
              keywords={product.imageKeywords}
              image={product.image}
              alt={product.name}
              className="aspect-[4/5] md:aspect-[3/4]"
            />
          </div>

          <div className="max-w-md">
            {product.badge ? (
              <div className="mb-3">
                <ProductBadge badge={product.badge} />
              </div>
            ) : null}
            <h1 className="font-display text-3xl text-plum md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-[18px] text-charcoal">
              GH₵{product.price.toLocaleString()}
            </p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.06em] text-gold-deep">
              {product.availability}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-charcoal/75">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductOptions product={product} />
            </div>

            <div className="mt-10 border-t border-plum/15 pt-6">
              <p className="text-[13px] text-charcoal/80">
                Not sure this is right for her?{" "}
                <span className="font-medium text-plum">Need help choosing?</span>
              </p>
              <a
                href={whatsappLink(`Hi Dame Allure, I'd like help choosing "${product.name}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[12px] uppercase tracking-[0.08em] text-plum/70 underline decoration-gold underline-offset-4 hover:text-plum"
              >
                Ask a Curator on WhatsApp
              </a>
            </div>

            <div className="mt-10">
              <Accordion items={infoItems} />
            </div>
          </div>
        </div>

        {companionSlugs.length ? (
          <CompleteTheLook anchorProduct={product} companionSlugs={companionSlugs} />
        ) : null}
      </section>

      {related.length ? (
        <section className="container-edit py-16 md:py-24">
          <h2 className="mb-8 font-display text-2xl text-plum">
            More from {department?.label}
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </>
  );
}
