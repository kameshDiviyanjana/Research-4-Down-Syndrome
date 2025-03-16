// utils/progress.js

const PROGRESS_KEY = "userProgress";

// Initialize or get progress from local storage
export const getProgress = () => {
    const storedProgress = localStorage.getItem(PROGRESS_KEY);
    return storedProgress
        ? JSON.parse(storedProgress)
        : {
              numbers: { correct: 0, total: 0, completion: 0 },
              sequence: { correct: 0, total: 0, completion: 0 },
              addition: { correct: 0, total: 0, completion: 0 },
              subtraction: { correct: 0, total: 0, completion: 0 },
          };
};

// Update progress when an activity is completed
export const updateProgress = (activity, isCorrect) => {
    let progress = getProgress();

    // Ensure the activity exists
    if (!progress[activity]) {
        progress[activity] = { correct: 0, total: 0, completion: 0 };
    }

    // Update correct and total attempts
    if (isCorrect) {
        progress[activity].correct += 1;
    }
    progress[activity].total += 1;

    // Calculate completion percentage (max progress is 100%)
    progress[activity].completion = Math.min((progress[activity].correct / 5) * 100, 100);

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

// Get completion percentage for an activity
export const getCompletionPercentage = (activity) => {
    const progress = getProgress();
    return progress[activity]?.completion || 0;
};

// Reset progress for all activities
export const resetProgress = () => {
    localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({
            numbers: { correct: 0, total: 0, completion: 0 },
            sequence: { correct: 0, total: 0, completion: 0 },
            addition: { correct: 0, total: 0, completion: 0 },
            subtraction: { correct: 0, total: 0, completion: 0 },
        })
    );
};
