import { create } from 'zustand';

const useProgressStore = create((set) => ({
  progress: [],
  addProgress: async (subSkill, isCorrect) => {
    const userId = localStorage.getItem("userid");
    const skillType = "Maths";
    const score = isCorrect ? 1 : -1;

    try {
      const response = await fetch("http://localhost:8005/api/progress/addProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, skillType, subSkill, score }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message, data.data);
        set((state) => ({
          progress: [...state.progress, data.data],
        }));
      } else {
        console.error("Failed to save progress:", data.error);
      }
    } catch (error) {
      console.error("Error in addProgress:", error);
    }
  },
  
}));

export default useProgressStore;