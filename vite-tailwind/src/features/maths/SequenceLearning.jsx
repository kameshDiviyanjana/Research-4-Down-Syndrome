import  { useState  } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import bg1 from "../../../public/images/bg3.jpg";
import {
  getLanguagePreference,  
} from "../../services/languageService";


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
import sound10 from "../maths/sounds/10.m4a";

// Number data for images
const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

// Map numbers to sounds dynamically
const numberSounds = {
  0: sound0, 1: sound1, 2: sound2, 3: sound3, 4: sound4,
  5: sound5, 6: sound6, 7: sound7, 8: sound8, 9: sound9, 10: sound10
};

// Function to generate a simple consecutive sequence example (max 10)
const generateRandomExample = (exampleCount) => {
  // Normalize exampleCount to cycle every 20 examples
  const normalizedCount = ((exampleCount - 1) % 20) + 1;

  // Define base sequences for 0–5 (ascending order)
  const baseSequences05 = [
    { sequence: [0, null, 2], answer: 1 }, // 0, 1, 2
    { sequence: [1, null, 3], answer: 2 }, // 1, 2, 3
    { sequence: [2, null, 4], answer: 3 }, // 2, 3, 4
    { sequence: [3, null, 5], answer: 4 }, // 3, 4, 5
    { sequence: [4, null, 6], answer: 5 }, // 4, 5, 6
  ];

  // Define reverse sequences for 0–5
  const reverseSequences05 = [
    { sequence: [4, null, 2], answer: 3 }, // Reverse of [2, 3, 4]
    { sequence: [5, null, 3], answer: 4 }, // Reverse of [3, 4, 5]
    { sequence: [4, null, 2], answer: 3 }, // Reverse of [2, 3, 4]
    { sequence: [3, null, 1], answer: 2 }, // Reverse of [1, 2, 3]
    { sequence: [2, null, 0], answer: 1 }, // Reverse of [0, 1, 2]
  ];

  // Define base sequences for 6–10 (ascending order)
  const baseSequences610 = [
    { sequence: [6, null, 8], answer: 7 }, // 6, 7, 8
    { sequence: [7, null, 9], answer: 8 }, // 7, 8, 9
    { sequence: [8, null, 10], answer: 9 }, // 8, 9, 10
    { sequence: [8, null, 10], answer: 9 }, // 8, 9, 10
    { sequence: [6, null, 8], answer: 7 }, // 6, 7, 8
  ];

  // Define reverse sequences for 6–10
  const reverseSequences610 = [
    { sequence: [9, null, 7], answer: 8 }, // Reverse of [7, 8, 9]
    { sequence: [10, null, 8], answer: 9 }, // Reverse of [8, 9, 10]
    { sequence: [9, null, 7], answer: 8 }, // Reverse of [7, 8, 9]
    { sequence: [8, null, 6], answer: 7 }, // Reverse of [6, 7, 8]
    { sequence: [10, null, 8], answer: 9 }, // Reverse of [8, 9, 10]
  ];

  // Determine which sequence to use based on normalizedCount
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
      "5. නැති ඉලක්කම සොයන්න: ප්‍ර෶න ලකුණට ඇඟිල්ලෙන් යොමු කර, 'මීළඟට එන්නේ මොකක්ද?' කියා ඇසිල්ලක් කරන්න. පිළිතුර පෙන්වා එකට කියන්න.",
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
      <div
        className={`absolute inset-0 ${showInstructions ? "backdrop-blur-sm z-10" : "z-0"}`}
      />

      {/* Top-left button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={toggleInstructions}
          className="bg-blue-500 text-white text-sm sm:text-lg font-semibold px-3 sm:px-6 py-1 sm:py-3 rounded-full shadow-lg hover:bg-blue-600 active:scale-95 transition-all duration-200"
        >
          {translations[language].instructionsButton[showInstructions ? "hide" : "show"]}
        </button>
      </div>

      {/* Top-right button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => navigate("/math/sequence/practice")}
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
              onClick={toggleInstructions}
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
        {translations[language].title}
      </h2>

{/* Sequence Section */}
<div className="w-full max-w-md sm:max-w-4xl rounded-xl shadow-lg p-4 sm:p-6 z-20">
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

  {/* Combined Sequence and Answer Row */}
  <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 my-4 sm:my-6">
    {/* Sequence Display */}
    <div className="flex flex-row justify-center items-center gap-2 sm:gap-4">
      {example.sequence.slice(0, 3).map((num, index) =>
        num !== null ? (
          <img
            key={index}
            src={numberImages[num]}
            alt={String(num)}
            className="w-32 sm:w-40 h-28 sm:h-32 cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => playSound(num)}
          />
        ) : (
          <div
            key={index}
            className="w-32 sm:w-40 h-28 sm:h-32 flex justify-center items-center border-gray-300 rounded-full"
          >
            <AiOutlineQuestionCircle className="w-16 sm:w-20 h-16 sm:h-20 text-purple-600" />
          </div>
        )
      )}
    </div>

    {/* Answer Section */}
    <div className="flex flex-col justify-center items-center bg-yellow-100 bg-opacity-70 border-2 border-yellow-400 rounded-lg p-2 sm:p-3 shadow-[0_0_8px_2px_rgba(255,215,0,0.5)]">
      <h3 className="text-base sm:text-lg font-semibold text-purple-600 drop-shadow-md mb-2">
        {translations[language].answerIs}
      </h3>
      <img
        src={numberImages[example.answer]}
        alt={String(example.answer)}
        className="w-32 sm:w-40 h-28 sm:h-32 cursor-pointer hover:scale-110 transition-all duration-200"
        onClick={() => playSound(example.answer)}
      />
    </div>
  </div>

  <p className="text-base sm:text-lg text-purple-600 font-semibold mt-4 drop-shadow-md">
    {translations[language].pronunciation}
  </p>
</div>
    </div>
  );
};

export default SequenceLearning;