"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X, Search as SearchIcon } from "lucide-react";
import { products } from "@/data/products";
import { departments } from "@/data/shop-taxonomy";
import { occasions } from "@/data/occasions";
import { journalArticles } from "@/data/journal";

function buildIndex() {
  const productEntries = products.map((p) => ({
    type: "Product",
    label: p.name,
    sub: `GH₵${p.price.toLocaleString()}`,
    href: `/product/${p.slug}`,
    haystack: `${p.name} ${p.shortDescription} ${p.subcategory || ""} ${(p.tags || []).join(" ")} ${(p.colors || []).join(" ")} ${(p.occasions || []).join(" ")}`.toLowerCase(),
  }));
  const departmentEntries = departments.map((d) => ({
    type: "Shop",
    label: d.label,
    sub: d.copy,
    href: `/shop/${d.slug}`,
    haystack: `${d.label} ${d.copy}`.toLowerCase(),
  }));
  const occasionEntries = occasions.map((o) => ({
    type: "Occasion",
    label: o.label,
    sub: o.copy,
    href: o.href,
    haystack: `${o.label} ${o.copy}`.toLowerCase(),
  }));
  const journalEntries = journalArticles.map((a) => ({
    type: "Journal",
    label: a.title,
    sub: a.excerpt,
    href: `/journal/${a.slug}`,
    haystack: `${a.title} ${a.excerpt} ${a.category}`.toLowerCase(),
  }));
  return [...productEntries, ...departmentEntries, ...occasionEntries, ...journalEntries];
}

const INDEX = buildIndex();

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Reset query when the modal closes so it's blank next time it opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);
    return INDEX.filter((entry) => words.every((word) => entry.haystack.includes(word))).slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-plum-deep/40"
      />
      <div className="absolute left-1/2 top-24 w-full max-w-xl -translate-x-1/2 bg-ivory px-2 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-plum/15 px-4 py-4">
          <SearchIcon size={18} strokeWidth={1.5} className="text-plum/50" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, collections, journal…"
            className="flex-1 bg-transparent text-[15px] text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          />
          <button aria-label="Close search" onClick={onClose} className="text-plum/60 hover:text-plum">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {results.length === 0 ? (
              <p className="px-4 py-6 text-[14px] text-charcoal/60">
                Nothing matched &ldquo;{query}&rdquo; — try a different word, or{" "}
                <Link href="/create-your-curation" onClick={onClose} className="underline decoration-gold underline-offset-4">
                  let a Curator find it
                </Link>
                .
              </p>
            ) : (
              <ul>
                {results.map((r) => (
                  <li key={`${r.type}-${r.href}`}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-plum/5"
                    >
                      <span>
                        <span className="block text-[15px] text-plum">{r.label}</span>
                        <span className="block text-[12px] text-charcoal/60 line-clamp-1">{r.sub}</span>
                      </span>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.08em] text-plum/40">
                        {r.type}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
