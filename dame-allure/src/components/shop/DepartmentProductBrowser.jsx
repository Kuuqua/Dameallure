"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/shop/ProductGrid";

export default function DepartmentProductBrowser({ products, subcategories }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.subcategory === active);
  }, [products, active]);

  const chips = ["All", ...subcategories];

  return (
    <div>
      {subcategories.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActive(chip)}
              aria-pressed={active === chip}
              className={`border px-4 py-2 text-[12px] uppercase tracking-[0.05em] transition-colors ${
                active === chip
                  ? "border-plum bg-plum text-ivory"
                  : "border-plum/25 text-plum/80 hover:border-plum"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      ) : null}

      <ProductGrid products={filtered} />
    </div>
  );
}
