import GiftCurationForm from "@/components/curation/GiftCurationForm";

export const metadata = {
  title: "Gifting",
  description:
    "Because the best gifts feel like they were chosen especially for her. Tell us who, the occasion and your budget — let Dame Allure curate something she'll love.",
};

export default function GiftingPage() {
  return (
    <section className="container-edit py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Gifting, Curated.
        </p>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          Because the best gifts feel like they were chosen especially for
          her.
        </h1>
        <p className="mt-4 text-[15px] text-charcoal/80">
          Tell us who, the occasion and your budget — let Dame Allure
          curate something she&apos;ll love.
        </p>
      </div>

      <GiftCurationForm />
    </section>
  );
}
