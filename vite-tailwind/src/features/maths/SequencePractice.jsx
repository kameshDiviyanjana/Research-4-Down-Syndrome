import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SmileImage from '../../../src/assets/smile.jpg';
import useProgressStore from '../maths/store/progressStore';
import useLanguageStore from '../maths/store/languageStore';
import { showSuccessAlert, showFailureAlert } from '../maths/ResponseModal'; // ✅ Using imported alerts
import "./PracticeAnimations.css";
import blankAnswerAudio from '../maths/sounds/blnk_answer.mp3';
import backgroundImg from "../../../public/images/practiceBg2.jpg";

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

const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9
};

const translations = {
  en: {
    title: "Sequence Practice",
    instructions: "Show the missing number with your fingers!",
    startButton: "Start Practice",
    countdown: "Starting in: {count}s",
    youShowed: "You showed: {prediction}",
    errorTitle: "Error",
    errorText: "Failed to fetch finger count. Please try again.",
  },
  si: {
    title: "අනුක්‍රම පුහුණුව",
    instructions: "නැති ඉලක්කම ඔබේ ඇඟිලිවලින් පෙන්වන්න!",
    startButton: "පුහුණුව ආරම්භ කරන්න",
    countdown: "ආරම්භ වන්නේ: {count} තත්පරයකින්",
    youShowed: "ඔබ පෙන්වූයේ: {prediction}",
    errorTitle: "දෝෂය",
    errorText: "ඇඟිලි ගණන ලබා ගැනීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න。",
  },
};

const sequences = [
  { sequence: [2, 3, 4, "?"], answer: 5 },
  { sequence: [2, "?", 6, 8, 10], answer: 4 },
  { sequence: [3, 4, "?"], answer: 5 },
];

const playSound = (number) => {
  const audio = new Audio(`/sounds/${number}.mp3`);
  audio.play().catch((error) => console.log("Audio play error:", error));
};

const SequencePractice = () => {
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { language } = useLanguageStore();
  const addProgress = useProgressStore((state) => state.addProgress);

  const startPractice = () => {
    const audio = new Audio(blankAnswerAudio);
    audio.play().catch((error) => console.log("Audio play error:", error));

    const randomIndex = Math.floor(Math.random() * sequences.length);
    const targetSequence = sequences[randomIndex];

    setSelectedSequence(targetSequence);
    setFinalPrediction("");
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

  const checkResult = async (targetSequence) => {
    try {
      const response = await fetch("http://localhost:5000/finger_counting/count");
      const data = await response.json();
      const userPrediction = data.finger_count;
      const confidence = data.confidence;

      setFinalPrediction(userPrediction);
      setIsCapturing(false);
      setIsChecking(false);

      const isCorrect = userPrediction === targetSequence.answer && confidence >= 0.8;

      addProgress("SequencePractice", isCorrect ? 1 : 0);
      isCorrect
        ? showSuccessAlert(language)
        : showFailureAlert(language, confidence);
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        <div className="flex flex-col items-center lg:w-1/2 rounded-2xl p-8 transform transition-all hover:scale-105">
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-4xl font-bold text-indigo-700 drop-shadow-md">
              {translations[language].title}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              {translations[language].instructions}
            </p>
          </div>

          <button
            onClick={startPractice}
            disabled={isCapturing}
            className="w-[200px] px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-center rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            📸 {translations[language].startButton}
          </button>

          {selectedSequence && (
            <div className="mt-8 animate-bounce-in">
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
            <div className="mt-6 text-2xl font-semibold text-indigo-600 animate-pulse">
              {translations[language].countdown.replace("{count}", countdown)}
            </div>
          )}

          {finalPrediction !== "" && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-purple-700">
                {translations[language].youShowed.replace("{prediction}", finalPrediction)}
              </h2>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 flex justify-center">
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
