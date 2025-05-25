import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useProgressStore from '../maths/store/progressStore';
import useLanguageStore from '../maths/store/languageStore';
import { showSuccessAlert, showFailureAlert } from '../maths/components/ResponseModal';
import FingerCountingFeed from './components/FingerCountingFeed';
import "./PracticeAnimations.css";
import plusAudioSinhala from '../maths/sounds/plus.mp3';
import plusAudioEnglish from '../maths/sounds/plus.m4a';
import whatIstheAnswerAudioSinhala from '../maths/sounds/S-SonAnswer.m4a';
import whatIstheAnswerAudioEnglish from '../maths/sounds/answerIs.m4a';
import backgroundImg from "../../../public/images/practiceBg2.jpg";
import { useNavigate } from "react-router-dom";
import { fetchFingerCount } from './services/fingerCountingService';
import {
  getLanguagePreference,  
} from "../../services/languageService";


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
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

// Sinhala number sounds
const numberSoundsSinhala = {
  0: sound0, 1: sound1, 2: sound2, 3: sound3, 4: sound4,
  5: sound5, 6: sound6, 7: sound7, 8: sound8, 9: sound9, 10: sound10
};

// English number sounds
const numberSoundsEnglish = {
  0: soundEN0, 1: soundEN1, 2: soundEN2, 3: soundEN3, 4: soundEN4,
  5: soundEN5, 6: soundEN6, 7: soundEN7, 8: soundEN8, 9: soundEN9, 10: soundEN10
};

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Addition Practice",
    instructions: "Show the sum with your fingers!",
    startButton: "Start Practice",
    tryAgainButton: "Try Again",
    nextQuestionButton: "Next Question",
    countdown: "Starting in: {count}s",
    successTitle: "Correct Answer!",
    successText: "Well Done!",
    failureTitle: "Incorrect!",
    failureText: "Try Again!",
    failureLowConfidence: "Try Again! (Hold your hand steady for a higher confidence score)",
    failureWrongNumber: "You showed {userPrediction}, but the correct number was {targetNumber}.",
    errorTitle: "Error",
    errorText: "Failed to fetch finger count. Please try again.",
  },
  si: {
    title: "එකතු කිරීම පුහුණුව",
    instructions: "එකතුව ඔබේ ඇඟිලිවලින් පෙන්වන්න!",
    startButton: "පුහුණුව ආරම්භ කරන්න",
    tryAgainButton: "නැවත උත්සාහ කරන්න",
    nextQuestionButton: "ඊළඟ ප්‍රශ්නය",
    countdown: "ආරම්භ වන්නේ: {count} තත්පරයකින්",
    successTitle: "නිවැරදි පිළිතුර!",
    successText: "හොඳින් කළා!",
    failureTitle: "වැරදියි!",
    failureText: "නැවත උත්සාහ කරන්න!",
    failureLowConfidence: "නැවත උත්සාහ කරන්න! (වැඩි විශ්වාස ප්‍රමාණයක් සඳහා ඔබේ අත ස්ථිරව තබා ගන්න)",
    failureWrongNumber: "ඔබ පෙන්වූයේ {userPrediction}, නමුත් නිවැරදි ඉලක්කම වූයේ {targetNumber}.",
    errorTitle: "දෝෂය",
    errorText: "ඇඟිලි ගණන ලබා ගැනීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න。",
  },
};

const playSound = (number, language) => {
  const numberSounds = language === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
  const audio = new Audio(numberSounds[number]);
  audio.play().catch((error) => console.log("Audio play error:", error));
};

// Initial easy tasks for the first 5 questions
const initialEasyTasks = [
  { num1: 0, num2: 1, answer: 1 },
  { num1: 1, num2: 1, answer: 2 },
  { num1: 2, num2: 0, answer: 2 },
  { num1: 1, num2: 2, answer: 3 },
  { num1: 3, num2: 0, answer: 3 }
];

// Generate a random task based on taskCount
const generateTask = (taskCount) => {
  if (taskCount <= 5) {
    return initialEasyTasks[taskCount - 1];
  } else if (taskCount <= 10) {
    const num1 = Math.floor(Math.random() * 6);
    const maxNum2 = Math.min(5 - num1, 5);
    const num2 = Math.floor(Math.random() * (maxNum2 + 1));
    return { num1, num2, answer: num1 + num2 };
  } else {
    const num1 = Math.floor(Math.random() * 11);
    const maxNum2 = Math.min(10 - num1, 10);
    const num2 = Math.floor(Math.random() * (maxNum2 + 1));
    return { num1, num2, answer: num1 + num2 };
  }
};

