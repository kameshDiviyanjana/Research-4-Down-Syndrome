import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useProgressStore from "../maths/store/progressStore";
import useLanguageStore from "../maths/store/languageStore";
import {
  showSuccessAlert,
  showFailureAlert,
} from "../maths/components/ResponseModal";
import FingerCountingFeed from "./components/FingerCountingFeed";
import "./PracticeAnimations.css";
import substractEnglish from "../maths/sounds/substract.m4a";
import substractSinhala from "../maths/sounds/S-subtract.m4a";
import whatIstheAnswerAudioSinhala from "../maths/sounds/S-SonAnswer.m4a";
import whatIstheAnswerAudioEnglish from "../maths/sounds/answerIs.m4a";
import backgroundImg from "../../../public/images/practiceBg2.jpg";
import { useNavigate } from "react-router-dom";
import { fetchFingerCount } from "./services/fingerCountingService";
import { getLanguagePreference } from "../../services/languageService";

import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";
import num6 from "../../assets/numbers/6.png";
import num7 from "../../assets/numbers/7.png";
import num8 from "../../assets/numbers/8.png";
import num9 from "../../assets/numbers/9.png";
import num10 from "../../assets/numbers/10.png";

// Sinhala Sounds
import sound0 from "../maths/sounds/0.mp3";
import sound1 from "../maths/sounds/1.mp3";
import sound2 from "../maths/sounds/2.mp3";
import sound3 from "../maths/sounds/3.mp3";
import sound4 from "../maths/sounds/4.mp3";
import sound5 from "../maths/sounds/5.mp3";
import sound6 from "../maths/sounds/6.mp3";
import sound7 from "../maths/sounds/7.mp3";
import sound8 from "../maths/sounds/8.mp3";
import sound9 from "../maths/sounds/9.mp3";
import sound10 from "../maths/sounds/10.m4a";

// English Sounds
import soundEN0 from "../maths/sounds/E0.m4a";
import soundEN1 from "../maths/sounds/E1.m4a";
import soundEN2 from "../maths/sounds/E2.m4a";
import soundEN3 from "../maths/sounds/E3.m4a";
import soundEN4 from "../maths/sounds/E4.m4a";
import soundEN5 from "../maths/sounds/E5.m4a";
import soundEN6 from "../maths/sounds/E6.m4a";
import soundEN7 from "../maths/sounds/E7.m4a";
import soundEN8 from "../maths/sounds/E8.m4a";
import soundEN9 from "../maths/sounds/E9.m4a";
import soundEN10 from "../maths/sounds/E10.m4a";

const numberImages = {
  0: num0,
  1: num1,
  2: num2,
  3: num3,
  4: num4,
  5: num5,
  6: num6,
  7: num7,
  8: num8,
  9: num9,
  10: num10,
};

// Sinhala number sounds
const numberSoundsSinhala = {
  0: sound0,
  1: sound1,
  2: sound2,
  3: sound3,
  4: sound4,
  5: sound5,
  6: sound6,
  7: sound7,
  8: sound8,
  9: sound9,
  10: sound10,
};

// English number sounds
const numberSoundsEnglish = {
  0: soundEN0,
  1: soundEN1,
  2: soundEN2,
  3: soundEN3,
  4: soundEN4,
  5: soundEN5,
  6: soundEN6,
  7: soundEN7,
  8: soundEN8,
  9: soundEN9,
  10: soundEN10,
};

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Subtraction Practice",
    instructions: "Show the difference with your fingers!",
    startButton: "Start Practice",
    tryAgainButton: "Try Again",
    nextQuestionButton: "Next Question",
    countdown: "Starting in: {count}s",
    successTitle: "Correct Answer!",
    successText: "Well Done!",
    failureTitle: "Incorrect!",
    failureText: "Try Again!",
    failureLowConfidence:
      "Try Again! (Hold your hand steady for a higher confidence score)",
    failureWrongNumber:
      "You showed {userPrediction}, but the correct number was {targetNumber}.",
    errorTitle: "Error",
    errorText: "Failed to fetch finger count. Please try again.",
  },
  si: {
    title: "අඩු කිරීම පුහුණුව",
    instructions: "වෙනස ඔබේ ඇඟිලිවලින් පෙන්වන්න!",
    startButton: "පුහුණුව ආරම්භ කරන්න",
    tryAgainButton: "නැවත උත්සාහ කරන්න",
    nextQuestionButton: "ඊළඟ ප්‍රශ්නය",
    countdown: "ආරම්භ වන්නේ: {count} තත්පරයකින්",
    successTitle: "නිවැරදි පිළිතුර!",
    successText: "හොඳින් කළා!",
    failureTitle: "වැරදියි!",
    failureText: "නැවත උත්සාහ කරන්න!",
    failureLowConfidence:
      "නැවත උත්සාහ කරන්න! (වැඩි විශ්වාස ප්‍රමාණයක් සඳහා ඔබේ අත ස්ථිරව තබා ගන්න)",
    failureWrongNumber:
      "ඔබ පෙන්වූයේ {userPrediction}, නමුත් නිවැරදි ඉලක්කම වූයේ {targetNumber}.",
    errorTitle: "දෝෂය",
    errorText: "ඇඟිලි ගණන ලබා ගැනීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න。",
  },
};

