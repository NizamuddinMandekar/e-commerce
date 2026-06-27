import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const lineId = (productId, size) => (size ? `${productId}__${size}` : productId);

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, { size, qty = 1 } = {}) => {
        const id = lineId(product.id, size);
        const items = get().items;
        const existing = items.find((item) => item.id === id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === id ? { ...item, qty: item.qty + qty } : item
            ),
          });
          return;
        }

        set({
          items: [
            ...items,
            {
              id,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              price: product.price,
              size: size ?? null,
              qty,
            },
          ],
        });
      },

      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),

      setQty: (id, qty) =>
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty: Math.max(1, qty) } : item
          ),
        }),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.qty * item.price, 0),
    }),
    { name: 'ziuworld-cart' }
  )
);
