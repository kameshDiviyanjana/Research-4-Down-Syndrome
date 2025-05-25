import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../../../public/images/bg4.jpg";
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
import ESound0 from "../maths/sounds/E0.m4a";
import ESound1 from "../maths/sounds/E1.m4a";
import ESound2 from "../maths/sounds/E2.m4a";
import ESound3 from "../maths/sounds/E3.m4a";
import ESound4 from "../maths/sounds/E4.m4a";
import ESound5 from "../maths/sounds/E5.m4a";
import ESound6 from "../maths/sounds/E6.m4a";
import ESound7 from "../maths/sounds/E7.m4a";
import ESound8 from "../maths/sounds/E8.m4a";
import ESound9 from "../maths/sounds/E9.m4a";
import ESound10 from "../maths/sounds/E10.m4a";

import {
  getLanguagePreference,
  saveLanguagePreference,
  updateLanguagePreference,
} from "../../services/languageService";

const numbers = [
  { value: 0, image: num0 },
  { value: 1, image: num1 },
  { value: 2, image: num2 },
  { value: 3, image: num3 },
  { value: 4, image: num4 },
  { value: 5, image: num5 },
  { value: 6, image: num6 },
  { value: 7, image: num7 },
  { value: 8, image: num8 },
  { value: 9, image: num9 },
  { value: 10, image: num10 },
];

