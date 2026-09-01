"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ProductOptions({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div>
      <div className="mb-6">
        <p className="mb-2 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={`border px-4 py-2 text-[13px] transition-colors ${
                size === option
                  ? "border-plum bg-plum text-ivory"
                  : "border-plum/25 text-plum/80 hover:border-plum"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-2 text-[12px] uppercase tracking-[0.08em] text-charcoal/80">
          Colour
        </p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setColor(option)}
              aria-pressed={color === option}
              className={`border px-4 py-2 text-[13px] transition-colors ${
                color === option
                  ? "border-plum bg-plum text-ivory"
                  : "border-plum/25 text-plum/80 hover:border-plum"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary" type="button">
          Add to Bag
        </Button>
        <Button variant="gold" type="button">
          Ask a Dame Allure Curator
        </Button>
      </div>
    </div>
  );
}
