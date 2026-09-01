import Link from "next/link";
import CTASection from "@/components/editorial/CTASection";

export const metadata = {
  title: "About",
  description:
    "Dame Allure was created around a simple belief: women deserve to feel beautifully prepared for the lives they lead.",
};

const curates = [
  "Fashion",
  "Accessories",
  "Travel",
  "Beauty & lifestyle",
  "Gifting",
  "Thoughtful experiences",
];

export default function AboutPage() {
  return (
    <>
      <section className="container-edit pt-14 md:pt-20">
        <div className="max-w-2xl">
          <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">About</p>
          <h1 className="mt-4 font-display text-3xl leading-snug text-plum md:text-4xl">
            Dame Allure was created around a simple belief: women deserve to
            feel beautifully prepared for the lives they lead.
          </h1>
        </div>
      </section>

      <section className="container-edit py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-2xl text-plum">What we curate</h2>
            <p className="mt-3 text-[15px] text-charcoal/80">
              One brand, one experience — sourced from wherever it needs to
              be, delivered as Dame Allure.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-plum/15 pt-6 sm:grid-cols-3">
              {curates.map((item) => (
                <li key={item} className="text-[15px] text-charcoal">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-plum py-20 text-ivory md:py-24">
        <div className="container-edit max-w-2xl">
          <p className="font-display text-3xl italic leading-snug md:text-4xl">
            Every edit is personal.
            <br />
            Every detail is intentional.
          </p>
        </div>
      </section>

      <section className="container-edit py-14 md:py-20">
        <div className="max-w-xl">
          <p className="text-[15px] leading-relaxed text-charcoal/75">
            Dame Allure may work with different suppliers and creators
            behind the scenes, but that&apos;s not something the customer
            should ever have to think about. She experiences one thing: Dame
            Allure — thoughtfully put together, for her.
          </p>
          <p className="mt-6 text-[15px]">
            <Link
              href="/curation-experience"
              className="text-plum underline decoration-gold underline-offset-4"
            >
              See how the curation works →
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
