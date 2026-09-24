import Image from "next/image";
import { placeholderImage } from "@/lib/placeholder";

export default function PlaceholderPhoto({
  seed = "",
  keywords = "fashion,woman,elegant",
  width = 800,
  height = 1000,
  sizes,
  priority = false,
  showTag = true,
  image = null,
  alt = "",
}) {
  // Real product photography, when supplied, is rendered as-is: no brand
  // tint and no "Sample image" tag, since this is genuine Dame Allure
  // inventory rather than temporary stock photography.
  if (image) {
    return <Image src={image} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />;
  }

  return (
    <>
      <Image
        src={placeholderImage({ width, height, seed, keywords })}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {/* Brand tint so stock photography reads as part of the Dame Allure
          palette rather than a random, off-brand photo. */}
      <div className="pointer-events-none absolute inset-0 bg-plum mix-blend-multiply opacity-[0.16]" />
      {showTag ? (
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-ivory/85 px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] text-plum/70">
          Sample image
        </span>
      ) : null}
    </>
  );
}
