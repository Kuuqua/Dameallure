"use client";

import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import ProductBadge from "@/components/shop/ProductBadge";
import { useWishlist } from "@/lib/wishlist-context";
import { useQuickView } from "@/lib/quick-view-context";

export default function ProductCard({ product }) {
  const { toggle, isSaved } = useWishlist();
  const { open: openQuickView } = useQuickView();
  const saved = isSaved(product.slug);

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <ProductImagePlaceholder seed={product.slug} keywords={product.imageKeywords} />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge ? <ProductBadge badge={product.badge} /> : null}
            {product.availability !== "In stock" && !product.badge ? (
              <span className="rounded-sm bg-ivory/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-plum/70">
                {product.availability}
              </span>
            ) : null}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
            <button
              type="button"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              onClick={(e) => {
                e.preventDefault();
                toggle(product.slug);
              }}
              className="rounded-sm bg-ivory/90 p-2 text-plum/70 hover:text-plum"
            >
              <Heart size={15} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product);
              }}
              className="rounded-sm bg-ivory/90 p-2 text-plum/70 hover:text-plum"
            >
              <Eye size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-lg text-plum">{product.name}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-charcoal/80">
            {product.shortDescription}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[14px] text-charcoal">
              GH₵{product.price.toLocaleString()}
              {product.colors?.length === 1 && product.colors[0] !== "—" ? (
                <span className="ml-2 text-[11px] text-charcoal/50">{product.colors[0]}</span>
              ) : product.colors?.length > 1 ? (
                <span className="ml-2 text-[11px] text-charcoal/50">
                  {product.colors.length} colours
                </span>
              ) : null}
            </span>
            <span className="text-[11px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
              View
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
