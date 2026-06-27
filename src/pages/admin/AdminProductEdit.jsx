import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import Button from '../../components/ui/Button';

const inputClass =
  'w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus-visible:border-gold';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft';

const BLANK_FORM = {
  name: '',
  category: '',
  color: '',
  price: '',
  compareAtPrice: '',
  stock: '',
  rating: '',
  reviews: '',
  badge: '',
  material: '',
  care: '',
  description: '',
  sizes: '',
  images: '',
};

function productToForm(product) {
  return {
    name: product.name ?? '',
    category: product.category ?? '',
    color: product.color ?? '',
    price: product.price ?? '',
    compareAtPrice: product.compareAtPrice ?? '',
    stock: product.stock ?? '',
    rating: product.rating ?? '',
    reviews: product.reviews ?? '',
    badge: product.badge ?? '',
    material: product.material ?? '',
    care: product.care ?? '',
    description: product.description ?? '',
    sizes: (product.sizes ?? []).join(', '),
    images: (product.images ?? []).join(', '),
  };
}

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categories = useCatalogStore((s) => s.categories);
  const getProductById = useCatalogStore((s) => s.getProductById);
  const addProduct = useCatalogStore((s) => s.addProduct);
  const updateProduct = useCatalogStore((s) => s.updateProduct);
  const deleteProduct = useCatalogStore((s) => s.deleteProduct);

  const existing = id ? getProductById(id) : null;
  const isEditing = Boolean(existing);
  const [form, setForm] = useState(existing ? productToForm(existing) : BLANK_FORM);
  const [hasOffer, setHasOffer] = useState(Boolean(existing?.compareAtPrice));

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleOffer = (e) => {
    const checked = e.target.checked;
    setHasOffer(checked);
    if (!checked) setForm((f) => ({ ...f, compareAtPrice: '' }));
  };

  const discountPercent =
    hasOffer && Number(form.compareAtPrice) > Number(form.price) && Number(form.price) > 0
      ? Math.round(((Number(form.compareAtPrice) - Number(form.price)) / Number(form.compareAtPrice)) * 100)
      : null;

  if (id && !existing) {
    return (
      <div className="text-center text-ink-soft">
        Product not found.{' '}
        <Link to="/admin/products" className="text-gold-dark hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      category: form.category,
      color: form.color.trim(),
      price: Number(form.price) || 0,
      compareAtPrice: hasOffer && form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      stock: Number(form.stock) || 0,
      rating: form.rating ? Number(form.rating) : 0,
      reviews: form.reviews ? Number(form.reviews) : 0,
      badge: form.badge || undefined,
      material: form.material.trim(),
      care: form.care.trim(),
      description: form.description.trim(),
      sizes: form.sizes
        ? form.sizes.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined,
      images: form.images
        ? form.images.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    };

    if (isEditing) {
      updateProduct(existing.id, payload);
    } else {
      addProduct(payload);
    }
    navigate('/admin/products');
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${existing.name}"? This cannot be undone.`)) {
      deleteProduct(existing.id);
      navigate('/admin/products');
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin/products"
        className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-gold-dark"
      >
        <ArrowLeft size={15} />
        Back to products
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium text-ink">
          {isEditing ? 'Edit Product' : 'Add Product'}
        </h1>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-sm font-medium text-maroon hover:underline cursor-pointer"
          >
            <Trash2 size={15} />
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Product Name</label>
            <input required value={form.name} onChange={setField('name')} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              required
              value={form.category}
              onChange={setField('category')}
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Color</label>
            <input value={form.color} onChange={setField('color')} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Price (₹)</label>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={setField('price')}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Stock Quantity</label>
            <input
              required
              type="number"
              min="0"
              value={form.stock}
              onChange={setField('stock')}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Badge</label>
            <select value={form.badge} onChange={setField('badge')} className={inputClass}>
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Bestseller">Bestseller</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Rating (0–5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={setField('rating')}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Review Count</label>
            <input
              type="number"
              min="0"
              value={form.reviews}
              onChange={setField('reviews')}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Sizes (comma-separated, optional)</label>
            <input
              value={form.sizes}
              onChange={setField('sizes')}
              placeholder="S, M, L, XL"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Material</label>
            <input value={form.material} onChange={setField('material')} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Care Instructions</label>
            <input value={form.care} onChange={setField('care')} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={setField('description')}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Image URLs (comma-separated)</label>
            <textarea
              rows={2}
              value={form.images}
              onChange={setField('images')}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-cream-dark p-5">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={hasOffer}
              onChange={toggleOffer}
              className="h-4 w-4 rounded border-line text-gold-dark accent-[#b8893f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            />
            This product has an active offer / discount
          </label>

          {hasOffer && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Original Price (₹, before offer)</label>
                <input
                  type="number"
                  min="0"
                  value={form.compareAtPrice}
                  onChange={setField('compareAtPrice')}
                  placeholder="e.g. 16999"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-ink-soft">
                  Must be higher than the Price field above for the discount to show.
                </p>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Customers will see</label>
                {discountPercent ? (
                  <p className="rounded-xl bg-cream px-4 py-2.5 text-sm font-semibold text-maroon">
                    {discountPercent}% off — was ₹{Number(form.compareAtPrice).toLocaleString('en-IN')}
                  </p>
                ) : (
                  <p className="rounded-xl bg-cream px-4 py-2.5 text-sm text-ink-soft">
                    Enter an original price above to preview the discount.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg">
            {isEditing ? 'Save Changes' : 'Add Product'}
          </Button>
          <Button as={Link} to="/admin/products" variant="outline" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
