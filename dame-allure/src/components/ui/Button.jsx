import Link from "next/link";

const variants = {
  primary:
    "bg-plum text-ivory border border-plum hover:bg-plum-deep hover:border-plum-deep",
  secondary:
    "bg-transparent text-plum border border-plum hover:bg-plum hover:text-ivory",
  gold:
    "bg-transparent text-plum border border-gold-deep hover:bg-gold-deep hover:text-ivory",
  ghost:
    "bg-transparent text-plum border border-transparent hover:border-plum/30",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  as,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3 text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as || "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
