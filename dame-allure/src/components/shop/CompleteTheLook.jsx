"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getProduct } from "@/data/products";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";

export default function CompleteTheLook({ anchorProduct, companionSlugs }) {
  const { addItem } = useCart();
  const companions = companionSlugs.map((slug) => getProduct(slug)).filter(Boolean);
  const [selected, setSelected] = useState(
    () => new Set([anchorProduct.slug, ...companions.map((p) => p.slug)])
  );
  const [added, setAdded] = useState(false);

  if (companions.length === 0) return null;

  const allItems = [anchorProduct, ...companions];

  const toggle = (slug) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const selectedTotal = allItems
    .filter((p) => selected.has(p.slug))
    .reduce((sum, p) => sum + p.price, 0);

  const handleShopTheLook = () => {
    allItems
      .filter((p) => selected.has(p.slug))
      .forEach((p) => addItem(p, { size: p.sizes?.[0], color: p.colors?.[0], quantity: 1 }));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="mt-16 border-t border-plum/15 pt-12">
      <h2 className="font-display text-2xl text-plum">Complete The Look</h2>
      <p className="mt-2 text-[14px] text-charcoal/70">
        Selected individually or shopped together.
      </p>

      <div className="mt-8 flex flex-wrap items-start gap-4">
        {allItems.map((item, index) => (
          <div key={item.slug} className="flex items-center gap-4">
            <label className="block w-28 cursor-pointer text-center sm:w-32">
              <div className="relative">
                <ProductImagePlaceholder
                  seed={item.slug}
                  keywords={item.imageKeywords}
                  image={item.image}
                  alt={item.name}
                  className="aspect-[4/5]"
                />
                <input
                  type="checkbox"
                  checked={selected.has(item.slug)}
                  onChange={() => toggle(item.slug)}
                  className="absolute left-2 top-2 h-4 w-4 accent-[var(--plum)]"
                  aria-label={`Include ${item.name}`}
                />
              </div>
              <Link
                href={`/product/${item.slug}`}
                className="mt-2 block text-[12px] text-plum hover:text-gold-deep"
              >
                {item.name}
              </Link>
              <span className="block text-[12px] text-charcoal/60">
                GH₵{item.price.toLocaleString()}
              </span>
            </label>
            {index < allItems.length - 1 ? (
              <Plus size={16} strokeWidth={1.5} className="mt-[-2rem] text-plum/30" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button variant="primary" onClick={handleShopTheLook} disabled={selected.size === 0}>
          {added ? "Added ✓" : `Shop The Look — GH₵${selectedTotal.toLocaleString()}`}
        </Button>
      </div>
    </section>
  );
}
