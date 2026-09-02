import PlaceholderPhoto from "@/components/ui/PlaceholderPhoto";

export default function ProductImagePlaceholder({
  seed = "",
  keywords,
  className = "",
}) {
  const aspect = className.includes("aspect-") ? "" : "aspect-[4/5]";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-plum/10 ${aspect} ${className}`}
    >
      <PlaceholderPhoto
        seed={seed}
        keywords={keywords}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
      />
    </div>
  );
}
