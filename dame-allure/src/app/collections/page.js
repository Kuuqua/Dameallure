import { collaborations } from "@/data/collaborations";
import CollaborationCard from "@/components/brand/CollaborationCard";
import PlaceholderPhoto from "@/components/ui/PlaceholderPhoto";
import Button from "@/components/ui/Button";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "Collections",
  description:
    "The Dame Allure Signature Collection, and strategic collaborations with Ghanaian creatives — Odehei and Renee Royale.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="container-edit pb-6 pt-14 md:pt-20">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Collections
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-plum md:text-5xl">
          Design with a Dame Allure point of view.
        </h1>
        <p className="mt-4 max-w-lg text-[15px] text-charcoal/80">
          Collections are the pieces and collaborations that carry the
          strongest Dame Allure identity — the ones that would still read
          as Dame Allure even without the logo on them.
        </p>
      </section>

      {/* Signature Collection */}
      <section className="container-edit py-12 md:py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <PlaceholderPhoto
              seed="signature-collection"
              width={900}
              height={1050}
            />
          </div>
          <div className="relative md:col-span-6">
            <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
              Collection 01
            </p>
            <h2 className="mt-3 font-display text-3xl text-plum md:text-4xl">
              The Dame Allure Signature Collection
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/80">
              The collection that establishes the Dame Allure visual design
              language — sculpted femininity, defined waistlines and
              considered, restrained detail. Modern African elegance,
              without ever being stereotypical about it.
            </p>
            <div className="mt-7">
              <Button href="/shop" variant="primary">
                Shop The Signature Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusives / collaborations */}
      <section className="container-edit py-12 md:py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-plum md:text-4xl">
            Dame Allure Exclusives
          </h2>
          <p className="mt-3 text-[15px] text-charcoal/80">
            Thoughtfully designed in collaboration with selected Ghanaian
            creatives — Dame Allure remains the hero brand throughout.
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
      </section>

      <CTASection />
    </>
  );
}
