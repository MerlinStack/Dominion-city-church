import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  mode: localStorage.getItem('theme') || 'dark',
  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newMode);
      document.documentElement.classList.remove('dark-theme', 'light-theme');
      document.documentElement.classList.add(`${newMode}-theme`);
      return { mode: newMode };
    }),
  setMode: (mode) => {
    localStorage.setItem('theme', mode);
    document.documentElement.classList.remove('dark-theme', 'light-theme');
    document.documentElement.classList.add(`${mode}-theme`);
    set({ mode });
  },
}));
