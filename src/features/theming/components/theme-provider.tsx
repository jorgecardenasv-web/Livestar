'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useThemeStore } from '../store/theme-store'

export const ThemeProvider: React.FC<{ children: React.ReactNode, theme?: string }> = ({ children, theme }) => {
  const { theme: themeStoreTheme } = useThemeStore()

  return (
    <NextThemesProvider attribute="class" defaultTheme={theme ?? themeStoreTheme} enableSystem>
      {children}
    </NextThemesProvider>
  )
}