const sinhalaSounds = {
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

const englishSounds = {
  0: ESound0,
  1: ESound1,
  2: ESound2,
  3: ESound3,
  4: ESound4,
  5: ESound5,
  6: ESound6,
  7: ESound7,
  8: ESound8,
  9: ESound9,
  10: ESound10,
};

const translations = {
  en: {
    title: "Guide for Parents: Helping Your Child Learn Numbers",
    adventure: "Number Learning!",
    tapInstruction: "Tap the picture to hear the number!",
    practiceButton: "Go to Practice",
    instructionsButton: {
      show: "Show Instructions",
      hide: "Hide Instructions",
    },
    content: [
      "1. Sit Together: Sit with your child in a comfortable, quiet place to focus on the activity.",
      "2. Explore the Numbers: Use the arrows to show different numbers. Let your child see and hear each one.",
      "3. Tap to Listen: Tap the picture to play the number’s sound. Encourage your child to listen carefully.",
      "4. Repeat the Sound: Say the number out loud with your child after hearing it. Use a cheerful voice!",
      "5. Use Hands: Show the number with your fingers (e.g., hold up 3 fingers for '3'). Ask your child to copy you.",
      "6. Be Patient: Go slow and repeat as needed. Celebrate small successes with claps or smiles.",
      "7. Make it Fun: Turn it into a game—guess the number or sing a song with it!",
    ],
  },
  si: {
    title:
      "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට ඉලක්කම් ඉගෙන ගැනීමට උපකාර කිරීම",
    adventure: "ඉලක්කම් ඉගෙනීම!",
    tapInstruction: "ඉලක්කම ඇසීමට රූපය තට්ටු කරන්න!",
    practiceButton: "පුහුණුවීමට යන්න",
    instructionsButton: {
      show: "උපදෙස් පෙන්වන්න",
      hide: "උපදෙස් සඟවන්න",
    },
    content: [
      "1. එකට වාඩි වන්න: ඔබේ දරුවා සමඟ සුවපහසු, නිශ්ශබ්ද ස්ථානයක වාඩි වී ක්‍රියාකාරකම කෙරෙහි අවධානය යොමු කරන්න.",
      "2. ඉලක්කම් ගවේෂණය කරන්න: විවිධ ඉලක්කම් පෙන්වීමට ඊතල භාවිතා කරන්න. ඔබේ දරුවාට එක් එක් ඉලක්කම දැකීමට සහ ඇසීමට ඉඩ දෙන්න.",
      "3. තට්ටු කර ඇසීමට: ඉලක්කමේ ශබ්දය වාදනය කිරීමට රූපය තට්ටු කරන්න. ඔබේ දරුවාට හොඳින් ඇසීමට ධෛර්යමත් කරන්න.",
      "4. ශබ්දය පුනරුච්චාරණය කරන්න: ශබ්දය ඇසූ පසු ඔබේ දරුවා සමඟ ඉලක්කම ශබ්ද නඟා කියන්න. සතුටු හඬකින් භාවිතා කරන්න!",
      "5. අත් භාවිතා කරන්න: ඔබේ ඇඟිලිවලින් ඉලක්කම පෙන්වන්න (උදා: '3' සඳහා ඇඟිලි 3ක් ඉහළට තබන්න). ඔබේ දරුවාට ඔබව පිටපත් කරන්නට කියන්න.",
      "6. ඉවසීමෙන් ඉන්න: සෙමින් යන්න සහ අවශ්‍ය පරිදි පුනරුච්චාරණය කරන්න. කුඩා ජයග්‍රහණ අත්පුඩි ගසමින් හෝ සිනහවෙන් සමරන්න.",
      "7. රසවත් කරන්න: එය ක්‍රීඩාවක් බවට පත් කරන්න—ඉලක්කම අනුමාන කරන්න හෝ එය සමඟ ගීතයක් ගායනා කරන්න!",
    ],
  },
};

const NumberLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await getLanguagePreference(userId);
        console.log("Fetched language:", response.data.data.language);
        if (response.data.status === "success") {
          setLanguage(response.data.data.language || "en"); // Fallback to "en" if language is undefined
        }
      } catch (err) {
        console.error("Error fetching language:", err);
        if (err.response?.status === 404 || err.response?.status === 500) {
          setLanguage("en"); // Fallback to English on error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [userId]);

  const playSound = (number, lang) => {
    if (loading) return; // Prevent sound from playing until language is loaded
    const selectedSounds = lang === "si" ? sinhalaSounds : englishSounds;
    const soundToPlay = selectedSounds[number];
    if (soundToPlay) {
      const audio = new Audio(soundToPlay);
      audio.play().catch((err) => {
        console.error(`Error playing ${lang} sound for ${number}:`, err);
      });
    } else {
      console.warn(`No sound file found for number ${number} in language ${lang}`);
    }
  };

  useEffect(() => {
    if (!loading) {
      playSound(numbers[currentIndex].value, language);
    }
  }, [currentIndex, language, loading]);

  const prevNumber = () => {
    setCurrentIndex((prev) => (prev === 0 ? numbers.length - 1 : prev - 1));
  };

  const nextNumber = () => {
    setCurrentIndex((prev) => (prev === numbers.length - 1 ? 0 : prev + 1));
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div
      className="h-[100vh] w-screen relative flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <>
          <div
            className={`absolute inset-0 ${
              showInstructions ? "backdrop-blur-sm z-10" : "z-0"
            }`}
          />

          {/* Top-left button */}
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={toggleInstructions}
              className="bg-blue-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-6 py-1 sm:py-3 rounded-full shadow-lg hover:bg-blue-600 active:scale-95 transition-all duration-200"
            >
              {
                translations[language]?.instructionsButton[
                  showInstructions ? "hide" : "show"
                ]
              }
            </button>
          </div>

          {/* Top-right button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => navigate("/math/numbers/practice")}
              className="bg-indigo-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-6 py-1 sm:py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
            >
              {translations[language]?.practiceButton}
            </button>
          </div>

          {showInstructions && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 m-4 relative">
                <button
                  onClick={toggleInstructions}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
                >
                  ×
                </button>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">
                    {translations[language]?.title}
                  </h3>
                </div>
                <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg max-h-[60vh] overflow-y-auto">
                  {translations[language]?.content.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <h2 className="text-3xl sm:text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-4 mt-[100px] sm:mt-10 z-20">
            {translations[language]?.adventure}
          </h2>

          <div className="flex items-center justify-center w-full max-w-3xl sm:max-w-4xl space-x-4 sm:space-x-8 mt-[-15px] z-20">
            <button
              className="bg-yellow-400 text-white text-xl sm:text-3xl font-bold p-4 sm:p-6 rounded-full shadow-2xl hover:bg-yellow-500 active:scale-90 transition-all duration-200 z-30"
              onClick={prevNumber}
            >
              ⬅️
            </button>
            <img
              src={numbers[currentIndex].image}
              alt={`Number ${numbers[currentIndex].value}`}
              className="w-64 sm:w-96 h-48 sm:h-72 object-contain cursor-pointer transform transition-all duration-300 active:scale-90 z-20"
              onClick={() => playSound(numbers[currentIndex].value, language)}
            />
            <button
              className="bg-yellow-400 text-white text-xl sm:text-3xl font-bold p-4 sm:p-6 rounded-full shadow-2xl hover:bg-yellow-500 active:scale-90 transition-all duration-200 z-30"
              onClick={nextNumber}
            >
              ➡️
            </button>
          </div>

          <p className="text-lg sm:text-xl text-purple-600 font-semibold mb-6 drop-shadow-md z-20">
            {translations[language]?.tapInstruction}
          </p>
        </>
      )}
    </div>
  );
};

export default NumberLearning;