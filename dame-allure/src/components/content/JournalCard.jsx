import Link from "next/link";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";

export default function JournalCard({ article }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <ProductImagePlaceholder seed={article.slug} label="Editorial image" />
      <p className="mt-4 text-[11px] uppercase tracking-[0.1em] text-gold-deep">
        {article.category}
      </p>
      <h3 className="mt-2 font-display text-xl text-plum">{article.title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-charcoal/80">
        {article.excerpt}
      </p>
      <span className="mt-3 inline-block text-[12px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
        Read the story
      </span>
    </Link>
  );
}
