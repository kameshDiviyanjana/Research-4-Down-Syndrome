// src/store/progressStore.js
import { create } from 'zustand';

const useProgressStore = create((set) => ({
  progress: [], // Initial empty array for progress tracking
  addProgress: (practiceType, count) =>
    set((state) => ({
      progress: [
        ...state.progress,
        { practiceType, count, timestamp: new Date().toISOString() }, // Adding timestamp for uniqueness
      ],
    })),
  resetProgress: () =>
    set(() => ({
      progress: [],
    })),
}));

export default useProgressStore;