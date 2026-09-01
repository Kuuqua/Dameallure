import Link from "next/link";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

export default function CategoryTile({ category }) {
  return (
    <Link href={`/shop/${category.slug}`} className="group block">
      <ProductImagePlaceholder seed={category.slug} label="Collection image" />
      <h3 className="mt-4 font-display text-xl text-plum">{category.label}</h3>
      <p className="mt-1 text-[14px] text-charcoal/80">{category.copy}</p>
      <span className="mt-3 inline-block text-[12px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
        Shop the edit
      </span>
    </Link>
  );
}
