import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import bg1 from "../../../public/images/bg3.jpg";

// Import number images
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

// Number data for images
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
};

// Import sounds
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

// Map numbers to sounds dynamically
const numberSounds = {
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
};

// Function to generate a simple consecutive sequence example (max 9)
const generateRandomExample = (exampleCount) => {
  const rangeStart = exampleCount <= 5 ? 0 : 5;
  const rangeEnd = exampleCount <= 5 ? 5 : 10;

  const numbers = Array.from(
    { length: rangeEnd - rangeStart },
    (_, i) => i + rangeStart
  );

  // Shuffle the numbers
  const shuffled = numbers.sort(() => Math.random() - 0.5);

  // Pick up to 4 numbers
  const length = Math.floor(Math.random() * 2) + 3; // 3 or 4
  const sequence = shuffled.slice(0, length);

  // Randomly hide one number
  const answerIndex = Math.floor(Math.random() * sequence.length);
  const answer = sequence[answerIndex];
  sequence[answerIndex] = null;

  return { sequence, answer };
};

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Learn Number Sequences",
    instructionsTitle: "Guide for Parents: Helping Your Child Learn Number Sequences",
    example: "Example",
    nextExample: "Next Example",
    answerIs: "Answer is:",
    pronunciation: "Click on a number to hear its pronunciation.",
    practiceButton: "Go to Practice",
    instructionsButton: {
      show: "Show Instructions",
      hide: "Hide Instructions",
    },
    content: [
      "1. Sit Together: Sit with your child in a calm, comfortable spot to focus on the sequences.",
      "2. Show the Sequence: Look at the numbers on the screen. Point out the pattern step-by-step.",
      "3. Tap to Hear: Click each number to hear its sound. Encourage your child to listen closely.",
      "4. Say it Together: Say the numbers out loud with your child after hearing them. Use a happy tone!",
      "5. Find the Missing Number: Point to the question mark and ask, 'What comes next?' Show the answer and say it together.",
      "6. Use Fingers: Count the sequence using your fingers. Help your child do the same.",
      "7. Repeat and Praise: Go over the sequence a few times. Clap or cheer for every try!",
      "8. Next Example: Click 'Next Example' to see a new sequence and keep learning fun.",
    ],
  },
  si: {
    title: "ඉලක්කම් අනුක්‍රම ඉගෙන ගන්න",
    instructionsTitle: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට ඉලක්කම් අනුක්‍රම ඉගෙන ගැනීමට උපකාර කිරීම",
    example: "උදාහරණය",
    nextExample: "ඊළඟ උදාහරණය",
    answerIs: "පිළිතුර:",
    pronunciation: "ඉලක්කමක උච්චාරණය ඇසීමට එය මත ක්ලික් කරන්න.",
    practiceButton: "පුහුණුවීමට යන්න",
    instructionsButton: {
      show: "උපදෙස් පෙන්වන්න",
      hide: "උපදෙස් සඟවන්න",
    },
    content: [
      "1. එකට වාඩි වන්න: ඔබේ දරුවා සමඟ සන්සුන්, සුවපහසු ස්ථානයක වාඩි වී අනුක්‍රම කෙරෙහි අවධානය යොමු කරන්න.",
      "2. අනුක්‍රමය පෙන්වන්න: තිරයේ ඇති ඉලක්කම් දෙස බලන්න. රටාව පියවරෙන් පියවර පෙන්වන්න.",
      "3. තට්ටු කර ඇසීමට: එක් එක් ඉලක්කම ක්ලික් කර එහි ශබ්දය ඇසෙන්න. ඔබේ දරුවාට හොඳින් ඇසීමට ධෛර්යමත් කරන්න.",
      "4. එකට කියන්න: ශබ්ද ඇසූ පසු ඔබේ දරුවා සමඟ ඉලක්කම් ශබ්ද නඟා කියන්න. සතුටු හඬකින් භාවිතා කරන්න!",
      "5. නැති ඉලක්කම සොයන්න: ප්‍රශ්න ලකුණට ඇඟිල්ලෙන් යොමු කර, 'මීළඟට එන්නේ මොකක්ද?' කියා ඇසිල්ලක් කරන්න. පිළිතුර පෙන්වා එකට කියන්න.",
      "6. ඇඟිලි භාවිතා කරන්න: අනුක්‍රමය ඔබේ ඇඟිලි භාවිතයෙන් ගණන් කරන්න. ඔබේ දරුවාටත් එසේ කිරීමට උපකාර කරන්න.",
      "7. පුනරුච්චාරණය කර ප්‍රශංසා කරන්න: අනුක්‍රමය කිහිප වතාවක් යන්න. සෑම උත්සාහයකටම අත්පුඩි ගසන්න හෝ සතුටු වන්න!",
      "8. ඊළඟ උදාහරණය: නව අනුක්‍රමයක් බැලීමට 'ඊළඟ උදාහරණය' ක්ලික් කර ඉගෙනීම රසවත් කරන්න.",
    ],
  },
};

