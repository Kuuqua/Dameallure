import CuratedEditForm from "@/components/curation/CuratedEditForm";

export const metadata = {
  title: "Create Your Edit",
  description:
    "Tell us what you need, your budget and the occasion. Your Dame Allure Curator does the rest.",
};

export default function CreateYourEditPage({ searchParams }) {
  const initialOccasion =
    typeof searchParams?.occasion === "string" ? searchParams.occasion : "";

  return (
    <section className="container-edit py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Create Your Edit
        </p>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          Tell us what you need. We&apos;ll curate the rest.
        </h1>
        <p className="mt-4 text-[15px] text-charcoal/80">
          A few questions is all it takes for your Curator to start building
          something suited to you — and your budget.
        </p>
      </div>

      <CuratedEditForm initialOccasion={initialOccasion} />
    </section>
  );
}
