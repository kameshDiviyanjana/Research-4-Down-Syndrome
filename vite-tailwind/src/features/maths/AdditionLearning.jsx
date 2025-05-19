import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import bg1 from "../../../public/images/bg2.jpg";
import useLanguageStore from "../maths/store/languageStore"; // Import Zustand store

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

// Number images map
const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9
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
  0: sound0, 1: sound1, 2: sound2, 3: sound3, 4: sound4,
  5: sound5, 6: sound6, 7: sound7, 8: sound8, 9: sound9,
};

// Function to generate a simple addition example
const generateRandomExample = () => {
  const num1 = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
  const num2 = Math.floor(Math.random() * (9 - num1)) + 1; // Ensure sum <= 9
  const sum = num1 + num2;
  return { num1, num2, sum };
};

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Number Addition",
    instructionsTitle: "Guide for Parents: Helping Your Child Learn Addition",
    example: "Example",
    nextExample: "Next Example",
    pronunciation: "Click on the numbers to hear their pronunciation.",
    practiceButton: "Go to Practice",
    instructionsButton: {
      show: "Show Instructions",
      hide: "Hide Instructions",
    },
    content: [
      "1. Sit Together: Sit with your child in a quiet, comfortable place to focus on addition.",
      "2. Show the Numbers: Point to the two numbers on the screen and say them out loud together.",
      "3. Tap to Hear: Click each number to hear its sound. Encourage your child to listen carefully.",
      "4. Explain Addition: Say, 'We add these together,' and point to the plus sign (+). Then show the sum.",
      "5. Count with Fingers: Use your fingers to count the first number, then add the second number. Help your child follow along.",
      "6. Say the Sum: After hearing the sum’s sound, say it together in a cheerful voice!",
      "7. Repeat and Celebrate: Repeat the example a few times. Clap or smile for every effort!",
      "8. Try a New Example: Click 'Next Example' to practice more addition and keep it exciting.",
    ],
  },
  si: {
    title: "ඉලක්කම් එකතු කිරීම",
    instructionsTitle: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට එකතු කිරීම ඉගෙන ගැනීමට උපකාර කිරීම",
    example: "උදාහරණය",
    nextExample: "ඊළඟ උදාහරණය",
    pronunciation: "ඉලක්කම්වල උච්චාරණය ඇසීමට ඒවා මත ක්ලික් කරන්න。",
    practiceButton: "පුහුණුවීමට යන්න",
    instructionsButton: {
      show: "උපදෙස් පෙන්වන්න",
      hide: "උපදෙස් සඟවන්න",
    },
    content: [
      "1. එකට වාඩි වන්න: ඔබේ දරුවා සමඟ නිශ්ශබ්ද, සුවපහසු ස්ථානයක වාඩි වී එකතු කිරීම කෙරෙහි අවධානය යොමු කරන්න。",
      "2. ඉලක්කම් පෙන්වන්න: තිරයේ ඇති ඉලක්කම් දෙකට ඇඟිල්ලෙන් යොමු කර එකට ශබ්ද නඟා කියන්න。",
      "3. තට්ටු කර ඇසීමට: එක් එක් ඉලක්කම ක්ලික් කර එහි ශබ්දය ඇසෙන්න。 ඔබේ දරුවාට හොඳින් ඇසීමට ධෛර්යමත් කරන්න。",
      "4. එකතු කිරීම පැහැදිලි කරන්න: 'අපි මේවා එකතු කරමු' කියන්න සහ එකතු ලකුණට (+) යොමු කරන්න。 පසුව එකතුව පෙන්වන්න。",
      "5. ඇඟිලිවලින් ගණන් කරන්න: පළමු ඉලක්කම ඔබේ ඇඟිලිවලින් ගණන් කරන්න, පසුව දෙවන ඉලක්කම එකතු කරන්න。 ඔබේ දරුවාට අනුගමනය කිරීමට උපකාර කරන්න。",
      "6. එකතුව කියන්න: එකතුවේ ශබ්දය ඇසූ පසු, එය සතුටු හඬකින් එකට කියන්න!",
      "7. පුනරුච්චාරණය කර සමරන්න: උදාහරණය කිහිප වතාවක් යන්න。 සෑම උත්සාහයකටම අත්පුඩි ගසන්න හෝ සිනහවන්න!",
      "8. නව උදාහරණයක් උත්සාහ කරන්න: තවත් එකතු කිරීම් පුහුණු කිරීමට 'ඊළඟ උදාහරණය' ක්ලික් කර එය උද්දීපනය කරන්න。",
    ],
  },
};

const LearningComponent = () => {
  const navigate = useNavigate();
  const [example, setExample] = useState(generateRandomExample());
  const [exampleCount, setExampleCount] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const { language, toggleLanguage } = useLanguageStore(); // Use Zustand store

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
    setExample(generateRandomExample());
    setExampleCount((prev) => prev + 1);
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-screen relative flex flex-col items-center justify-center p-8 text-center">
      <div
              className={`absolute inset-0 ${showInstructions ? 'backdrop-blur-sm' : ''}`}
              style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: -1,
              }}
            />

      {/* Go to Practice Button in Top-Right Corner */}
      <div className="absolute top-4 right-8">
        <button
          onClick={() => navigate("/math/addition/practice")}
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

      {/* Header */}
      <div className="w-full max-w-3xl mt-[250px]">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2 drop-shadow-lg">
          {translations[language].title}
        </h1>
        <p className="text-lg text-purple-600 drop-shadow-md">
          {translations[language].pronunciation}
        </p>
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

        {/* Dynamic Addition Example */}
        <div className="!flex !flex-row justify-center items-center gap-4 my-6">
          <img
            src={numberImages[example.num1]}
            alt={String(example.num1)}
            className="w-[200px] h-[150px] cursor-pointer hover:scale-110 transition"
            onClick={() => playSound(example.num1)}
          />
          <span className="text-4xl font-bold text-purple-600">+</span>
          <img
            src={numberImages[example.num2]}
            alt={String(example.num2)}
            className="w-[200px] h-[150px] cursor-pointer hover:scale-110 transition"
            onClick={() => playSound(example.num2)}
          />
          <span className="text-4xl font-bold text-purple-600">=</span>
          <img
            src={numberImages[example.sum]}
            alt={String(example.sum)}
            className="w-[200px] h-[150px] cursor-pointer hover:scale-110 transition"
            onClick={() => playSound(example.sum)}
          />
        </div>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 m-4 relative">
            <button
              onClick={toggleInstructions}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
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
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div> 
  );
};

export default LearningComponent;