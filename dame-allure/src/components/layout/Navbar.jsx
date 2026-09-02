"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, MessageCircle, ChevronDown, Heart } from "lucide-react";
import { primaryNav, whatsappLink } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import SearchModal from "@/components/search/SearchModal";
import ShopMegaMenu from "@/components/layout/ShopMegaMenu";
import ShopMobileAccordion from "@/components/layout/ShopMobileAccordion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-plum/10 bg-ivory/95 backdrop-blur">
      <div className="container-edit flex h-20 items-center justify-between md:h-24">
        <Link href="/" className="flex items-center" aria-label="Dame Allure home">
          <Image
            src="/brand/logo.png"
            alt="Dame Allure — Curated for Her."
            width={220}
            height={64}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav aria-label="Primary" className="hidden xl:flex xl:items-center xl:gap-5">
          {primaryNav.map((item) =>
            item.label === "Shop" ? (
              <button
                key={item.href}
                type="button"
                onClick={() => setShopMenuOpen((v) => !v)}
                aria-expanded={shopMenuOpen}
                className="flex items-center gap-1 text-[12px] tracking-[0.04em] uppercase text-plum/85 transition-colors hover:text-plum whitespace-nowrap"
              >
                {item.label}
                <ChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className={`transition-transform ${shopMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShopMenuOpen(false)}
                className="text-[12px] tracking-[0.04em] uppercase text-plum/85 transition-colors hover:text-plum whitespace-nowrap"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Dame Allure on WhatsApp"
            className="hidden text-plum/80 transition-colors hover:text-plum sm:block"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="text-plum/80 transition-colors hover:text-plum"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
            className="relative hidden text-plum/80 transition-colors hover:text-plum sm:block"
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-plum px-1 text-[9px] font-medium text-ivory">
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            aria-label={`Shopping bag${count ? `, ${count} items` : ""}`}
            onClick={() => setCartOpen(true)}
            className="relative text-plum/80 transition-colors hover:text-plum"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-plum px-1 text-[9px] font-medium text-ivory">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-plum xl:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {shopMenuOpen ? <ShopMegaMenu onNavigate={() => setShopMenuOpen(false)} /> : null}

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-plum/10 bg-ivory xl:hidden"
        >
          <ul className="container-edit flex flex-col py-2">
            {primaryNav.map((item) =>
              item.label === "Shop" ? (
                <ShopMobileAccordion key={item.href} onNavigate={() => setOpen(false)} />
              ) : (
                <li key={item.href} className="border-b border-plum/5 last:border-none">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[14px] tracking-[0.04em] uppercase text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      ) : null}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
