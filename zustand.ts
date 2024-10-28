import { create } from 'zustand'

interface LanguageState {
  language: string
  switchLanguage: (newLanguage: string) => void
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'en',
  switchLanguage: (newLanguage: string) => {
    set({ language: newLanguage })
  },
}))
