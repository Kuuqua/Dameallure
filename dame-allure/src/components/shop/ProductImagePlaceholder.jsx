import Image from "next/image";
import { placeholderImage } from "@/lib/placeholder";

export default function ProductImagePlaceholder({
  seed = "",
  label = "Product photography",
  className = "",
}) {
  const aspect = className.includes("aspect-") ? "" : "aspect-[4/5]";

  return (
    <div
      className={`relative w-full overflow-hidden border border-plum/10 ${aspect} ${className}`}
    >
      <Image
        src={placeholderImage({ width: 800, height: 1000, label, seed })}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
