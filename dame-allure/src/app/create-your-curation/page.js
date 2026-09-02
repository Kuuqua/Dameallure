import CreateYourCurationForm from "@/components/curation/CreateYourCurationForm";

export const metadata = {
  title: "Create Your Curation",
  description:
    "Tell us what you need. We'll curate the rest. Your Dame Allure Curator reviews every request personally.",
};

export default async function CreateYourCurationPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialOccasion =
    typeof resolvedSearchParams?.occasion === "string" ? resolvedSearchParams.occasion : "";

  return (
    <section className="container-edit py-14 md:py-20">
      <div className="mb-12 max-w-lg">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gold-deep">
          Create Your Curation
        </p>
        <h1 className="mt-4 font-display text-4xl text-plum md:text-5xl">
          Tell us what you need. We&apos;ll curate the rest.
        </h1>
        <p className="mt-4 text-[15px] text-charcoal/80">
          Whether you&apos;re preparing for a trip, refreshing your
          wardrobe, finding the perfect gift or dressing for an important
          occasion — tell us what you need and we&apos;ll thoughtfully put
          it together for you.
        </p>
      </div>

      <CreateYourCurationForm initialOccasion={initialOccasion} />
    </section>
  );
}
