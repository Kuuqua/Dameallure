import Link from "next/link";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

export default function CollaborationCard({ title, copy, href }) {
  return (
    <Link href={href} className="group block">
      <ProductImagePlaceholder seed={title} label="Lookbook image" />
      <h3 className="mt-5 font-display text-xl text-plum">{title}</h3>
      <p className="mt-1 text-[14px] text-charcoal/80">{copy}</p>
      <span className="mt-3 inline-block text-[12px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
        Discover the edit
      </span>
    </Link>
  );
}
