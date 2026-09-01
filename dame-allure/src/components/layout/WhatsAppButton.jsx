import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dame Allure on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-plum p-3.5 text-ivory shadow-[0_6px_20px_rgba(75,30,63,0.35)] transition-transform duration-200 hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={22} strokeWidth={1.5} />
    </a>
  );
}
