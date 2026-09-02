"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/components/shop/ProductGrid";
import EmptyState from "@/components/shop/EmptyState";

const PAGE_SIZE = 8;

// Default: every filter, for pages that don't specify (occasion pages,
// New Arrivals) since products there span multiple departments/types.
const DEFAULT_FILTERS = ["size", "color", "price", "occasion", "collection", "availability"];

function uniqueValues(products, getValue) {
  const set = new Set();
  products.forEach((p) => {
    const v = getValue(p);
    if (Array.isArray(v)) v.forEach((x) => x && x !== "—" && set.add(x));
    else if (v && v !== "—") set.add(v);
  });
  return Array.from(set).sort();
}

const PRICE_BANDS = [
  { label: "Under GH₵300", test: (p) => p.price < 300 },
  { label: "GH₵300 – GH₵700", test: (p) => p.price >= 300 && p.price <= 700 },
  { label: "Over GH₵700", test: (p) => p.price > 700 },
];

function FilterGroup({ label, options, value, onChange }) {
  if (options.length <= 1) return null;
  return (
    <div className="mb-6">
      <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-charcoal/60">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? null : option)}
            aria-pressed={value === option}
            className="rounded-sm border px-3 py-1.5 text-[12px] transition-colors"
            style={
              value === option
                ? { borderColor: "var(--plum)", background: "var(--plum)", color: "var(--ivory)" }
                : { borderColor: "rgba(75,30,63,0.25)" }
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ShopProductBrowser({ products, emptyStateProps, enabledFilters = DEFAULT_FILTERS }) {
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [priceBand, setPriceBand] = useState(null);
  const [occasion, setOccasion] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [collection, setCollection] = useState(null);
  const [type, setType] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const has = (key) => enabledFilters.includes(key);

  const sizes = useMemo(() => (has("size") ? uniqueValues(products, (p) => p.sizes) : []), [products, enabledFilters]);
  const colors = useMemo(() => (has("color") ? uniqueValues(products, (p) => p.colors) : []), [products, enabledFilters]);
  const occasions = useMemo(
    () => (has("occasion") ? uniqueValues(products, (p) => p.occasions) : []),
    [products, enabledFilters]
  );
  const availabilities = useMemo(
    () => (has("availability") ? uniqueValues(products, (p) => p.availability) : []),
    [products, enabledFilters]
  );
  const collections = useMemo(
    () => (has("collection") ? uniqueValues(products, (p) => p.collection) : []),
    [products, enabledFilters]
  );
  const types = useMemo(
    () => (has("type") ? uniqueValues(products, (p) => p.subcategory) : []),
    [products, enabledFilters]
  );

  const filtered = useMemo(() => {
    let list = products;
    if (size) list = list.filter((p) => p.sizes?.includes(size));
    if (color) list = list.filter((p) => p.colors?.includes(color));
    if (priceBand) {
      const band = PRICE_BANDS.find((b) => b.label === priceBand);
      if (band) list = list.filter(band.test);
    }
    if (occasion) list = list.filter((p) => p.occasions?.includes(occasion));
    if (availability) list = list.filter((p) => p.availability === availability);
    if (collection) list = list.filter((p) => p.collection === collection);
    if (type) list = list.filter((p) => p.subcategory === type);

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "newest") sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    // "featured" — keep the curated catalogue order as-is.

    return sorted;
  }, [products, size, color, priceBand, occasion, availability, collection, type, sort]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterCount = [size, color, priceBand, occasion, availability, collection, type].filter(
    Boolean
  ).length;

  const clearFilters = () => {
    setSize(null);
    setColor(null);
    setPriceBand(null);
    setOccasion(null);
    setAvailability(null);
    setCollection(null);
    setType(null);
  };

  if (products.length === 0) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-plum/15 pb-4">
        <p className="text-[13px] text-charcoal/70">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.06em] text-plum/80 hover:text-plum"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filters
            {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
          <label className="text-[12px] uppercase tracking-[0.06em] text-plum/80">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-none bg-transparent text-[12px] uppercase tracking-[0.06em] text-plum/80 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {filtersOpen ? (
        <div className="mb-8 border border-plum/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[12px] uppercase tracking-[0.08em] text-plum">Filter</p>
            <div className="flex items-center gap-4">
              {activeFilterCount > 0 ? (
                <button onClick={clearFilters} className="text-[11px] uppercase tracking-[0.06em] text-plum/50 hover:text-plum">
                  Clear all
                </button>
              ) : null}
              <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="text-plum/50 hover:text-plum">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          {has("type") ? <FilterGroup label="Type" options={types} value={type} onChange={setType} /> : null}
          {has("size") ? <FilterGroup label="Size" options={sizes} value={size} onChange={setSize} /> : null}
          {has("color") ? <FilterGroup label="Colour" options={colors} value={color} onChange={setColor} /> : null}
          <FilterGroup
            label="Price"
            options={PRICE_BANDS.map((b) => b.label)}
            value={priceBand}
            onChange={setPriceBand}
          />
          {has("occasion") ? <FilterGroup label="Occasion" options={occasions} value={occasion} onChange={setOccasion} /> : null}
          {has("collection") ? <FilterGroup label="Collection" options={collections} value={collection} onChange={setCollection} /> : null}
          <FilterGroup label="Availability" options={availabilities} value={availability} onChange={setAvailability} />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="font-display text-2xl text-plum">Nothing matches those filters yet.</p>
          <button
            onClick={clearFilters}
            className="mt-6 rounded-sm border border-plum/25 px-7 py-3 text-[13px] uppercase tracking-[0.08em] text-plum hover:border-plum"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <ProductGrid products={visible} />
          {visibleCount < filtered.length ? (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="rounded-sm border border-plum/25 px-7 py-3 text-[13px] uppercase tracking-[0.08em] text-plum hover:border-plum"
              >
                Load More
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
