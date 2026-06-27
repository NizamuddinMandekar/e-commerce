import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 4 }) {
  if (!products.length) {
    return (
      <div className="py-16 text-center text-ink-soft">
        No products match these filters yet.
      </div>
    );
  }

  const colsClass =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 ${colsClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
