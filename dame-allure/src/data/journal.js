export const journalArticles = [
  {
    slug: "build-a-corporate-wardrobe",
    title: "How to Build a Corporate Wardrobe",
    category: "Work",
    excerpt:
      "You don't need forty pieces. You need the right eight, worn well.",
    body: [
      "A corporate wardrobe isn't built by buying more — it's built by buying deliberately. Start with three foundations: a structured blazer, a well-cut trouser, and a blouse that works buttoned to the collar or open at the throat. Everything else is variation on those three.",
      "Colour does the heavy lifting here. Anchor your wardrobe in plum, charcoal and ivory, then let one accent — a scarf, a pair of earrings — carry the personality for the day. It reads as intentional, not repetitive.",
      "The test of a corporate wardrobe isn't how it photographs. It's whether you can get dressed at 6am, half-asleep, and still walk into a boardroom looking like you meant every choice.",
    ],
  },
  {
    slug: "modern-friday-ankara",
    title: "The Modern Friday Ankara",
    category: "Friday",
    excerpt:
      "Ankara doesn't have to mean occasion wear. Here's how to wear it on a Tuesday.",
    body: [
      "The old rule was that Ankara was for weddings and church. The new rule is there is no rule — a well-cut Ankara piece belongs in rotation with your everyday wardrobe, not saved for once a year.",
      "The trick is silhouette. A wrap dress, a tailored trouser, a simple wrap top — modern cuts let the print do the talking without turning the whole look into a costume. Pair it with plain accessories and let the fabric be the statement.",
      "Friday dressing, at its best, is confident and a little playful. Ankara, cut right, is exactly that.",
    ],
  },
  {
    slug: "what-to-pack-for-your-next-vacation",
    title: "What to Pack for Your Next Vacation",
    category: "Vacation",
    excerpt: "Packing well is really about packing less — and choosing better.",
    body: [
      "Most overpacking comes from indecision, not need. Before you pack, decide on a three-colour palette for the trip — everything you bring should work with everything else.",
      "Linen and jersey do the most work for the least suitcase space: they don't crease as badly, they layer easily, and they read as put-together whether you're at breakfast or dinner.",
      "Leave one outfit's worth of space empty. You'll thank yourself the moment you find something on day two you didn't know you needed.",
    ],
  },
  {
    slug: "the-art-of-thoughtful-gifting",
    title: "The Art of Thoughtful Gifting",
    category: "Gifting",
    excerpt:
      "The best gifts aren't the most expensive. They're the most specific.",
    body: [
      "A thoughtful gift says: I know you. That means the details matter more than the price tag — her favourite colour, the scent she reaches for, the kind of bag she actually carries versus the kind she'd never use.",
      "Presentation is part of the gift, not an afterthought. How something arrives shapes how it's received — which is exactly why packaging gets so much attention here.",
      "When in doubt, ask what she's preparing for right now. A gift that meets someone in their current season of life lands differently than one that doesn't.",
    ],
  },
  {
    slug: "how-to-build-a-travel-edit",
    title: "How to Build a Travel Edit",
    category: "Travel",
    excerpt:
      "The best travel wardrobe is built around the trip, not around what's already in your closet.",
    body: [
      "Start with the itinerary, not the suitcase. A city break needs different pieces than a beach week — work backwards from what you'll actually be doing each day.",
      "Beauty and self-care essentials deserve the same intentionality as clothing. Travel disrupts routine; the right products help you keep just enough of it to feel like yourself.",
      "This is exactly why a travel edit works better than travel shopping — someone who already knows the destination and the itinerary can build around both, instead of you guessing in a fitting room.",
    ],
  },
  {
    slug: "behind-the-design-dame-allure-x-odehei",
    title: "Behind the Design: Dame Allure × Odehei",
    category: "Exclusives",
    excerpt:
      "A conversation about modern African fashion, and what it means to reinterpret tradition.",
    body: [
      "Odehei's approach to modern African fashion starts with a question: what does tradition look like when it's not trying to prove anything? The answer, in this collaboration, is clean lines built on traditional textile techniques — nothing shouted, everything considered.",
      "Every piece in the collaboration went through multiple fittings on real women, not mannequins, to make sure the silhouettes worked for how the Dame Allure woman actually moves through her day.",
      "The result is a small, focused collection rather than a sprawling one — fewer pieces, each one doing more.",
    ],
  },
  {
    slug: "behind-the-craft-dame-allure-x-renee-royale",
    title: "Behind the Craft: Dame Allure × Renee Royale",
    category: "Exclusives",
    excerpt: "Handcrafted accessories, made the slow way.",
    body: [
      "Renee Royale's accessories are hand-finished, piece by piece — which means no two are ever quite identical, and the small variations are the point, not a flaw.",
      "This collaboration focused on pieces built to be worn daily, not saved for occasions: a cuff that survives a full workday, earrings light enough to forget you're wearing.",
      "It's a reminder that handcrafted doesn't have to mean delicate. It can mean built to last.",
    ],
  },
];

export function getArticle(slug) {
  return journalArticles.find((a) => a.slug === slug);
}
