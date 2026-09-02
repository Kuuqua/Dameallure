import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/cart/CartDrawer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://dameallure.com"),
  title: {
    default: "Dame Allure | Curated for Her.",
    template: "%s | Dame Allure",
  },
  description:
    "Dame Allure is a curated lifestyle brand for the modern African woman — fashion, accessories, travel and thoughtful gifting, curated around your budget and your life.",
  keywords: [
    "women's fashion Ghana",
    "women's fashion Accra",
    "Ankara fashion Ghana",
    "corporate wear Ghana",
    "curated gifts Ghana",
    "African fashion Accra",
  ],
  openGraph: {
    title: "Dame Allure | Curated for Her.",
    description:
      "Fashion, lifestyle and thoughtful experiences curated around the woman you are.",
    siteName: "Dame Allure",
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dame Allure | Curated for Her.",
    description:
      "Fashion, lifestyle and thoughtful experiences curated around the woman you are.",
  },
};

export const viewport = {
  themeColor: "#4B1E3F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-plum focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
