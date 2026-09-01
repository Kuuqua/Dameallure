import GiftEditForm from "@/components/curation/GiftEditForm";

export const metadata = {
  title: "Gifting",
  description:
    "She deserves something thoughtful. Tell us who she is, what you're celebrating and your budget — we'll create something beautiful.",
};

export default function GiftingPage() {
  return (
    <section className="container-edit py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Gifting
        </p>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          She deserves something thoughtful.
        </h1>
        <p className="mt-4 text-[15px] text-charcoal/80">
          Tell us who she is, what you&apos;re celebrating and your budget.
          We&apos;ll create something beautiful.
        </p>
      </div>

      <GiftEditForm />
    </section>
  );
}
