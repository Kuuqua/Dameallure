import { journalArticles } from "@/data/journal";
import JournalCard from "@/components/content/JournalCard";

export const metadata = {
  title: "Journal",
  description:
    "Style notes, packing guides and stories from behind the Dame Allure curation.",
};

export default function JournalPage() {
  return (
    <section className="container-edit py-14 md:py-20">
      <div className="max-w-lg">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">Journal</p>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          Notes on living well.
        </h1>
        <p className="mt-4 text-[15px] text-charcoal/80">
          Style guides, packing notes and stories from behind the curation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {journalArticles.map((article) => (
          <JournalCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
