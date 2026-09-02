const STYLES = {
  NEW: "bg-plum text-ivory",
  "DAME ALLURE EXCLUSIVE": "bg-gold-deep text-ivory",
  LIMITED: "bg-charcoal text-ivory",
  "LOW STOCK": "bg-ivory/90 text-plum border border-plum/20",
};

export default function ProductBadge({ badge }) {
  if (!badge) return null;
  return (
    <span
      className={`inline-block rounded-sm px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] ${
        STYLES[badge] || "bg-plum text-ivory"
      }`}
    >
      {badge}
    </span>
  );
}
