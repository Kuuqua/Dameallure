import Link from "next/link";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <ProductImagePlaceholder seed={product.slug} />
        {product.availability !== "In stock" ? (
          <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-plum/70">
            {product.availability}
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg text-plum">{product.name}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-charcoal/80">
          {product.shortDescription}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[14px] text-charcoal">
            GH₵{product.price.toLocaleString()}
          </span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
