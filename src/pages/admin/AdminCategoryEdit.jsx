import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import Button from '../../components/ui/Button';

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft';

export default function AdminCategoryEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const categories = useCatalogStore((s) => s.categories);
  const addCategory = useCatalogStore((s) => s.addCategory);
  const updateCategory = useCatalogStore((s) => s.updateCategory);

  const existing = slug ? categories.find((c) => c.slug === slug) : null;
  const isEditing = Boolean(existing);
  const groupOptions = [...new Set(categories.map((c) => c.group))];

  const [form, setForm] = useState({
    name: existing?.name ?? '',
    group: existing?.group ?? groupOptions[0] ?? 'Traditional Wear',
    blurb: existing?.blurb ?? '',
    image: existing?.image ?? '',
  });

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (slug && !existing) {
    return (
      <div className="text-center text-ink-soft">
        Category not found.{' '}
        <Link to="/admin/categories" className="text-gold-dark hover:underline">
          Back to categories
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      group: form.group.trim(),
      blurb: form.blurb.trim(),
      image: form.image.trim(),
    };

    if (isEditing) {
      updateCategory(existing.slug, payload);
    } else {
      addCategory(payload);
    }
    navigate('/admin/categories');
  };

  return (
    <div className="mx-auto max-w-xl">
      <Link
        to="/admin/categories"
        className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold-dark"
      >
        <ArrowLeft size={15} />
        Back to categories
      </Link>

      <h1 className="mt-4 font-display text-3xl font-medium text-ink">
        {isEditing ? 'Edit Category' : 'Add Category'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className={labelClass}>Name</label>
          <input required value={form.name} onChange={setField('name')} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Group</label>
          <input
            required
            value={form.group}
            onChange={setField('group')}
            list="group-options"
            placeholder="e.g. Traditional Wear"
            className={inputClass}
          />
          <datalist id="group-options">
            {groupOptions.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
          <p className="mt-1 text-xs text-ink-soft">
            Categories with the same group are shown together in the navigation menu.
          </p>
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <input
            required
            value={form.blurb}
            onChange={setField('blurb')}
            placeholder="e.g. Handwoven silks & weaves"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input
            required
            value={form.image}
            onChange={setField('image')}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="h-40 w-full rounded-xl object-cover bg-cream-dark"
          />
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" size="lg">
            {isEditing ? 'Save Changes' : 'Add Category'}
          </Button>
          <Button as={Link} to="/admin/categories" variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
