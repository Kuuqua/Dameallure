export const metadata = {
  title: "Delivery",
  description: "Delivery information for Dame Allure orders.",
};

export default function DeliveryPage() {
  return (
    <section className="container-edit max-w-2xl py-14 md:py-20">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Customer Care</p>
      <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">Delivery</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-charcoal/80">
        <p>
          Orders within Accra are typically delivered within 1–3 business
          days. Nationwide delivery and made-to-order or personalised
          pieces may take longer — your Curator will confirm a timeline
          when your order is placed.
        </p>
        <p>
          Delivery fees and exact timeframes depend on location and are
          confirmed at checkout or over WhatsApp before your order is
          dispatched.
        </p>
        <p className="text-[13px] text-charcoal/60">
          Placeholder policy copy — replace with your actual delivery
          terms before launch.
        </p>
      </div>
    </section>
  );
}
