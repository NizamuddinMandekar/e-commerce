import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder = {
          id: `ZW${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
          status: 'Processing',
          ...order,
        };
        set({ orders: [newOrder, ...get().orders] });
        return newOrder;
      },

      updateStatus: (id, status) => {
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)),
        });
      },

      getOrderById: (id) => get().orders.find((o) => o.id === id),

      totalRevenue: () =>
        get()
          .orders.filter((o) => o.status !== 'Cancelled')
          .reduce((sum, o) => sum + o.total, 0),
    }),
    { name: 'ziuworld-orders' }
  )
);
