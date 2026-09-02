import { notFound } from "next/navigation";
import Link from "next/link";
import { journalArticles, getArticle } from "@/data/journal";
import ProductImagePlaceholder from "@/components/shop/ProductImagePlaceholder";
import CTASection from "@/components/editorial/CTASection";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Journal`,
    description: article.excerpt,
  };
}

export default function JournalArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <article className="container-edit max-w-2xl pt-14 md:pt-20">
        <Link
          href="/journal"
          className="text-[12px] uppercase tracking-[0.08em] text-plum/70 hover:text-plum"
        >
          ← Journal
        </Link>
        <p className="mt-6 text-[11px] uppercase tracking-[0.1em] text-gold-deep">
          {article.category}
        </p>
        <h1 className="mt-3 font-display text-3xl text-plum md:text-4xl">
          {article.title}
        </h1>

        <div className="mt-8">
          <ProductImagePlaceholder seed={article.slug} keywords={article.imageKeywords} />
        </div>

        <div className="mt-10 space-y-5">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-[16px] leading-relaxed text-charcoal/80">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <CTASection />
    </>
  );
}
