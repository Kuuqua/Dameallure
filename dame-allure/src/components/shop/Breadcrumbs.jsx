import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  const fullItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] uppercase tracking-[0.05em]">
      {fullItems.map((item, index) => {
        const isLast = index === fullItems.length - 1;
        return (
          <span key={item.href || item.label} className="flex items-center gap-1.5">
            {index > 0 ? (
              <ChevronRight size={12} strokeWidth={1.5} className="text-plum/30" aria-hidden="true" />
            ) : null}
            {isLast || !item.href ? (
              <span className="text-plum/60" aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-plum/70 hover:text-plum">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
