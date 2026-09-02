"use client";

import Link from "next/link";
import { departments, getSubcategorySlug } from "@/data/shop-taxonomy";

export default function ShopMegaMenu({ onNavigate }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-plum/10 bg-ivory shadow-lg">
      <div className="container-edit grid grid-cols-2 gap-8 py-8 sm:grid-cols-3 lg:grid-cols-4">
        <div>
          <Link
            href="/shop/new-arrivals"
            onClick={onNavigate}
            className="text-[12px] uppercase tracking-[0.08em] text-gold-deep hover:text-plum"
          >
            New Arrivals
          </Link>
          <div className="mt-6">
            <Link
              href="/shop/gifts"
              onClick={onNavigate}
              className="text-[12px] uppercase tracking-[0.08em] text-plum/80 hover:text-plum"
            >
              Gifts
            </Link>
          </div>
          <div className="mt-6">
            <Link
              href="/shop"
              onClick={onNavigate}
              className="text-[12px] uppercase tracking-[0.08em] text-plum/60 underline decoration-gold underline-offset-4 hover:text-plum"
            >
              Shop All
            </Link>
          </div>
        </div>

        {departments
          .filter((d) => d.subcategories.length > 0)
          .map((department) => (
            <div key={department.slug}>
              <Link
                href={`/shop/${department.slug}`}
                onClick={onNavigate}
                className="text-[12px] uppercase tracking-[0.08em] text-plum hover:text-gold-deep"
              >
                {department.label}
              </Link>
              <ul className="mt-4 space-y-2.5">
                {department.subcategories.map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/shop/${department.slug}/${getSubcategorySlug(sub)}`}
                      onClick={onNavigate}
                      className="text-[13px] text-charcoal/75 hover:text-plum"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
