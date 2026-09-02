import { occasions } from "@/data/occasions";
import OccasionCard from "@/components/home/OccasionCard";

export default function PreparingFor() {
  return (
    <section className="container-edit py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl text-plum md:text-4xl">
          What are you preparing for?
        </h2>
        <p className="mt-3 text-[15px] text-charcoal/80">
          Whatever the occasion, we&apos;ll help you put it all together.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-10 border-b border-plum/15 sm:grid-cols-2 lg:grid-cols-3">
        {occasions.map((occasion) => (
          <OccasionCard
            key={occasion.key}
            label={occasion.label}
            copy={occasion.copy}
            keywords={occasion.imageKeywords}
            href={occasion.href}
          />
        ))}
      </div>
    </section>
  );
}
