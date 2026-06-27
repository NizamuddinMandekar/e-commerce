import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import Button from '../../components/ui/Button';

export default function AdminCategories() {
  const categories = useCatalogStore((s) => s.categories);
  const products = useCatalogStore((s) => s.products);
  const deleteCategory = useCatalogStore((s) => s.deleteCategory);

  const handleDelete = (category) => {
    const inUse = products.some((p) => p.category === category.slug);
    if (inUse) {
      window.alert(
        `"${category.name}" still has products assigned to it. Reassign or delete those products first.`
      );
      return;
    }
    if (window.confirm(`Delete "${category.name}"?`)) {
      deleteCategory(category.slug);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Categories</h1>
          <p className="mt-1 text-ink-soft">{categories.length} categories</p>
        </div>
        <Button as={Link} to="/admin/categories/new">
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.slug} className="overflow-hidden rounded-2xl border border-line bg-cream">
            <img src={cat.image} alt={cat.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
                {cat.group}
              </p>
              <h3 className="mt-1 font-medium text-ink">{cat.name}</h3>
              <p className="text-sm text-ink-soft">{cat.blurb}</p>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  to={`/admin/categories/${cat.slug}/edit`}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-cream-dark cursor-pointer"
                >
                  <Pencil size={13} />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(cat)}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-cream-dark hover:text-maroon cursor-pointer"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
