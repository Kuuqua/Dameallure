import Link from "next/link";
import Button from "@/components/ui/Button";
import CategoryTile from "@/components/shop/CategoryTile";
import PlaceholderPhoto from "@/components/ui/PlaceholderPhoto";

const travelCategories = [
  { slug: "clothing", label: "Vacation Fashion", copy: "Everything she needs to travel beautifully.", href: "/shop/clothing" },
  { slug: "bags", label: "Travel Bags", copy: "Structured pieces that hold their shape from gate to hotel.", href: "/shop/bags" },
  { slug: "travel", label: "Travel Accessories", copy: "The finishing details for the journey.", href: "/shop/travel" },
  { slug: "beauty-self-care", label: "Beauty & Self-Care", copy: "Thoughtful essentials for looking after her, wherever she is.", href: "/shop/beauty-self-care" },
];

export const metadata = {
  title: "Travel",
  description:
    "Travel, curated. From what she wears to the little things she didn't know she needed.",
};

export default function TravelPage() {
  return (
    <>
      <section className="container-edit pt-14 md:pt-20">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Travel</p>
            <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
              Travel, curated.
            </h1>
            <p className="mt-4 max-w-md text-[15px] text-charcoal/80">
              From what she wears to the little things she didn&apos;t know
              she needed.
            </p>
            <div className="mt-8">
              <Button href="/create-your-curation?occasion=Travel" variant="primary">
                Build My Travel Curation
              </Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderPhoto
                seed="travel-hero"
                width={800}
                height={600}
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-edit py-14 md:py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {travelCategories.map((category) => (
            <CategoryTile key={category.slug} category={category} href={category.href} />
          ))}
        </div>
      </section>

      <section className="bg-navy py-16 text-ivory md:py-20">
        <div className="container-edit max-w-2xl">
          <p className="font-display text-2xl italic md:text-3xl">
            Everything she needs, nothing she has to think about.
          </p>
          <p className="mt-5 text-[14px] leading-relaxed text-ivory/70">
            Tell us the destination, the length of the trip and her budget —
            your Curator builds a travel curation around it, from what she
            wears to the small things that make a trip feel effortless.
          </p>
          <div className="mt-7">
            <Link
              href="/create-your-curation?occasion=Travel"
              className="text-[13px] uppercase tracking-[0.08em] text-gold-soft underline decoration-gold underline-offset-4 hover:text-gold-deep"
            >
              Build My Travel Curation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
