import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface LanguageState {
  language: string
  switchLanguage: (newLanguage: string) => void
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      switchLanguage: (newLanguage: string) => set({ language: newLanguage }),
    }),
    {
      name: 'language-storage', // name of the item in the storage
      storage: createJSONStorage(() => sessionStorage), // sessionStorage for non-permanent storage
    }
  )
)
