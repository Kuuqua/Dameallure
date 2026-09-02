import { departments } from "@/data/shop-taxonomy";
import { occasions } from "@/data/occasions";
import { products } from "@/data/products";
import { journalArticles } from "@/data/journal";

const BASE_URL = "https://dameallure.com";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/shop",
    "/shop-by-occasion",
    "/collections",
    "/create-your-curation",
    "/travel",
    "/gifting",
    "/curation-experience",
    "/about",
    "/journal",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const departmentRoutes = departments.map((d) => ({
    url: `${BASE_URL}/shop/${d.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const occasionRoutes = occasions
    .filter((o) => o.href === `/shop-by-occasion/${o.key}`)
    .map((o) => ({
      url: `${BASE_URL}${o.href}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const journalRoutes = journalArticles.map((a) => ({
    url: `${BASE_URL}/journal/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...departmentRoutes,
    ...occasionRoutes,
    ...productRoutes,
    ...journalRoutes,
  ];
}
