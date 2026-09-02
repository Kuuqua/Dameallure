import Link from "next/link";

export default function OccasionCard({ label, copy, href, ctaLabel = "Shop now" }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border-t border-plum/15 py-7 transition-colors hover:border-gold"
    >
      <h3 className="font-display text-2xl text-plum">{label}</h3>
      <p className="mt-3 max-w-[26ch] text-[14px] leading-relaxed text-charcoal/80">
        {copy}
      </p>
      <span className="mt-5 text-[12px] uppercase tracking-[0.08em] text-plum/70 transition-colors group-hover:text-gold-deep">
        {ctaLabel}
      </span>
    </Link>
  );
}
