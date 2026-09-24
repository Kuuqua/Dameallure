"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Heart } from "lucide-react";
import { useQuickView } from "@/lib/quick-view-context";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import ProductBadge from "@/components/shop/ProductBadge";
import Button from "@/components/ui/Button";

export default function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addItem } = useCart();
  const { toggle, isSaved } = useWishlist();
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, { size, color, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <button aria-label="Close quick view" onClick={close} className="absolute inset-0 bg-plum-deep/40" />
      <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-ivory p-6 shadow-2xl md:p-8">
        <button
          aria-label="Close quick view"
          onClick={close}
          className="absolute right-4 top-4 text-plum/60 hover:text-plum"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ProductImagePlaceholder
            seed={product.slug}
            keywords={product.imageKeywords}
            image={product.image}
            alt={product.name}
            className="aspect-[4/5]"
          />

          <div>
            {product.badge ? (
              <div className="mb-3">
                <ProductBadge badge={product.badge} />
              </div>
            ) : null}
            <h2 className="font-display text-2xl text-plum">{product.name}</h2>
            <p className="mt-2 text-[16px] text-charcoal">GH₵{product.price.toLocaleString()}</p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.06em] text-gold-deep">
              {product.availability}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-charcoal/80">
              {product.shortDescription}
            </p>

            {product.sizes?.length ? (
              <div className="mt-5">
                <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-charcoal/60">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className="rounded-sm border px-3 py-1.5 text-[12px]"
                      style={
                        size === s
                          ? { borderColor: "var(--plum)", background: "var(--plum)", color: "var(--ivory)" }
                          : { borderColor: "rgba(75,30,63,0.25)" }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {product.colors?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-charcoal/60">Colour</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="rounded-sm border px-3 py-1.5 text-[12px]"
                      style={
                        color === c
                          ? { borderColor: "var(--plum)", background: "var(--plum)", color: "var(--ivory)" }
                          : { borderColor: "rgba(75,30,63,0.25)" }
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={handleAdd}>
                {added ? "Added ✓" : "Add to Bag"}
              </Button>
              <button
                aria-label={isSaved(product.slug) ? "Remove from wishlist" : "Save to wishlist"}
                onClick={() => toggle(product.slug)}
                className="rounded-sm border border-plum/25 p-2.5 text-plum/70 hover:border-plum hover:text-plum"
              >
                <Heart size={18} strokeWidth={1.5} fill={isSaved(product.slug) ? "currentColor" : "none"} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={close}
              className="mt-5 inline-block text-[12px] uppercase tracking-[0.08em] text-plum/70 underline decoration-gold underline-offset-4 hover:text-plum"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
