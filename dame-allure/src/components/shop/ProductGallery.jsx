"use client";

import { useState } from "react";
import PlaceholderPhoto from "@/components/ui/PlaceholderPhoto";

const GALLERY_SIZE = 3;

export default function ProductGallery({ slug, keywords, className = "aspect-[4/5] md:aspect-[3/4]" }) {
  // Same primary seed as every other touch point (card, quick view) so the
  // main image stays consistent; two extra seeds give gallery variety.
  const seeds = Array.from({ length: GALLERY_SIZE }, (_, i) => (i === 0 ? slug : `${slug}-angle-${i + 1}`));
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className={`relative w-full overflow-hidden rounded-sm border border-plum/10 ${className}`}>
        <PlaceholderPhoto
          seed={seeds[active]}
          keywords={keywords}
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="mt-3 flex gap-3">
        {seeds.map((seed, index) => (
          <button
            key={seed}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1} of ${seeds.length}`}
            aria-pressed={active === index}
            className={`relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-sm border transition-colors sm:w-20 ${
              active === index ? "border-plum" : "border-plum/15 hover:border-plum/40"
            }`}
          >
            <PlaceholderPhoto seed={seed} keywords={keywords} sizes="80px" showTag={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
