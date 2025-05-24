import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../../../public/images/bg2.jpg";
import useLanguageStore from "../maths/store/languageStore";

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
import num10 from "../../assets/numbers/10.png";

// Import Sinhala sounds
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

// Import English sounds
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

// Import subtraction and prompt sounds
import substractEnglish from '../maths/sounds/substract.m4a';
import substractSinhala from '../maths/sounds/S-subtract.m4a';
import substractFrom from '../maths/sounds/from.m4a';
import andSinhala from '../maths/sounds/S-and.m4a';
import whatIstheAnswerAudioEnglish from '../maths/sounds/answerIs.m4a';

// Number images map
const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

// Sinhala number sounds
const numberSoundsSinhala = {
  0: sound0, 1: sound1, 2: sound2, 3: sound3, 4: sound4,
  5: sound5, 6: num6, 7: sound7, 8: sound8, 9: sound9, 10: sound10
};

// English number sounds
const numberSoundsEnglish = {
  0: soundEN0, 1: soundEN1, 2: soundEN2, 3: soundEN3, 4: soundEN4,
  5: soundEN5, 6: soundEN6, 7: soundEN7, 8: soundEN8, 9: soundEN9, 10: soundEN10
};

// Translations for English and Sinhala
const translations = {
  en: {
    title: "Learn Subtraction",
    instructionsTitle: "Guide for Parents: Helping Your Child Learn Subtraction",
    example: "Example",
    nextExample: "Next Example",
    pronunciation: "Click on the numbers to hear their pronunciation.",
    practiceButton: "Go to Practice",
    instructionsButton: {
      show: "Show Instructions",
      hide: "Hide Instructions",
    },
    content: [
      "1. Sit Together: Sit with your child in a calm, comfortable place to focus on subtraction.",
      "2. Show the Numbers: Point to the first number (bigger one) and the second number (to take away) on the screen.",
      "3. Tap to Hear: Click each number to hear its sound. Encourage your child to listen closely.",
      "4. Explain Subtraction: Say, 'We take this away from that,' pointing to the minus sign (-). Then show the result.",
      "5. Count with Fingers: Hold up fingers for the first number, then fold down the second number’s worth. Count what’s left.",
      "6. Say the Result: After hearing the result’s sound, say it together in a happy voice!",
      "7. Repeat and Praise: Go over the example a few times. Cheer or clap for every try!",
      "8. Try a New Example: Click 'Next Example' to practice more subtraction and keep it fun.",
    ],
  },
  si: {
    title: "අඩු කිරීම ඉගෙන ගන්න",
    instructionsTitle: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට අඩු කිරීම ඉගෙන ගැනීමට උපකාර කිරීම",
    example: "උදාහරණය",
    nextExample: "ඊළඟ උදාහරණය",
    pronunciation: "ඉලක්කම්වල උච්චාරණය ඇසීමට ඒවා මත ක්ලික් කරන්න。",
    practiceButton: "පුහුණුවීමට යන්න",
    instructionsButton: {
      show: "උපදෙස් පෙන්වන්න",
      hide: "උපදෙස් සඟවන්න",
    },
    content: [
      "1. එකට වාඩි වන්න: ඔබේ දරුවා සමඟ සන්සුන්, සුවපහසු ස්ථානයක වාඩි වී අඩු කිරීම කෙරෙහි අවධානය යොමු කරන්න。",
      "2. ඉලක්කම් පෙන්වන්න: තිරයේ ඇති පළමු ඉලක්කම (විශාල එක) සහ දෙවන ඉලක්කම (අඩු කරන එක) ඇඟිල්ලෙන් යොමු කරන්න。",
      "3. තට්ටු කර ඇසීමට: එක් එක් ඉලක්කම ක්ලික් කර එහි ශබ්දය ඇසෙන්න。 ඔබේ දරුවාට හොඳින් ඇසීමට ධෛර්යමත් කරන්න。",
      "4. අඩු කිරීම පැහැදිලි කරන්න: 'අපි මෙය එතැනින් අඩු කරමු' කියන්න සහ අඩු ලකුණට (-) යොමු කරන්න。 පසුව ප්‍රතිඵලය පෙන්වන්න。",
      "5. ඇඟිලිවලින් ගණන් කරන්න: පළමු ඉලක්කම සඳහා ඇඟිලි ඉහළට තබන්න, පසුව දෙවන ඉලක්කමේ ප්‍රමාණය බිමට හකුලන්න。 ඉතිරි වූ ගණන ගණන් කරන්න。",
      "6. ප්‍රතිඵලය කියන්න: ප්‍රතිඵලයේ ශබ්දය ඇසූ පසු, එය සතුටු හඬකින් එකට කියන්න!",
      "7. පුනරුච්චාරණය කර ප්‍රශංසා කරන්න: උදාහරණය කිහිප වතාවක් යන්න。 සෑම උත්සාහයකටම සතුටු වන්න හෝ අත්පුඩි ගසන්න!",
      "8. නව උදාහරණයක් උත්සාහ කරන්න: තවත් අඩු කිරීම් පුහුණු කිරීමට 'ඊළඟ උදාහරණය' ක්ලික් කර එය රසවත් කරන්න。",
    ],
  },
};

