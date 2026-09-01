"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { primaryNav, whatsappLink } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-9">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.06em] uppercase text-plum/85 transition-colors hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
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
            className="text-plum/80 transition-colors hover:text-plum"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            href="/bag"
            aria-label="Shopping bag"
            className="text-plum/80 transition-colors hover:text-plum"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-plum lg:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-plum/10 bg-ivory lg:hidden"
        >
          <ul className="container-edit flex flex-col py-2">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-b border-plum/5 last:border-none">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[14px] tracking-[0.04em] uppercase text-plum"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
