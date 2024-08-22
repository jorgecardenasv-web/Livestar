import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useThemeStore } from '../store/theme-store'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore()

  return (
    <NextThemesProvider attribute="class" defaultTheme={theme} enableSystem>
      {children}
    </NextThemesProvider>
  )
}