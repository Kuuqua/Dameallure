import Image from "next/image";
import { placeholderImage } from "@/lib/placeholder";

const details = [
  "Premium rigid boxes",
  "Champagne gold seals",
  "Personalised cards",
  "Garment bags & travel pouches",
  "DA monogram, subtly repeated",
];

export default function PackagingShowcase() {
  return (
    <section className="bg-plum-deep py-16 text-ivory md:py-24">
      <div className="container-edit grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={placeholderImage({
                width: 900,
                height: 1125,
                label: "Packaging",
                seed: "packaging",
              })}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-6">
          <p className="text-[12px] uppercase tracking-[0.15em] text-gold-soft">
            Unboxing Dame Allure
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            Packaging is part of the experience.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/75">
            Thoughtful. Elegant. Memorable. Every edit arrives prepared with
            the same care that went into curating it.
          </p>
          <ul className="mt-8 space-y-3">
            {details.map((detail) => (
              <li key={detail} className="flex items-center gap-3 text-[14px] text-ivory/85">
                <span className="h-px w-6 bg-gold" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
