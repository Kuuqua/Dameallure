"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { getProduct } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const items = slugs.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <section className="container-edit py-14 md:py-20">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Saved</p>
      <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">Your Wishlist</h1>

      {items.length === 0 ? (
        <p className="mt-6 max-w-md text-[15px] text-charcoal/80">
          Nothing saved yet. Tap the heart on any product to keep it here.
          Browse the{" "}
          <Link href="/shop" className="underline decoration-gold underline-offset-4">
            shop
          </Link>{" "}
          to get started.
        </p>
      ) : (
        <div className="mt-10">
          <ProductGrid products={items} />
        </div>
      )}
    </section>
  );
}