const playSound = (number, language) => {
  const numberSounds =
    language === "si" ? numberSoundsSinhala : numberSoundsEnglish;
  const audio = new Audio(numberSounds[number]);
  audio.play().catch((error) => console.error("Audio play error:", error));
};

// Initial easy tasks for the first 5 questions
const initialEasyTasks = [
  { num1: 1, num2: 0, answer: 1 },
  { num1: 2, num2: 1, answer: 1 },
  { num1: 3, num2: 2, answer: 1 },
  { num1: 3, num2: 1, answer: 2 },
  { num1: 4, num2: 2, answer: 2 },
];

// Generate a random task based on taskCount
const generateTask = (taskCount) => {
  if (taskCount <= 5) {
    return initialEasyTasks[taskCount - 1];
  } else if (taskCount <= 10) {
    let num1, num2, difference;
    do {
      num1 = Math.floor(Math.random() * 6); // 0–5
      num2 = Math.floor(Math.random() * (num1 + 1)); // 0 to num1
      difference = num1 - num2;
    } while (difference > 5);
    return { num1, num2, answer: difference };
  } else {
    let num1, num2, difference;
    do {
      num1 = Math.floor(Math.random() * 11); // 0–10
      num2 = Math.floor(Math.random() * (num1 + 1)); // 0 to num1
      difference = num1 - num2;
    } while (difference > 10);
    return { num1, num2, answer: difference };
  }
};

