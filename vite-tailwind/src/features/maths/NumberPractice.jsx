import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useProgressStore from '../maths/store/progressStore';
import useLanguageStore from '../maths/store/languageStore';
import { showSuccessAlert, showFailureAlert } from '../maths/components/ResponseModal'; 
import FingerCountingFeed from './components/FingerCountingFeed';
import "./PracticeAnimations.css";
import backgroundImg from "../../../public/images/practiceBg2.jpg";
import { fetchFingerCount } from './services/fingerCountingService';

// Images
import SmileImage from '../../../src/assets/smile.jpg';
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

// Sinhala sounds
import S0Finger from '../maths/sounds/S0Finger.m4a';
import S1Finger from '../maths/sounds/S1Finger.m4a';
import S2Finger from '../maths/sounds/S2Finger.m4a';
import S3Finger from '../maths/sounds/S3Finger.m4a';
import S4Finger from '../maths/sounds/S4Finger.m4a';
import S5Finger from '../maths/sounds/S5Finger.m4a';
import S6Finger from '../maths/sounds/S6Finger.m4a';
import S7Finger from '../maths/sounds/S7Finger.m4a';
import S8Finger from '../maths/sounds/S8Finger.m4a';
import S9Finger from '../maths/sounds/S9Finger.m4a';
import S10Finger from '../maths/sounds/S10Finger.m4a';

// English sounds
import R0Finger from '../maths/sounds/R0Finger.m4a';
import R1Finger from '../maths/sounds/R1Finger.m4a';
import R2Finger from '../maths/sounds/R2Finger.m4a';
import R3Finger from '../maths/sounds/R3Finger.m4a';
import R4Finger from '../maths/sounds/R4Finger.m4a';
import R5Finger from '../maths/sounds/R5Finger.m4a';
import R6Finger from '../maths/sounds/R6Finger.m4a';
import R7Finger from '../maths/sounds/R7Finger.m4a';
import R8Finger from '../maths/sounds/R8Finger.m4a';
import R9Finger from '../maths/sounds/R9Finger.m4a';
import R10Finger from '../maths/sounds/R10Finger.m4a';

const numberImages = { 
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4, 5: num5,
  6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

const translations = {
  en: {
    title: "Number Practice",
    instructions: "Show the number with your fingers!",
    startButton: "Start Practice",
    countdown: "Starting in: {count}s",
    successTitle: "Correct Answer!",
    successText: "Well Done!",
    failureTitle: "Incorrect!",
    failureText: "Try Again!",
    failureLowConfidence: "Hold your hand steady for a higher confidence score.",
    failureWrongNumber: "You showed {userPrediction}, but the correct number is {targetNumber}. Try again!",
    errorTitle: "Error",
    errorText: "Failed to fetch finger count. Please try again.",
  },
  si: {
    title: "ඉලක්කම් පුහුණුව",
    instructions: "ඉලක්කම ඔබේ ඇඟිලිවලින් පෙන්වන්න!",
    startButton: "පුහුණුව ආරම්භ කරන්න",
    countdown: "ආරම්භ වන්නේ: {count} තත්පරයකින්",
    successTitle: "නිවැරදි පිළිතුර!",
    successText: "හොඳින් කළා!",
    failureTitle: "වැරදියි!",
    failureText: "නැවත උත්සාහ කරන්න!",
    failureLowConfidence: "වැඩි විශ්වාස ප්‍රමාණයක් සඳහා ඔබේ අත ස්ථිරව තබා ගන්න。",
    failureWrongNumber: "ඔබ පෙන්වූයේ {userPrediction}, නමුත් නිවැරදි ඉලක්කම {targetNumber}. නැවත උත්සාහ කරන්න!",
    errorTitle: "දෝෂය",
    errorText: "ඇඟිලි ගණන ලබා ගැනීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න。",
  },
};

const sinhalaSounds = {
  0: S0Finger, 1: S1Finger, 2: S2Finger, 3: S3Finger, 4: S4Finger, 5: S5Finger,
  6: S6Finger, 7: S7Finger, 8: S8Finger, 9: S9Finger, 10: S10Finger,
};

const englishSounds = {
  0: R0Finger, 1: R1Finger, 2: R2Finger, 3: R3Finger, 4: R4Finger, 5: R5Finger,
  6: R6Finger, 7: R7Finger, 8: R8Finger, 9: R9Finger, 10: R10Finger,
};

const playSound = (number, language, onEnded) => {
  const soundMap = language === 'si' ? sinhalaSounds : englishSounds;
  const audioFile = soundMap[number];

  if (audioFile) {
    const audio = new Audio(audioFile);
    audio.play()
      .then(() => {
        audio.onended = () => {
          if (typeof onEnded === "function") onEnded();
        };
      })
      .catch((error) => {
        console.error(`[playSound] Error playing sound for number ${number}:`, error);
        if (typeof onEnded === "function") onEnded();
      });
  } else if (typeof onEnded === "function") {
    onEnded();
  }
};

const NumberPractice = () => {
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { language } = useLanguageStore();
  const addProgress = useProgressStore((state) => state.addProgress);

  const goToDashboard = () => {
    navigate("/math/mathdashboard");
  };

  const startPractice = () => {
    const newNumber = isRandomMode ? Math.floor(Math.random() * 11) : currentNumber;
    setCurrentNumber(newNumber);
    setFinalPrediction("");
    setIsCapturing(true);
    setIsChecking(false);

    playSound(newNumber, language, () => {
      let count = 5;
      setCountdown(count);
      const countdownInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count === 0) {
          clearInterval(countdownInterval);
          setTimeout(() => setIsChecking(true), 3000);
        }
      }, 1000);
    });
  };

  const checkResult = async (targetNumber) => {
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
    setFinalPrediction(userPrediction);
    setIsCapturing(false);
    setIsChecking(false);

    const isCorrect = userPrediction === targetNumber && confidence >= 0.8;
    if (isCorrect) {
      addProgress("Number", true);
      showSuccessAlert(translations, language);
      if (!isRandomMode && targetNumber === 10) {
        setIsRandomMode(true);
        setCurrentNumber(null);
      } else if (!isRandomMode) {
        setCurrentNumber((prev) => prev + 1);
      }
    } else {
      addProgress("Number", false);
      showFailureAlert(translations, language, confidence, targetNumber, userPrediction);
    }
  };

  useEffect(() => {
    if (isChecking && currentNumber !== null) {
      checkResult(currentNumber);
    }
  }, [isChecking, currentNumber]);

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <button
        onClick={goToDashboard}
        className="absolute top-4 left-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
      >
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10 mt-5">
        <div className="flex flex-col items-center lg:w-1/2 rounded-2xl p-8">
          <div className="text-center mb-2 animate-fade-in mt-[100px]">
            <h2 className="text-2xl font-bold text-indigo-700">
              {translations[language].title}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              {translations[language].instructions}
            </p>
          </div>

          <button 
            onClick={startPractice} 
            disabled={isCapturing}
            className="w-[250px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 transition-all"
          >
            {translations[language].startButton}
          </button>

          {currentNumber !== null && (
            <div className="mt-4 animate-bounce-in">
              <img 
                src={numberImages[currentNumber]} 
                alt={`Show this number: ${currentNumber}`} 
                className="w-50 h-60 object-contain cursor-pointer"
                onClick={() => playSound(currentNumber, language)}
              />
            </div>
          )}

          {countdown !== null && countdown > 0 && (
            <div className="mt-4 text-xl font-semibold text-indigo-600 animate-pulse">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}
        </div>

        <FingerCountingFeed />
      </div>
    </div>
  );
};

export default NumberPractice;