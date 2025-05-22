import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore';
import useLanguageStore from '../maths/store/languageStore';
import { showSuccessAlert, showFailureAlert } from '../maths/ResponseModal';
import "./PracticeAnimations.css";
import blankAnswerAudio from '../maths/sounds/SNextAnswer.m4a';
import blankAnswerAudioEnglish from '../maths/sounds/WhatistheNextAnswer.m4a';
import backgroundImg from "../../../public/images/practiceBg2.jpg";
import { useNavigate } from "react-router-dom";

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
  const { language } = useLanguageStore();
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
    try {
      const response = await fetch("http://localhost:5000/finger_counting/count");
      const data = await response.json();
      const userPrediction = data.finger_count;
      const confidence = data.confidence;

      setFinalPrediction(userPrediction);
      setIsCapturing(false);
      setIsChecking(false);

      const isAnswerCorrect = userPrediction === targetSequence.answer && confidence >= 0.8;
      setIsCorrect(isAnswerCorrect);

      addProgress("Sequence", isAnswerCorrect); // Updated to use "Sequence" as subSkill and boolean for score
      if (isAnswerCorrect) {
        showSuccessAlert(translations, language);
      } else {
        showFailureAlert(translations, language, confidence, targetSequence.answer, userPrediction);
      }
    } catch (error) {
      console.error("Error fetching finger count:", error);
      setIsCapturing(false);
      setIsChecking(false);

      Swal.fire({
        title: translations[language].errorTitle,
        text: translations[language].errorText,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    if (isChecking && selectedSequence !== null) {
      checkResult(selectedSequence);
    }
  }, [isChecking, selectedSequence]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <button
        onClick={goToDashboard}
        className="absolute top-4 left-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition z-50"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        <div className="flex flex-col items-center lg:w-1/2 rounded-2xl p-8 transform transition-all">
          <div className="text-center mt-8">
            <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">
              {translations[language].title}
            </h2>
            <p className="text-lg text-gray-600">
              {translations[language].instructions}
            </p>
          </div>

          {!selectedSequence || isCorrect ? (
            <button
              onClick={startPractice}
              disabled={isCapturing}
              className="w-[200px] px-8 py-2 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-center rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              📸 {isCorrect ? translations[language].nextQuestionButton : translations[language].startButton}
            </button>
          ) : (
            <button
              onClick={retryPractice}
              disabled={isCapturing}
              className="w-[200px] px-8 py-2 mt-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold text-center rounded-lg shadow-md hover:from-red-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              🔄 {translations[language].tryAgainButton}
            </button>
          )}

          {selectedSequence && (
            <div className="mt-3">
              <div className="flex justify-center items-center gap-8">
                {selectedSequence.sequence.map((num, index) =>
                  num === "?" ? (
                    <div
                      key={index}
                      className="w-36 h-36 flex items-center justify-center bg-gradient-to-r from-red-300 to-orange-400 rounded-lg text-6xl font-extrabold text-white shadow-lg"
                    >
                      ?
                    </div>
                  ) : (
                    <img
                      key={index}
                      src={numberImages[num]}
                      alt={`Number ${num}`}
                      className="w-36 h-36 object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => playSound(num)}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {countdown !== null && countdown > 0 && (
            <div className="mt-6 text-2xl font-semibold text-indigo-600">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}

          {finalPrediction !== "" && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-purple-700">
                {translations[language].youShowed.replace("{prediction}", finalPrediction)}
              </h2>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 flex justify-center mt-[100px] mr-10">
          <img
            src="http://localhost:5000/finger_counting/feed"
            alt="Finger counting feed"
            className="w-full max-w-2xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400"
          />
        </div>
      </div>
    </div>
  );
};

export default SequencePractice;