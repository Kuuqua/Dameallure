export const siteConfig = {
  name: "Dame Allure",
  tagline: "Curated for Her.",
  // TODO: replace with the real business WhatsApp number, in international format, no symbols
  whatsappNumber: "233000000000",
  email: "hello@dameallure.com",
  instagram: "https://instagram.com/dameallure",
  // TODO: replace with your real Paystack PUBLIC key (starts with pk_live_ once you're live —
  // pk_test_ keys are safe to leave in client-side code, but never put a secret key (sk_...) here).
  paystackPublicKey: "pk_test_replace_with_your_real_key",
};

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Create Your Edit", href: "/create-your-edit" },
  { label: "Travel", href: "/travel" },
  { label: "Gifting", href: "/gifting" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  { label: "Shop", href: "/shop" },
  { label: "Create Your Edit", href: "/create-your-edit" },
  { label: "Travel", href: "/travel" },
  { label: "Gifting", href: "/gifting" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerCare = [
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const whatsappGreeting = `Welcome to Dame Allure. 🤍

Tell us what you're looking for and we'll help you create something beautifully suited to you.

Create My Edit
Shop Fashion
Travel
Gifting
Speak to a Curator`;

export function whatsappLink(message = whatsappGreeting) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
