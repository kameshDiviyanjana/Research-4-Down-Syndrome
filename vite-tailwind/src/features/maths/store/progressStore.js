import { create } from 'zustand';

const useProgressStore = create((set) => ({
  progress: [], 
  addProgress: (practiceType, count) =>
    set((state) => ({
      progress: [
        ...state.progress,
        { practiceType, count, timestamp: new Date().toISOString() }, 
      ],
    })),
  resetProgress: () =>
    set(() => ({
      progress: [],
    })),
}));

export default useProgressStore;