// Initial easy examples for the first 5 examples
const initialEasyExamples = [
  { minuend: 1, subtrahend: 0, difference: 1 },
  { minuend: 2, subtrahend: 1, difference: 1 },
  { minuend: 3, subtrahend: 2, difference: 1 },
  { minuend: 3, subtrahend: 1, difference: 2 },
  { minuend: 4, subtrahend: 2, difference: 2 }
];

// Function to generate subtraction examples based on exampleCount
const generateExample = (exampleCount) => {
  // First 5 examples: Use predefined easy examples
  if (exampleCount <= 5) {
    return initialEasyExamples[exampleCount - 1];
  }
  // Basic Level (examples 6–10): Random examples with minuend, subtrahend in 0–5, difference 0–5
  else if (exampleCount <= 10) {
    let minuend, subtrahend, difference;
    do {
      minuend = Math.floor(Math.random() * 6); // 0–5
      subtrahend = Math.floor(Math.random() * (minuend + 1)); // 0 to minuend
      difference = minuend - subtrahend;
    } while (difference > 5);
    return { minuend, subtrahend, difference };
  }
  // Advanced Level (examples 11+): Random examples with minuend, subtrahend in 0–10, difference 0–10
  else {
    let minuend, subtrahend, difference;
    do {
      minuend = Math.floor(Math.random() * 11); // 0–10
      subtrahend = Math.floor(Math.random() * (minuend + 1)); // 0 to minuend
      difference = minuend - subtrahend;
    } while (difference > 10);
    return { minuend, subtrahend, difference };
  }
};

