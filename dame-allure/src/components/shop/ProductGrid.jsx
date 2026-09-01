import ProductCard from "@/components/shop/ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p className="py-16 text-[14px] text-charcoal/80">
        New pieces for this edit are on the way.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
