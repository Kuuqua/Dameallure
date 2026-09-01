// Temporary placeholder imagery via placehold.co, styled in brand colours
// so the site doesn't feel unfinished while real photography is pending.
// Swap any of these usages for real <Image> sources once photography is in.

const PALETTES = [
  { bg: "F1EBE3", fg: "4B1E3F" }, // ivory / plum
  { bg: "E5DACB", fg: "4B1E3F" }, // warm sand / plum
  { bg: "4B1E3F", fg: "F7F3EF" }, // plum / ivory
  { bg: "34152C", fg: "DCC38B" }, // deep plum / gold
];

function pickPalette(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % PALETTES.length;
  }
  return PALETTES[Math.abs(hash)];
}

export function placeholderImage({
  width = 800,
  height = 1000,
  label = "Dame Allure",
  seed = label,
}) {
  const { bg, fg } = pickPalette(seed);
  const text = encodeURIComponent(label);
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${text}&font=playfair-display`;
}