const SubtractionPractice = () => {
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [taskCount, setTaskCount] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [language, setLanguage] = useState("en");
const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await getLanguagePreference(userId);
        console.log("lang", response.data.data.language);
        if (response.data.status === "success") {
          setLanguage(response.data.data.language);
        }
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 500) {
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [userId]);

  const addProgress = useProgressStore((state) => state.addProgress);

  const goToDashboard = () => {
    navigate("/math/mathdashboard");
  };

  const startCountdown = () => {
    setCountdown(5);
    setIsCapturing(true);
    setIsChecking(false);

    let count = 5;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        console.log(
          "[startCountdown] Countdown complete, waiting for user input"
        );
        setTimeout(() => {
          setIsChecking(true);
        }, 3000);
      }
    }, 1000);
  };

  const playAudioSequence = (task, callback) => {
    const numberSounds =
      language === "si" ? numberSoundsSinhala : numberSoundsEnglish;
    const firstNumberAudio = new Audio(numberSounds[task.num1]);
    const minusAudioFile = new Audio(
      language === "si" ? substractSinhala : substractEnglish
    );
    const secondNumberAudio = new Audio(numberSounds[task.num2]);
    const whatIsTheAnswerAudioFile = new Audio(
      language === "si"
        ? whatIstheAnswerAudioSinhala
        : whatIstheAnswerAudioEnglish
    );

    // Preload audio files to avoid delays
    [
      firstNumberAudio,
      minusAudioFile,
      secondNumberAudio,
      whatIsTheAnswerAudioFile,
    ].forEach((audio) => {
      audio.preload = "auto";
      audio.load(); // Force preload
    });

    // Function to play audio with error handling and fallback
    const playWithFallback = (audio, next, timeout = 5000) => {
      audio.play().catch((error) => {
        console.error(`Audio play error for ${audio.src}:`, error);
        // Proceed to next audio after a short delay if playback fails
        setTimeout(next, 500);
      });
      // Fallback: If onended doesn't fire within timeout, proceed to next
      const timeoutId = setTimeout(() => {
        console.warn(
          `Timeout waiting for ${audio.src} to end, proceeding to next.`
        );
        next();
      }, timeout);
      audio.onended = () => {
        clearTimeout(timeoutId);
        next();
      };
    };

    // Play audio sequence
    playWithFallback(secondNumberAudio, () => {
      playWithFallback(minusAudioFile, () => {
        playWithFallback(firstNumberAudio, () => {
          playWithFallback(whatIsTheAnswerAudioFile, callback);
        });
      });
    });
  };

  const startPractice = () => {
    const newTask = generateTask(taskCount);
    console.log(
      `[startPractice] Generated task #${taskCount}: ${JSON.stringify(newTask)}`
    );
    setCurrentTask(newTask);
    setFinalPrediction("");
    setIsCorrect(false);

    playAudioSequence(newTask, startCountdown);
  };

  const retryPractice = () => {
    setFinalPrediction("");
    console.log(
      `[retryPractice] Retrying task: ${JSON.stringify(currentTask)}`
    );

    playAudioSequence(currentTask, startCountdown);
  };

  const checkResult = async (targetTask) => {
    console.log("[checkResult] Fetching finger count from API");
    const result = await fetchFingerCount();

    if (result.error) {
      console.error("[checkResult] Error fetching finger count:", result.error);
      setIsCapturing(false);
      setIsChecking(false);
      Swal.fire({
        title: translations[language].errorTitle,
        text: translations[language].errorText,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const { userPrediction, confidence } = result;
    console.log(
      `[checkResult] Fetched finger count: ${userPrediction}, Confidence: ${confidence}`
    );
    setFinalPrediction(userPrediction);
    setIsCapturing(false);
    setIsChecking(false);

    const targetAnswer = targetTask.answer;
    const isAnswerCorrect =
      userPrediction === targetAnswer && confidence >= 0.8;
    setIsCorrect(isAnswerCorrect);
    console.log(
      `[checkResult] Comparison result: ${isAnswerCorrect} (Target: ${targetAnswer}, User: ${userPrediction}, Conf: ${confidence})`
    );

    addProgress("Subtraction", isAnswerCorrect);
    if (isAnswerCorrect) {
      setTaskCount(taskCount + 1);
      showSuccessAlert(translations, language);
    } else {
      showFailureAlert(
        translations,
        language,
        confidence,
        targetAnswer,
        userPrediction
      );
    }
  };

  useEffect(() => {
    if (isChecking && currentTask !== null) {
      checkResult(currentTask);
    }
  }, [isChecking, currentTask]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundImage:
          window.innerWidth >= 640 ? `url(${backgroundImg})` : "none",
      }}
    >
      <button
        onClick={goToDashboard}
        className="absolute top-4 left-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition z-50"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-4 lg:gap-10 lg:mt-4">
        <div className="flex flex-col items-center w-full lg:w-1/2 rounded-2xl p-6 sm:p-8 overflow-visible">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-700 drop-shadow-md">
              - {translations[language].title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              {translations[language].instructions}
            </p>
          </div>

          {!currentTask || isCorrect ? (
            <button
              onClick={startPractice}
              disabled={isCapturing}
              className="w-full min-w-[200px] max-w-[250px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 z-10"
            >
              {isCorrect
                ? translations[language].nextQuestionButton
                : translations[language].startButton}
            </button>
          ) : (
            <button
              onClick={retryPractice}
              disabled={isCapturing}
              className="w-full min-w-[200px] max-w-[250px] px-8 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 z-10"
            >
              🔄 {translations[language].tryAgainButton}
            </button>
          )}

          {currentTask && (
            <div className="mt-4 animate-bounce-in w-full flex justify-center">
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                <img
                  src={numberImages[currentTask.num1]}
                  alt={`Number ${currentTask.num1}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[160px] lg:h-[150px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => playSound(currentTask.num1, language)}
                />
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-600">
                  -
                </span>
                <img
                  src={numberImages[currentTask.num2]}
                  alt={`Number ${currentTask.num2}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[160px] lg:h-[150px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => playSound(currentTask.num2, language)}
                />
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-600">
                  = ?
                </span>
              </div>
            </div>
          )}

          {countdown !== null && countdown > 0 && (
            <div className="mt-4 text-lg sm:text-xl font-semibold text-indigo-600 animate-pulse">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mt-[-100px] lg:mt-0 ml-[60px]">
          <FingerCountingFeed />
        </div>
      </div>
    </div>
  );
};

export default SubtractionPractice;
