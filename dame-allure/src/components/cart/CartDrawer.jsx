"use client";

import { X, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import PaystackCheckoutButton from "@/components/cart/PaystackCheckoutButton";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity, subtotal } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close bag"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-plum-deep/40"
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-plum/15 px-6 py-5">
          <h2 className="font-display text-xl text-plum">Your Bag</h2>
          <button aria-label="Close bag" onClick={() => setOpen(false)} className="text-plum/70 hover:text-plum">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-[14px] text-charcoal/80">
              Your bag is empty. Browse the{" "}
              <Link href="/shop" onClick={() => setOpen(false)} className="underline decoration-gold underline-offset-4">
                collections
              </Link>{" "}
              or let a Curator{" "}
              <Link href="/create-your-curation" onClick={() => setOpen(false)} className="underline decoration-gold underline-offset-4">
                build an edit for you
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-plum/10 pb-6">
                  <div className="flex-1">
                    <p className="font-display text-[15px] text-plum">{item.name}</p>
                    <p className="mt-1 text-[12px] text-charcoal/70">
                      {[item.size, item.color].filter(Boolean).join(" · ") || "—"}
                    </p>
                    <p className="mt-2 text-[13px] text-charcoal">
                      GH₵{item.price.toLocaleString()}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="border border-plum/25 p-1 text-plum/80 hover:border-plum"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-6 text-center text-[13px]">{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="border border-plum/25 p-1 text-plum/80 hover:border-plum"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="ml-auto text-[11px] uppercase tracking-[0.08em] text-plum/50 hover:text-plum"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-plum/15 px-6 py-6">
            <div className="mb-5 flex items-center justify-between text-[15px]">
              <span className="text-charcoal">Subtotal</span>
              <span className="text-plum">GH₵{subtotal.toLocaleString()}</span>
            </div>
            <PaystackCheckoutButton />
            <p className="mt-3 text-center text-[11px] text-charcoal/60">
              Delivery and any custom pieces are confirmed by your Curator
              before dispatch.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
