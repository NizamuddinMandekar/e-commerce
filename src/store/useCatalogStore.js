import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { slugify } from '../lib/slugify';

const uniqueSlug = (list, base, ignoreSlug) => {
  let slug = slugify(base) || 'item';
  let i = 1;
  while (list.some((item) => item.slug === slug && item.slug !== ignoreSlug)) {
    slug = `${slugify(base)}-${i}`;
    i += 1;
  }
  return slug;
};

export const useCatalogStore = create(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      categories: CATEGORIES,

      // ---- Products ----
      addProduct: (data) => {
        const products = get().products;
        const slug = uniqueSlug(products, data.name);
        const product = {
          id: `prod-${Date.now()}`,
          rating: 0,
          reviews: 0,
          stock: 0,
          images: [],
          ...data,
          slug,
        };
        set({ products: [product, ...products] });
        return product;
      },

      updateProduct: (id, data) => {
        set({
          products: get().products.map((p) =>
            p.id === id
              ? { ...p, ...data, slug: uniqueSlug(get().products, data.name ?? p.name, p.slug) }
              : p
          ),
        });
      },

      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },

      getProductBySlug: (slug) => get().products.find((p) => p.slug === slug),
      getProductById: (id) => get().products.find((p) => p.id === id),
      getProductsByCategory: (categorySlug) =>
        get().products.filter((p) => p.category === categorySlug),
      getRelatedProducts: (product, count = 4) =>
        get()
          .products.filter((p) => p.category === product.category && p.id !== product.id)
          .slice(0, count),

      // ---- Categories ----
      addCategory: (data) => {
        const categories = get().categories;
        const slug = uniqueSlug(categories, data.name);
        const category = { ...data, slug };
        set({ categories: [...categories, category] });
        return category;
      },

      updateCategory: (originalSlug, data) => {
        const categories = get().categories;
        const newSlug = uniqueSlug(categories, data.name ?? originalSlug, originalSlug);
        set({
          categories: categories.map((c) =>
            c.slug === originalSlug ? { ...c, ...data, slug: newSlug } : c
          ),
          products:
            newSlug !== originalSlug
              ? get().products.map((p) =>
                  p.category === originalSlug ? { ...p, category: newSlug } : p
                )
              : get().products,
        });
      },

      deleteCategory: (slug) => {
        const inUse = get().products.some((p) => p.category === slug);
        if (inUse) return false;
        set({ categories: get().categories.filter((c) => c.slug !== slug) });
        return true;
      },

      getCategoryBySlug: (slug) => get().categories.find((c) => c.slug === slug),
    }),
    { name: 'ziuworld-catalog' }
  )
);
