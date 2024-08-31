import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: string
  isOpen: boolean
  setTheme: (theme: string) => void
  toggleDropdown: () => void
  closeDropdown: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      isOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleDropdown: () => set((state) => ({ isOpen: !state.isOpen })),
      closeDropdown: () => set({ isOpen: false }),
    }),
    {
      name: 'theme-storage',
    }
  )
)