const SubtractionLearning = () => {
  const navigate = useNavigate();
  const [example, setExample] = useState(generateExample(1));
  const [exampleCount, setExampleCount] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const { language } = useLanguageStore();

  const playSound = (number, lang = language) => {
    const numberSounds = lang === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
    const sound = numberSounds[number];
    if (sound) {
      const audio = new Audio(sound);
      audio.play().catch((error) => {
        console.log("Audio play error:", error);
      });
    }
  };

  const playAudioSequence = (ex) => {
    const numberSounds = language === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
    const minuendAudio = new Audio(numberSounds[ex.minuend]);
    const subtrahendAudio = new Audio(numberSounds[ex.subtrahend]);
    const subtractAudio = new Audio(language === 'si' ? substractSinhala : substractEnglish);
    const differenceAudio = new Audio(numberSounds[ex.difference]);

    if (language === 'si') {
      const andAudio = new Audio(andSinhala);
      minuendAudio.play().catch((error) => console.log("Minuend audio error:", error));
      minuendAudio.onended = () => {
        andAudio.play().catch((error) => console.log("And audio error:", error));
        andAudio.onended = () => {
          subtrahendAudio.play().catch((error) => console.log("Subtrahend audio error:", error));
          subtrahendAudio.onended = () => {
            subtractAudio.play().catch((error) => console.log("Subtract audio error:", error));
            subtractAudio.onended = () => {
              differenceAudio.play().catch((error) => console.log("Difference audio error:", error));
            };
          };
        };
      };
    } else {
      const fromAudio = new Audio(substractFrom);
      const whatIsTheAnswerAudio = new Audio(whatIstheAnswerAudioEnglish);
      subtrahendAudio.play().catch((error) => console.log("Subtrahend audio error:", error));
      subtrahendAudio.onended = () => {
        subtractAudio.play().catch((error) => console.log("Subtract audio error:", error));
        subtractAudio.onended = () => {
          fromAudio.play().catch((error) => console.log("From audio error:", error));
          fromAudio.onended = () => {
            minuendAudio.play().catch((error) => console.log("Minuend audio error:", error));
            minuendAudio.onended = () => {
              whatIsTheAnswerAudio.play().catch((error) => console.log("What is the answer audio error:", error));
              whatIsTheAnswerAudio.onended = () => {
                differenceAudio.play().catch((error) => console.log("Difference audio error:", error));
              };
            };
          };
        };
      };
    }
  };

  const swapExample = () => {
    const newCount = exampleCount + 1;
    const newExample = generateExample(newCount);
    setExample(newExample);
    setExampleCount(newCount);
    playAudioSequence(newExample);
  };

  // Play audio sequence when the page loads
  useEffect(() => {
    playAudioSequence(example);
  }, []);

  return (
    <div
      className="h-[100vh] w-screen relative flex flex-col items-center justify-start p-4 sm:p-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`absolute inset-0 ${showInstructions ? "backdrop-blur-sm z-10" : "z-0"}`}
      />

      {/* Top-left button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="bg-blue-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-6 py-1 sm:py-3 rounded-full shadow-lg hover:bg-blue-600 active:scale-95 transition-all duration-200"
        >
          {translations[language].instructionsButton[showInstructions ? "hide" : "show"]}
        </button>
      </div>

      {/* Top-right button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => navigate("/math/subtraction/practice")}
          className="bg-indigo-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-6 py-1 sm:py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
        >
          {translations[language].practiceButton}
        </button>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 m-4 relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
            >
              ×
            </button>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">
                {translations[language].instructionsTitle}
              </h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg max-h-[60vh] overflow-y-auto">
              {translations[language].content.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Header */}
      <h2 className="text-3xl sm:text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-4 mt-[100px] sm:mt-10 z-20">
        ➖ {translations[language].title}
      </h2>

      {/* Example Container */}
      <div className="w-full max-w-md sm:max-w-4xl bg-white bg-opacity-80 rounded-xl shadow-lg p-4 sm:p-6 z-20 lg:w-[800px] lg:mr-5">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 drop-shadow-md">
            {translations[language].example} {exampleCount}
          </h3>
          <button
            className="bg-indigo-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
            onClick={swapExample}
          >
            ➡ {translations[language].nextExample}
          </button>
        </div>

        {/* Dynamic Subtraction Example */}
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 my-4 sm:my-6">
          <img
            src={numberImages[example.minuend]}
            alt={String(example.minuend)}
             className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => playSound(example.minuend)}
          />
          <span className="text-4xl sm:text-5xl font-bold text-purple-600">-</span>
          <img
            src={numberImages[example.subtrahend]}
            alt={String(example.subtrahend)}
              className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => playSound(example.subtrahend)}
          />
          <span className="text-4xl sm:text-5xl font-bold text-purple-600">=</span>
          <img
            src={numberImages[example.difference]}
            alt={String(example.difference)}
              className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => playSound(example.difference)}
          />
        </div>

        <p className="text-base sm:text-lg text-purple-600 font-semibold mt-4 drop-shadow-md">
          {translations[language].pronunciation}
        </p>
      </div>
    </div>
  );
};

export default SubtractionLearning;