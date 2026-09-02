export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for shopping with Dame Allure.",
};

export default function TermsPage() {
  return (
    <section className="container-edit max-w-2xl py-14 md:py-20">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Legal</p>
      <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">Terms of Service</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-charcoal/80">
        <p>
          By placing an order with Dame Allure, whether through the
          website, WhatsApp, or a Create Your Curation request, you agree
          to these terms. Prices are listed in Ghana Cedis (GH₵) and are
          subject to change without notice.
        </p>
        <p>
          Made-to-order and curated pieces are prepared specifically for
          each customer and are final sale, as noted on Returns &amp;
          Exchanges.
        </p>
        <p className="text-[13px] text-charcoal/60">
          Placeholder policy copy — this is not a substitute for real
          terms of service. Replace with terms reviewed by a lawyer
          before launch.
        </p>
      </div>
    </section>
  );
}
