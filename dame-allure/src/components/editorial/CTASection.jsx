import Button from "@/components/ui/Button";

export default function CTASection({
  eyebrow = "More than shopping",
  heading = "Ready for something curated?",
  copy = "Tell us what you need, your budget and the occasion — your Curator takes it from there.",
  ctaLabel = "Create Your Edit",
  ctaHref = "/create-your-edit",
}) {
  return (
    <section className="container-edit py-16 md:py-24">
      <div className="rule-gold mb-16" />
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-3xl text-plum md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-[15px] text-charcoal/80">{copy}</p>
        <div className="mt-8">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
