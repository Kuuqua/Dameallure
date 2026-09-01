"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="border-t border-plum/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="border-b border-plum/15">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-[13px] uppercase tracking-[0.06em] text-plum">
                {item.title}
              </span>
              {isOpen ? (
                <Minus size={16} strokeWidth={1.5} className="text-plum/60" />
              ) : (
                <Plus size={16} strokeWidth={1.5} className="text-plum/60" />
              )}
            </button>
            {isOpen ? (
              <p className="pb-4 text-[14px] leading-relaxed text-charcoal/80">
                {item.content}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
