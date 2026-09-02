"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { departments } from "@/data/shop-taxonomy";

export default function ShopMobileAccordion({ onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="border-b border-plum/5">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-4 text-left text-[14px] tracking-[0.04em] uppercase text-plum"
      >
        Shop
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded ? (
        <ul className="pb-3 pl-3">
          <li>
            <Link href="/shop" onClick={onNavigate} className="block py-2 text-[13px] text-plum/70">
              Shop All
            </Link>
          </li>
          <li>
            <Link href="/shop/new-arrivals" onClick={onNavigate} className="block py-2 text-[13px] text-gold-deep">
              New Arrivals
            </Link>
          </li>
          {departments.map((d) => (
            <li key={d.slug}>
              <Link href={`/shop/${d.slug}`} onClick={onNavigate} className="block py-2 text-[13px] text-plum/70">
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
