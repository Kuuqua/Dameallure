// Temporary placeholder photography via Lorem Picsum, so the site has real
// imagery (not flat colour blocks) while real photography is pending.
// Swap any of these usages for real <Image> sources once photography is in.

export function placeholderImage({ width = 800, height = 1000, seed = "" }) {
  const safeSeed = encodeURIComponent(seed || "dame-allure");
  return `https://picsum.photos/seed/${safeSeed}/${width}/${height}`;
}
