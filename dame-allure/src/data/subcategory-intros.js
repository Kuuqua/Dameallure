export const subcategoryIntros = {
  // Clothing
  Tops: "Thoughtfully selected layers for work, weekends, Fridays and everything in between.",
  Dresses:
    "From polished workdays to evenings worth remembering, discover dresses selected for the many moments that make up her life.",
  "Trousers & Pants": "Tailored lines built to hold their shape from the first meeting to the last.",
  Skirts: "Fluid, considered silhouettes that move easily between desk and dinner.",
  "Two-Piece Sets": "Matching sets that do the thinking for you — one decision, one polished look.",
  "Blazers & Jackets": "The one piece that makes everything underneath it look intentional.",
  Nightwear: "Small daily luxuries, for the hours nobody else sees.",
  "Vacation Wear": "Warm-weather pieces built for wherever she's headed next.",
  Swimwear: "Considered swimwear, cut to move from pool to poolside without a second thought.",
  "Ankara & African-Inspired": "Modern African style, thoughtfully reimagined with a Dame Allure point of view.",

  // Shoes
  Heels: "A heel for the moments worth remembering — comfortable enough to actually enjoy.",
  Flats: "Polished flats for the days that call for looking sharp without a heel.",
  Sandals: "Considered sandals built for a full day on your feet.",
  Sneakers: "Minimal, clean sneakers for the days off duty.",

  // Bags
  Handbags: "Structured, everyday bags built to be used, not just admired.",
  "Evening Bags": "Small, deliberate bags for the nights that call for one.",
  "Travel Bags": "Structured pieces that hold their shape from gate to hotel.",

  // Jewellery & Accessories
  Earrings: "From everyday gold to statement drops — earrings for however she's feeling.",
  Necklaces: "Delicate chains and statement pieces, worn alone or layered.",
  Bracelets: "Slim, considered pieces designed to be worn daily.",
  Scarves: "Silk finishing touches — worn as a headwrap, a neck scarf, or tied to a bag.",
  Sunglasses: "The one accessory that finishes a look before she's said a word.",
  "Hair Accessories": "Small details that carry a whole look.",

  // Beauty & Self-Care
  Fragrance: "Considered scents for the everyday ritual before getting dressed.",
  "Body Care": "Lightweight, fast-absorbing essentials for the daily routine.",
  Skincare: "The last, unhurried step before bed.",
  Makeup: "Wearable, buildable colour for however much — or little — she wants.",

  // Travel
  "Passport Holders": "Small leather goods that make travelling feel a little more considered.",
  "Toiletry Bags": "Built to survive a full trip without spilling into the suitcase.",
  "Travel Organisers": "The little things that keep a suitcase honest.",

  // Gifts
  "Gift Sets": "Curated selections, beautifully packaged and ready to give.",
  "Jewellery Gifts": "A considered piece of jewellery, gift-boxed and ready.",
  "Fragrance Gifts": "A scent worth discovering, presented as a gift.",
  "Travel Gifts": "A thoughtful send-off for someone about to go somewhere.",
  "Accessories Gifts": "An easy, considered gift at any budget.",
};

export function getSubcategoryIntro(department, subcategory) {
  return (
    subcategoryIntros[subcategory] ||
    `Part of ${department.label.toLowerCase()} — thoughtfully selected, not endlessly stocked.`
  );
}
