import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ADMIN_PASSWORD } from '../config/admin';

export const useAdminAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (password) => {
        const ok = password === ADMIN_PASSWORD;
        if (ok) set({ isAuthenticated: true });
        return ok;
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'ziuworld-admin-auth' }
  )
);
