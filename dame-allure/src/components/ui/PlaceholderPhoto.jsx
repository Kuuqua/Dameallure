import Image from "next/image";
import { placeholderImage } from "@/lib/placeholder";

export default function PlaceholderPhoto({
  seed = "",
  width = 800,
  height = 1000,
  sizes,
  priority = false,
}) {
  return (
    <>
      <Image
        src={placeholderImage({ width, height, seed })}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {/* Brand tint so stock photography reads as part of the Dame Allure
          palette rather than a random, off-brand photo. */}
      <div className="pointer-events-none absolute inset-0 bg-plum mix-blend-multiply opacity-[0.16]" />
      <span className="pointer-events-none absolute bottom-2 right-2 bg-ivory/85 px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] text-plum/70">
        Sample image
      </span>
    </>
  );
}
