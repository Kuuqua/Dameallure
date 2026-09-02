import Link from "next/link";
import { lifestyleCategories } from "@/data/lifestyle-categories";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

export default function MoreThanAWardrobe() {
  return (
    <section className="container-edit py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl leading-snug text-plum md:text-4xl">
          More than a wardrobe.
          <br />A world curated around her.
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {lifestyleCategories.map((category) => (
          <Link key={category.label} href={category.href} className="group block">
            <ProductImagePlaceholder
              seed={category.label}
              keywords={category.imageKeywords}
              className="aspect-[3/4]"
            />
            <h3 className="mt-3 text-center font-display text-base text-plum md:text-lg">
              {category.label}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
