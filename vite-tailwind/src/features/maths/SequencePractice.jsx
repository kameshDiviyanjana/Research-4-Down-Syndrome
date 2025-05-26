import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore';
import useLanguageStore from '../maths/store/languageStore';
import { showSuccessAlert, showFailureAlert } from '../maths/components/ResponseModal';
import FingerCountingFeed from './components/FingerCountingFeed';
import { fetchFingerCount } from './services/fingerCountingService';
import "./PracticeAnimations.css";
import blankAnswerAudio from '../maths/sounds/SNextAnswer.m4a';
import blankAnswerAudioEnglish from '../maths/sounds/WhatistheNextAnswer.m4a';
import backgroundImg from "../../../public/images/practiceBg2.jpg";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
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

const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

const translations = {
  en: {
    title: "Sequence Practice",
    instructions: "Show the missing number with your fingers!",
    startButton: "Start Practice",
    tryAgainButton: "Try Again",
    nextQuestionButton: "Next Question",
    countdown: "Starting in: {count}s",
    youShowed: "You showed: {prediction}",
    errorTitle: "Error",
    errorText: "Failed to fetch finger count. Please try again.",
    successTitle: "Great Job!",
    successText: "You showed the correct number!",
    failureTitle: "Try Again!",
    failureText: "Something went wrong. Please try again.",
    failureLowConfidence: "Your hand gesture was not clear. Try showing the number clearly.",
    failureWrongNumber: "You showed {userPrediction}, but the correct number was {targetNumber}.",
  },
  si: {
    title: "අනුක්‍රම පුහුණුව",
    instructions: "නැති ඉලක්කම ඔබේ ඇඟිලිවලින් පෙන්වන්න!",
    startButton: "පුහුණුව ආරම්භ කරන්න",
    tryAgainButton: "නැවත උත්සාහ කරන්න",
    nextQuestionButton: "ඊළඟ ප්‍රශ්නය",
    countdown: "ආරම්භ වන්නේ: {count} තත්පරයකින්",
    youShowed: "ඔබ පෙන්වූයේ: {prediction}",
    errorTitle: "දෝෂය",
    errorText: "ඇඟිලි ගණන ලබා ගැනීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න。",
    successTitle: "සුපිරි වැඩක්!",
    successText: "ඔබ නිවැරදි ඉලක්කම පෙන්වූවා!",
    failureTitle: "නැවත උත්සාහ කරන්න!",
    failureText: "යම් දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න。",
    failureLowConfidence: "ඔබේ අත් ඉරියව්ව පැහැදිලි නැත. ඉලක්කම පැහැදිලිව පෙන්වන්න.",
    failureWrongNumber: "ඔබ පෙන්වූයේ {userPrediction}, නමුත් නිවැරදි ඉලක්කම වූයේ {targetNumber}.",
  },
};

// Function to generate a simple consecutive sequence example (max 10)
const generateRandomExample = (exampleCount) => {
  const normalizedCount = ((exampleCount - 1) % 20) + 1;
  const baseSequences05 = [
    { sequence: [0, null, 2], answer: 1 },
    { sequence: [1, null, 3], answer: 2 },
    { sequence: [2, null, 4], answer: 3 },
    { sequence: [3, null, 5], answer: 4 },
    { sequence: [4, null, 6], answer: 5 },
  ];
  const reverseSequences05 = [
    { sequence: [4, null, 2], answer: 3 },
    { sequence: [5, null, 3], answer: 4 },
    { sequence: [4, null, 2], answer: 3 },
    { sequence: [3, null, 1], answer: 2 },
    { sequence: [2, null, 0], answer: 1 },
  ];
  const baseSequences610 = [
    { sequence: [6, null, 8], answer: 7 },
    { sequence: [7, null, 9], answer: 8 },
    { sequence: [8, null, 10], answer: 9 },
    { sequence: [8, null, 10], answer: 9 },
  ];
  const reverseSequences610 = [
    { sequence: [9, null, 7], answer: 8 },
    { sequence: [10, null, 8], answer: 9 },
    { sequence: [9, null, 7], answer: 8 },
    { sequence: [8, null, 6], answer: 7 },
    { sequence: [10, null, 8], answer: 9 },
  ];

  if (normalizedCount <= 5) {
    return { ...baseSequences05[normalizedCount - 1] };
  } else if (normalizedCount <= 10) {
    return { ...reverseSequences05[normalizedCount - 6] };
  } else if (normalizedCount <= 15) {
    return { ...baseSequences610[normalizedCount - 11] };
  } else {
    return { ...reverseSequences610[normalizedCount - 16] };
  }
};

