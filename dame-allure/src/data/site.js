export const siteConfig = {
  name: "Dame Allure",
  tagline: "Curated for Her.",
  // TODO: replace with the real business WhatsApp number, in international format, no symbols
  whatsappNumber: "233000000000",
  email: "hello@dameallure.com",
  instagram: "https://instagram.com/dameallure",
  // TODO: replace with your real Paystack PUBLIC key (starts with pk_live_ once you're live —
  // pk_test_ keys are safe to leave in client-side code, but never put a secret key (sk_...) here).
  //
  // The matching SECRET key (sk_live_... / sk_test_...) does NOT go in this
  // file, or anywhere else in the app's source — it must only ever be set
  // as the PAYSTACK_SECRET_KEY environment variable in Netlify's dashboard
  // (Site settings → Environment variables), where netlify/functions/verify-payment.js
  // reads it server-side to confirm real payments. See README.md "Going live".
  paystackPublicKey: "pk_test_replace_with_your_real_key",
};

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Shop By Occasion", href: "/shop-by-occasion" },
  { label: "Collections", href: "/collections" },
  { label: "Travel", href: "/travel" },
  { label: "Gifting", href: "/gifting" },
  { label: "Create Your Curation", href: "/create-your-curation" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  { label: "Shop", href: "/shop" },
  { label: "Shop By Occasion", href: "/shop-by-occasion" },
  { label: "Collections", href: "/collections" },
  { label: "Travel", href: "/travel" },
  { label: "Gifting", href: "/gifting" },
  { label: "Create Your Curation", href: "/create-your-curation" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerCare = [
  { label: "Delivery", href: "/delivery" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const whatsappGreeting = `Hello, welcome to Dame Allure. 🤍

How can we help you find what you're looking for?

Create My Curation
Shop
Travel
Gifting
Speak to a Curator`;

export function whatsappLink(message = whatsappGreeting) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
