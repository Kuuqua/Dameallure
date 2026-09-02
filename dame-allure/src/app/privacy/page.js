export const metadata = {
  title: "Privacy Policy",
  description: "How Dame Allure collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section className="container-edit max-w-2xl py-14 md:py-20">
      <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Legal</p>
      <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-charcoal/80">
        <p>
          Dame Allure collects the information you provide directly — such
          as through Create Your Curation, Gift Curation, or Contact — to
          respond to your request and prepare your order. We don&apos;t
          sell your information to third parties.
        </p>
        <p>
          Information shared via WhatsApp is subject to WhatsApp&apos;s
          own privacy practices.
        </p>
        <p className="text-[13px] text-charcoal/60">
          Placeholder policy copy — this is not a substitute for a real
          privacy policy. Replace with one reviewed by a lawyer, ideally
          one familiar with Ghanaian data protection requirements, before
          launch.
        </p>
      </div>
    </section>
  );
}
