import { shopCategories } from "@/data/shop-categories";
import { products } from "@/data/products";
import { journalArticles } from "@/data/journal";

const BASE_URL = "https://dameallure.com";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/shop",
    "/create-your-edit",
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

  const categoryRoutes = shopCategories.map((c) => ({
    url: `${BASE_URL}/shop/${c.slug}`,
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

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...journalRoutes];
}
