import { useEffect } from 'react'
import { useThemeStore } from '../store/theme-store'
import { useTheme } from 'next-themes'

export const useThemeSelector = () => {
  const { theme, isOpen, setTheme, toggleDropdown, closeDropdown } = useThemeStore()
  const { setTheme: setNextTheme } = useTheme()

  useEffect(() => {
    setNextTheme(theme)
  }, [theme, setNextTheme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    closeDropdown()
  }

  return {
    theme,
    isOpen,
    toggleDropdown,
    closeDropdown,
    handleThemeChange,
  }
}