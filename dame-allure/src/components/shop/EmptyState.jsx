import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EmptyState({
  message = "Coming soon to Dame Allure.",
  ctaLabel = "Explore Other Categories",
  ctaHref = "/shop",
}) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="font-display text-2xl text-plum">{message}</p>
      <p className="mt-3 max-w-sm text-[14px] text-charcoal/70">
        We&apos;re still curating this one. In the meantime, your Curator
        can find something suited to you.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-4">
        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
        <Link
          href="/create-your-curation"
          className="inline-flex items-center px-7 py-3 text-[13px] tracking-[0.08em] uppercase font-medium text-plum/70 underline decoration-gold underline-offset-4 hover:text-plum"
        >
          Create Your Curation
        </Link>
      </div>
    </div>
  );
}
