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
    slug: "jewellery-accessories",
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
    slug: "beauty-self-care",
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
    subcategories: [],
  },
];

export function getDepartment(slug) {
  return departments.find((d) => d.slug === slug);
}

export function getSubcategorySlug(subcategory) {
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
