export const metadata = {
  title: "Returns",
  description: "Returns and exchanges information for Dame Allure orders.",
};

export default function ReturnsPage() {
  return (
    <section className="container-edit max-w-2xl py-14 md:py-20">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Customer Care</p>
      <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">Returns &amp; Exchanges</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-charcoal/80">
        <p>
          Ready-to-wear pieces can be exchanged within 7 days of delivery
          if unworn, unwashed and in their original packaging.
        </p>
        <p>
          Made-to-order and personalised pieces — including anything from
          a Create Your Curation or Gift Curation request — are final
          sale, as they are prepared specifically for you.
        </p>
        <p>
          To start an exchange, message a Curator on WhatsApp with your
          order details.
        </p>
        <p className="text-[13px] text-charcoal/60">
          Placeholder policy copy — replace with your actual returns
          terms before launch.
        </p>
      </div>
    </section>
  );
}