const SequenceLearning = () => {
  const [exampleCount, setExampleCount] = useState(1);
  const [example, setExample] = useState(generateRandomExample(exampleCount));
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract language from query parameter
  const queryParams = new URLSearchParams(location.search);
  const initialLang = queryParams.get("lang") === "si" ? "si" : "en";
  const [language, setLanguage] = useState(initialLang);

  const playSound = (number) => {
    const sound = numberSounds[number];
    if (sound) {
      const audio = new Audio(sound);
      audio.play().catch((error) => {
        console.log("Audio play error:", error);
      });
    }
  };

  const swapExample = () => {
    setExampleCount((prev) => {
      const nextCount = prev + 1;
      setExample(generateRandomExample(nextCount));
      return nextCount;
    });
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "si" : "en"));
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-screen relative flex flex-col items-center justify-center p-8 text-center">
      <div
        className={`absolute inset-0 ${
          showInstructions ? "backdrop-blur-sm" : ""
        }`}
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          height: "900px",
        }}
      />

      {/* Go to Practice Button in Top-Right Corner */}
      <div className="absolute top-4 right-8">
        <button
          onClick={() => navigate(`/math/sequence/practice?lang=${language}`)}
          className="bg-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
        >
          📝 {translations[language].practiceButton}
        </button>
      </div>

      <div className="absolute top-[-20px] left-4">
        <button
          onClick={toggleInstructions}
          className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 active:scale-95 transition-all duration-200 mt-10"
        >
          {translations[language].instructionsButton[showInstructions ? "hide" : "show"]}
        </button>
      </div>

      <div className="mt-[20px] ml-[0px]">
        {/* Header */}
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2 drop-shadow-lg">
            {translations[language].title}
          </h1>
        </div>

        {/* Example Container */}
        <div className="w-full max-w-md p-6 rounded-xl shadow-none">
          {/* Example Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-800 drop-shadow-md">
              {translations[language].example} {exampleCount}
            </h2>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              onClick={swapExample}
            >
              ➡ {translations[language].nextExample}
            </button>
          </div>

          {/* Dynamic Sequence - Horizontal Layout with Centering */}
          <div className="!flex !flex-row justify-center items-center gap-4 my-6">
            {example.sequence.slice(0, 4).map((num, index) =>
              num !== null ? (
                <img
                  key={index}
                  src={numberImages[num]}
                  alt={String(num)}
                  className="w-[200px] h-40 cursor-pointer hover:scale-110 transition"
                  onClick={() => playSound(num)}
                />
              ) : (
                <div
                  key={index}
                  className="w-40 h-40 flex justify-center items-center border-gray-300 rounded-full"
                >
                  <AiOutlineQuestionCircle className="w-24 h-24 text-purple-600" />
                </div>
              )
            )}

            <div className="text-3xl text-purple-600 font-bold my-4"></div>
            <h3 className="text-lg font-semibold text-purple-600 drop-shadow-md">
              {translations[language].answerIs}
            </h3>
            <img
              src={numberImages[example.answer]}
              alt={String(example.answer)}
              className="w-[200px] h-40 cursor-pointer hover:scale-110 transition"
              onClick={() => playSound(example.answer)}
            />
          </div>
          <p className="text-lg text-purple-600 mb-6 drop-shadow-md">
            {translations[language].pronunciation}
          </p>
        </div>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 m-4 relative">
            <button
              onClick={toggleInstructions}
              className="absolute top-2 right-2 text-gray-600 hovered:text-gray-800 text-2xl"
            >
              ×
            </button>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-indigo-600">
                {translations[language].instructionsTitle}
              </h3>
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200"
                onClick={toggleLanguage}
              >
                {language === "en" ? "සිංහල" : "English"}
              </button>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-lg max-h-[60vh] overflow-y-auto">
              {translations[language].content.map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SequenceLearning;