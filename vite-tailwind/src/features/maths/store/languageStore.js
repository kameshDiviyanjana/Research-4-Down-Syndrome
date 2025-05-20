import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  language: 'en', // Default language
  setLanguage: (lang) => set({ language: lang }),
  toggleLanguage: () => set((state) => ({
    language: state.language === 'en' ? 'si' : 'en',
  })),
}));

export default useLanguageStore;