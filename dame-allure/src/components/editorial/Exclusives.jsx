import Link from "next/link";
import { collaborations } from "@/data/collaborations";
import CollaborationCard from "@/components/brand/CollaborationCard";

export default function Exclusives() {
  return (
    <section className="container-edit py-16 md:py-24">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl text-plum md:text-4xl">
          Dame Allure Exclusives
        </h2>
        <p className="mt-3 text-[15px] text-charcoal/80">
          Thoughtfully designed in collaboration with selected Ghanaian
          creatives.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {collaborations.map((item) => (
          <CollaborationCard
            key={item.key}
            title={item.title}
            copy={item.copy}
            href={item.href}
          />
        ))}
      </div>

      <p className="mt-8">
        <Link
          href="/collections"
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 underline decoration-gold underline-offset-4 hover:text-plum"
        >
          View all collections
        </Link>
      </p>
    </section>
  );
}
