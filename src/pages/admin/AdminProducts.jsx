import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { formatPrice } from '../../lib/format';
import Button from '../../components/ui/Button';

export default function AdminProducts() {
  const products = useCatalogStore((s) => s.products);
  const categories = useCatalogStore((s) => s.categories);
  const deleteProduct = useCatalogStore((s) => s.deleteProduct);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Products</h1>
          <p className="mt-1 text-ink-soft">{products.length} products in your catalog</p>
        </div>
        <Button as={Link} to="/admin/products/new">
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-line bg-cream py-2.5 pl-10 pr-4 text-sm text-ink outline-none focus-visible:border-gold"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-full border border-line bg-cream px-4 py-2.5 text-sm text-ink cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-cream">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-none">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-12 w-10 rounded-lg object-cover bg-cream-dark"
                    />
                    <span className="font-medium text-ink">{product.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {categories.find((c) => c.slug === product.category)?.name ?? product.category}
                </td>
                <td className="px-5 py-3 text-ink">{formatPrice(product.price)}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      product.stock <= 0
                        ? 'font-medium text-maroon'
                        : product.stock <= 5
                        ? 'font-medium text-gold-dark'
                        : 'text-ink-soft'
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-dark hover:text-ink cursor-pointer"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => handleDelete(product)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-dark hover:text-maroon cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
