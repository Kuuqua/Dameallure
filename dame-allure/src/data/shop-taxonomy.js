// Route-slug overrides — where a clean short URL reads better than the
// auto-generated one (e.g. "Trousers & Pants" would otherwise slugify to
// "trousers-and-pants").
const SLUG_OVERRIDES = {
  "Trousers & Pants": "trousers",
  "Blazers & Jackets": "blazers",
  "Ankara & African-Inspired": "ankara",
};

export const departments = [
  {
    slug: "clothing",
    label: "Clothing",
    copy: "From boardroom to Friday to vacation — the full wardrobe.",
    imageKeywords: "fashion,clothing,woman",
    subcategories: [
      "Tops",
      "Dresses",
      "Trousers & Pants",
      "Skirts",
      "Two-Piece Sets",
      "Jumpsuits",
      "Blazers & Jackets",
      "Denim",
      "Nightwear",
      "Loungewear",
      "Vacation Wear",
      "Swimwear",
      "Ankara & African-Inspired",
    ],
  },
  {
    slug: "shoes",
    label: "Shoes",
    copy: "Heels, flats and everything between.",
    imageKeywords: "shoes,heels,fashion",
    subcategories: ["Heels", "Flats", "Sandals", "Sneakers", "Slippers"],
  },
  {
    slug: "bags",
    label: "Bags",
    copy: "Structured, considered, built for how she actually moves.",
    imageKeywords: "handbag,purse,fashion",
    subcategories: ["Work Bags", "Handbags", "Crossbody Bags", "Evening Bags", "Travel Bags"],
  },
  {
    slug: "accessories",
    label: "Jewellery & Accessories",
    copy: "The finishing details.",
    imageKeywords: "jewelry,accessories,gold",
    subcategories: [
      "Earrings",
      "Necklaces",
      "Bracelets",
      "Rings",
      "Belts",
      "Scarves",
      "Sunglasses",
      "Hair Accessories",
      "Watches",
      "Jewellery Organisers",
    ],
  },
  {
    slug: "beauty",
    label: "Beauty & Self-Care",
    copy: "Thoughtful essentials for looking after her.",
    imageKeywords: "beauty,cosmetics,skincare",
    subcategories: ["Fragrance", "Body Care", "Skincare", "Makeup", "Hair", "Beauty Tools", "Self-Care"],
  },
  {
    slug: "travel",
    label: "Travel",
    copy: "The little things she didn't know she needed.",
    imageKeywords: "travel,luggage,suitcase",
    subcategories: [
      "Passport Holders",
      "Luggage Tags",
      "Travel Pouches",
      "Toiletry Bags",
      "Travel Organisers",
      "Travel Accessories",
    ],
  },
  {
    slug: "gifts",
    label: "Gifts",
    copy: "Something thoughtful, beautifully put together.",
    imageKeywords: "gift,present,ribbon",
    subcategories: [
      "Gift Sets",
      "Jewellery Gifts",
      "Fragrance Gifts",
      "Beauty & Self-Care Gifts",
      "Travel Gifts",
      "Nightwear Gifts",
      "Accessories Gifts",
    ],
  },
];

export function getDepartment(slug) {
  return departments.find((d) => d.slug === slug);
}

// Which filters apply to each department — deliberately not "show
// whatever varies": Shoes doesn't get a Collection filter, Jewellery
// doesn't get Occasion, etc., matching the brief's per-category list.
export const departmentFilters = {
  clothing: ["size", "color", "price", "occasion", "collection", "availability"],
  shoes: ["size", "color", "price", "occasion", "availability"],
  bags: ["color", "price", "occasion", "availability"],
  accessories: ["type", "color", "price", "availability"],
  beauty: ["type", "price", "availability"],
  travel: ["type", "price", "availability"],
  gifts: ["type", "price", "availability"],
};

export function getDepartmentFilters(slug) {
  return departmentFilters[slug] || ["price", "availability"];
}

export function getSubcategorySlug(subcategory) {
  if (SLUG_OVERRIDES[subcategory]) return SLUG_OVERRIDES[subcategory];
  return subcategory
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findSubcategoryByRouteSlug(department, routeSlug) {
  return department.subcategories.find(
    (sub) => getSubcategorySlug(sub) === routeSlug
  );
}
