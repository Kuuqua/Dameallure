import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { footerNav, footerCare, siteConfig, whatsappLink } from "@/data/site";
import NewsletterForm from "@/components/layout/NewsletterForm";

function InstagramGlyph(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="container-edit grid grid-cols-1 gap-12 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-1">
          <Image
            src="/brand/icon.png"
            alt=""
            width={40}
            height={44}
            className="mb-4 h-9 w-auto"
          />
          <p className="font-display text-xl">Dame Allure</p>
          <p className="mt-1 text-[13px] tracking-[0.05em] text-gold-soft">
            Curated for Her.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-1">
          <ul className="space-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] tracking-[0.03em] text-ivory/80 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer care" className="md:col-span-1">
          <p className="mb-3 text-[12px] uppercase tracking-[0.1em] text-gold-soft">
            Customer Care
          </p>
          <ul className="space-y-3">
            {footerCare.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] tracking-[0.03em] text-ivory/80 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dame Allure on Instagram"
              className="text-ivory/80 transition-colors hover:text-ivory"
            >
              <InstagramGlyph width={18} height={18} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Dame Allure on WhatsApp"
              className="text-ivory/80 transition-colors hover:text-ivory"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
            </a>
          </div>
        </nav>

        <div className="md:col-span-1">
          <p className="mb-1 font-display text-lg">Join the Allure List.</p>
          <p className="mb-4 text-[13px] leading-relaxed text-ivory/75">
            Be the first to discover new curations, exclusive collaborations and
            thoughtful inspiration.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-edit flex flex-col gap-2 py-6 text-[11px] tracking-[0.03em] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dame Allure. All rights reserved.</p>
          <p>Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
