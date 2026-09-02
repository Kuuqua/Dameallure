// Temporary placeholder photography via LoremFlickr, so images are at
// least contextually relevant (a "Work" tile looks like an office, an
// "Accessories" tile looks like jewellery) while real photography is
// pending. The `lock` param pins each seed to one consistent photo
// instead of a different random image on every reload.
// Swap any of these usages for real <Image> sources once photography is in.

function hashSeed(seed) {
  let hash = 0;
  const str = seed || "dame-allure";
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) % 100000;
  }
  return Math.abs(hash) || 1;
}

export function placeholderImage({
  width = 800,
  height = 1000,
  seed = "",
  keywords = "fashion,woman,elegant",
}) {
  const kw = encodeURIComponent(Array.isArray(keywords) ? keywords.join(",") : keywords);
  const lock = hashSeed(seed);
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${lock}`;
}