const AdditionPractice = () => {
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [taskCount, setTaskCount] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [language, setLanguage] = useState("en");
 
   const userId = localStorage.getItem("userid");
 
  useEffect(() => {
     const fetchLanguage = async () => {
       try {
         const response = await getLanguagePreference(userId);
         console.log("lang",response.data.data.language)
         if (response.data.status === "success") {
           setLanguage(response.data.data.language)
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
        console.log("[startCountdown] Countdown complete, waiting for user input");
        setTimeout(() => {
          setIsChecking(true);
        }, 3000);
      }
    }, 1000);
  };

  const startPractice = () => {
    const newTask = generateTask(taskCount);
    console.log(`[startPractice] Generated task #${taskCount}: ${JSON.stringify(newTask)}`);
    setCurrentTask(newTask);
    setFinalPrediction("");
    setIsCorrect(false);

    const playAudioSequence = () => {
      const numberSounds = language === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
      const firstNumberAudio = new Audio(numberSounds[newTask.num1]);
      const plusAudioFile = new Audio(language === 'si' ? plusAudioSinhala : plusAudioEnglish);
      const secondNumberAudio = new Audio(numberSounds[newTask.num2]);
      const whatIsTheAnswerAudioFile = new Audio(language === 'si' ? whatIstheAnswerAudioSinhala : whatIstheAnswerAudioEnglish);

      firstNumberAudio.play().catch((error) => console.log("First number audio error:", error));
      firstNumberAudio.onended = () => {
        plusAudioFile.play().catch((error) => console.log("Plus audio error:", error));
      };
      plusAudioFile.onended = () => {
        secondNumberAudio.play().catch((error) => console.log("Second number audio error:", error));
      };
      secondNumberAudio.onended = () => {
        whatIsTheAnswerAudioFile.play().catch((error) => console.log("What is the answer audio error:", error));
        whatIsTheAnswerAudioFile.onended = () => {
          startCountdown();
        };
      };
    };

    playAudioSequence();
  };

  const retryPractice = () => {
    setFinalPrediction("");
    console.log(`[retryPractice] Retrying task: ${JSON.stringify(currentTask)}`);

    const playAudioSequence = () => {
      const numberSounds = language === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
      const firstNumberAudio = new Audio(numberSounds[currentTask.num1]);
      const plusAudioFile = new Audio(language === 'si' ? plusAudioSinhala : plusAudioEnglish);
      const secondNumberAudio = new Audio(numberSounds[currentTask.num2]);
      const whatIsTheAnswerAudioFile = new Audio(language === 'si' ? whatIstheAnswerAudioSinhala : whatIstheAnswerAudioEnglish);

      firstNumberAudio.play().catch((error) => console.log("First number audio error:", error));
      firstNumberAudio.onended = () => {
        plusAudioFile.play().catch((error) => console.log("Plus audio error:", error));
      };
      plusAudioFile.onended = () => {
        secondNumberAudio.play().catch((error) => console.log("Second number audio error:", error));
      };
      secondNumberAudio.onended = () => {
        whatIsTheAnswerAudioFile.play().catch((error) => console.log("What is the answer audio error:", error));
        whatIsTheAnswerAudioFile.onended = () => {
          startCountdown();
        };
      };
    };

    playAudioSequence();
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
    console.log(`[checkResult] Fetched finger count: ${userPrediction}, Confidence: ${confidence}`);
    setFinalPrediction(userPrediction);
    setIsCapturing(false);
    setIsChecking(false);

    const targetAnswer = targetTask.answer;
    const isAnswerCorrect = userPrediction === targetAnswer && confidence >= 0.8;
    setIsCorrect(isAnswerCorrect);
    console.log(`[checkResult] Comparison result: ${isAnswerCorrect} (Target: ${targetAnswer}, User: ${userPrediction}, Conf: ${confidence})`);

    addProgress("Addition", isAnswerCorrect);
    if (isAnswerCorrect) {
      setTaskCount(taskCount + 1);
      showSuccessAlert(translations, language);
    } else {
      showFailureAlert(translations, language, confidence, targetAnswer, userPrediction);
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
        backgroundImage: window.innerWidth >= 640 ? `url(${backgroundImg})` : 'none',
      }}
    >
      <button
        onClick={goToDashboard}
        className="absolute top-4 left-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition z-50"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-4 lg:gap-10">
        <div className="flex flex-col items-center w-full lg:w-1/2 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-700 drop-shadow-md">
              + {translations[language].title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              {translations[language].instructions}
            </p>
          </div>

          {!currentTask || isCorrect ? (
            <button
              onClick={startPractice}
              disabled={isCapturing}
              className="w-full max-w-[250px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isCorrect ? translations[language].nextQuestionButton : translations[language].startButton}
            </button>
          ) : (
            <button
              onClick={retryPractice}
              disabled={isCapturing}
              className="w-full max-w-[250px] px-8 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">+</span>
                <img
                  src={numberImages[currentTask.num2]}
                  alt={`Number ${currentTask.num2}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[160px] lg:h-[150px] object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => playSound(currentTask.num2, language)}
                />
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">= ?</span>
              </div>
            </div>
          )}

          {countdown !== null && countdown > 0 && (
            <div className="mt-4 text-lg sm:text-xl font-semibold text-indigo-600 animate-pulse">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center mt-[-130px] ml-[60px] lg:mt-0">
          <FingerCountingFeed />
        </div>
      </div>
    </div>
  );
};

export default AdditionPractice;