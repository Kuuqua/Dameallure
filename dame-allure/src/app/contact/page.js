import { MessageCircle, Mail } from "lucide-react";
import { siteConfig, whatsappLink } from "@/data/site";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Let's create something beautiful for her. Reach Dame Allure by WhatsApp, email or a private consultation.",
};

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

export default function ContactPage() {
  return (
    <section className="container-edit py-14 md:py-20">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Contact</p>
          <h1 className="mt-4 font-display text-3xl leading-snug text-plum md:text-4xl">
            Let&apos;s create something beautiful for her.
          </h1>

          <ul className="mt-10 space-y-5">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[15px] text-plum hover:text-gold-deep"
              >
                <MessageCircle size={18} strokeWidth={1.5} /> WhatsApp Dame Allure
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-[15px] text-plum hover:text-gold-deep"
              >
                <Mail size={18} strokeWidth={1.5} /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[15px] text-plum hover:text-gold-deep"
              >
                <InstagramGlyph width={18} height={18} /> @dameallure
              </a>
            </li>
          </ul>

          <div className="mt-10 border-t border-plum/15 pt-8">
            <h2 className="font-display text-xl text-plum">
              Prefer to talk it through?
            </h2>
            <p className="mt-2 max-w-xs text-[14px] text-charcoal/80">
              Book a private consultation with a Dame Allure Curator.
            </p>
            <div className="mt-5">
              <Button
                as="a"
                href={whatsappLink(
                  "Hi Dame Allure, I'd like to book a private consultation."
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
              >
                Book A Private Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
