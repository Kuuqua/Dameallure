export const shopCategories = [
  {
    slug: "work-edit",
    label: "The Work Edit",
    copy: "Polished pieces for the woman who means business.",
  },
  {
    slug: "friday-edit",
    label: "The Friday Edit",
    copy: "Modern African style, thoughtfully reimagined.",
  },
  {
    slug: "sunday-edit",
    label: "The Sunday Edit",
    copy: "Elegant, feminine and effortlessly refined.",
  },
  {
    slug: "vacation-edit",
    label: "The Vacation Edit",
    copy: "Everything she needs to travel beautifully.",
  },
  {
    slug: "travel-edit",
    label: "The Travel Edit",
    copy: "From what she wears to the little things she didn't know she needed.",
  },
  {
    slug: "gift-edit",
    label: "The Gift Edit",
    copy: "Something thoughtful, beautifully put together.",
  },
  {
    slug: "occasion-edit",
    label: "The Occasion Edit",
    copy: "For the moments worth remembering.",
  },
  {
    slug: "accessories",
    label: "Accessories",
    copy: "The finishing details — bags, jewellery and more.",
  },
  {
    slug: "beauty-self-care",
    label: "Beauty & Self-Care",
    copy: "Thoughtful essentials for looking after her.",
  },
];

export function getCategory(slug) {
  return shopCategories.find((c) => c.slug === slug);
}
