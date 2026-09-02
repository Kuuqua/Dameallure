export const departments = [
  {
    slug: "clothing",
    label: "Clothing",
    copy: "From boardroom to Friday to vacation — the full wardrobe.",
    subcategories: [
      "New Arrivals",
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
      "Swimwear",
      "Vacation Wear",
      "Ankara & African-Inspired",
    ],
  },
  {
    slug: "shoes",
    label: "Shoes",
    copy: "Heels, flats and everything between.",
    subcategories: ["Heels", "Flats", "Sandals", "Sneakers", "Slippers"],
  },
  {
    slug: "bags",
    label: "Bags",
    copy: "Structured, considered, built for how she actually moves.",
    subcategories: ["Work Bags", "Handbags", "Crossbody Bags", "Evening Bags", "Travel Bags"],
  },
  {
    slug: "jewellery-accessories",
    label: "Jewellery & Accessories",
    copy: "The finishing details.",
    subcategories: [
      "Jewellery",
      "Belts",
      "Scarves",
      "Sunglasses",
      "Hair Accessories",
      "Watches",
      "Other Accessories",
    ],
  },
  {
    slug: "beauty-self-care",
    label: "Beauty & Self-Care",
    copy: "Thoughtful essentials for looking after her.",
    subcategories: ["Fragrance", "Body Care", "Skincare", "Makeup", "Hair", "Beauty Tools"],
  },
  {
    slug: "travel",
    label: "Travel",
    copy: "The little things she didn't know she needed.",
    subcategories: [
      "Passport Holders",
      "Luggage Tags",
      "Travel Pouches",
      "Travel Organisers",
      "Toiletry Bags",
      "Travel Accessories",
    ],
  },
  {
    slug: "gifts",
    label: "Gifts",
    copy: "Something thoughtful, beautifully put together.",
    subcategories: [],
  },
];

export function getDepartment(slug) {
  return departments.find((d) => d.slug === slug);
}