const playSound = (number) => {
  setTimeout(() => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
  }, 3000);
};

const SequencePractice = () => {
  const navigate = useNavigate();
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [exampleCount, setExampleCount] = useState(1);
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
        setTimeout(() => setIsChecking(true), 3000);
      }
    }, 1000);
  };

  const startPractice = () => {
    const nextCount = exampleCount + 1;
    const targetSequence = generateRandomExample(nextCount);
    const displaySequence = targetSequence.sequence.map(num => num === null ? "?" : num);

    setSelectedSequence({ sequence: displaySequence, answer: targetSequence.answer });
    setExampleCount(nextCount);
    setFinalPrediction("");
    setIsCorrect(false);

    const audioFile = language === 'si' ? blankAnswerAudio : blankAnswerAudioEnglish;
    const audio = new Audio(audioFile);
    audio.play().then(() => {
      audio.onended = () => {
        startCountdown();
      };
    }).catch((error) => {
      console.log("Audio play error:", error);
      startCountdown();
    });
  };

  const retryPractice = () => {
    setFinalPrediction("");
    const audioFile = language === 'si' ? blankAnswerAudio : blankAnswerAudioEnglish;
    const audio = new Audio(audioFile);
    audio.play().then(() => {
      audio.onended = () => {
        startCountdown();
      };
    }).catch((error) => {
      console.log("Audio play error:", error);
      startCountdown();
    });
  };

  const checkResult = async (targetSequence) => {
    const result = await fetchFingerCount();

    if (result.error) {
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
    setFinalPrediction(userPrediction);
    setIsCapturing(false);
    setIsChecking(false);

    const isAnswerCorrect = userPrediction === targetSequence.answer && confidence >= 0.8;
    setIsCorrect(isAnswerCorrect);

    addProgress("Sequence", isAnswerCorrect);
    if (isAnswerCorrect) {
      showSuccessAlert(translations, language);
    } else {
      showFailureAlert(translations, language, confidence, targetSequence.answer, userPrediction);
    }
  };

  useEffect(() => {
    if (isChecking && selectedSequence !== null) {
      checkResult(selectedSequence);
    }
  }, [isChecking, selectedSequence]);

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

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-4 lg:gap-10 lg:mt-4">
        <div className="flex flex-col items-center w-full lg:w-1/2 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-700 drop-shadow-md">
              {translations[language].title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              {translations[language].instructions}
            </p>
          </div>

          {!selectedSequence || isCorrect ? (
            <button
              onClick={startPractice}
              disabled={isCapturing}
              className="w-full max-w-[250px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              📸 {isCorrect ? translations[language].nextQuestionButton : translations[language].startButton}
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

        {selectedSequence && (
  <div className="mt-4 animate-bounce-in w-full flex justify-center">
    <div className="flex flex-row justify-center items-center gap-4 sm:gap-8">
      {selectedSequence.sequence.map((num, index) =>
        num === "?" ? (
          <div
            key={index}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 flex items-center justify-center border-2 border-gray-300 rounded-full"
          >
            <AiOutlineQuestionCircle className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 text-purple-600" />
          </div>
        ) : (
          <img
            key={index}
            src={numberImages[num]}
            alt={`Number ${num}`}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => playSound(num)}
          />
        )
      )}
    </div>
  </div>
)}
          {countdown !== null && countdown > 0 && (
            <div className="mt-4 text-lg sm:text-xl font-semibold text-indigo-600 animate-pulse">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}

          {finalPrediction !== "" && (
            <div className="mt-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-700 text-center">
                {translations[language].youShowed.replace("{prediction}", finalPrediction)}
              </h2>
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

export default SequencePractice;