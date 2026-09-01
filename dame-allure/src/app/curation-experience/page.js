import PackagingShowcase from "@/components/brand/PackagingShowcase";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "The Curation Experience",
  description:
    "More than shopping. How a Dame Allure edit gets curated, approved, prepared and delivered.",
};

const steps = [
  { number: "01", title: "Tell Us", copy: "Tell us what you need." },
  {
    number: "02",
    title: "We Curate",
    copy: "We thoughtfully select pieces around your budget and purpose.",
  },
  { number: "03", title: "You Approve", copy: "You review your proposed edit." },
  {
    number: "04",
    title: "We Prepare",
    copy: "We source, quality-check and beautifully package everything.",
  },
  {
    number: "05",
    title: "You Receive",
    copy: "Your Dame Allure experience arrives at your door.",
  },
];

export default function CurationExperiencePage() {
  return (
    <>
      <section className="container-edit pt-14 md:pt-20">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          The Curation Experience
        </p>
        <h1 className="mt-4 max-w-xl font-display text-4xl text-plum md:text-5xl">
          More than shopping.
        </h1>
      </section>

      <section className="container-edit py-14 md:py-20">
        <ol className="divide-y divide-plum/15 border-y border-plum/15">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span className="font-display text-3xl text-gold-deep sm:col-span-2">
                {step.number}
              </span>
              <h2 className="font-display text-2xl text-plum sm:col-span-3">
                {step.title}
              </h2>
              <p className="text-[15px] text-charcoal/80 sm:col-span-7">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-md font-display text-xl italic text-plum/80">
          Because being beautifully prepared should feel effortless.
        </p>
      </section>

      <PackagingShowcase />

      <CTASection />
    </>
  );
}
