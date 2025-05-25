import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../../../public/images/bg2.jpg";
import {
  getLanguagePreference
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

// Import addition and prompt sounds
import plusEnglish from '../maths/sounds/plus.m4a';
import plusSinhala from '../maths/sounds/S-plus.m4a';
import andSinhala from '../maths/sounds/S-and.m4a';
import whatIstheAnswerAudioEnglish from '../maths/sounds/answerIs.m4a';

// Number images map
const numberImages = {
  0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
  5: num5, 6: num6, 7: num7, 8: num8, 9: num9, 10: num10
};

// Sinhala number sounds
const numberSoundsSinhala = {
  0: sound0, 1: sound1,  2: sound2, 3: sound3, 4: sound4,
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
      "4. එකතු කිරීම පැහැදිලි කරන්න: 'අපි මේවා එකතු කරමු' කියන්න සහ එකතු ලකුණට (+) දොමු කරන්න。 පසුව එකතුව පෙන්වන්න。",
      "5. ඇඟිලිවලින් ගණන් කරන්න: පළමු ඉලක්කම ඔබේ ඇඟිලිවලින් ගණන් කරන්න, පසුව දෙවන ඉලක්කම එකතු කරන්න。 ඔබේ දරුවාට අනුගමනය කිරීමට උපකාර කරන්න。",
      "6. එකතුව කියන්න: එකතුවේ ශබ්දය ඇසූ පසු, එය සතුටු හඬකින් එකට කියන්න!",
      "7. පුනරුච්චාරණය කර සමරන්න: උදාහරණය කිහිප වතාවක් යන්න。 සෑම උත්සාහයකටම අත්පුඩි ගසන්න හෝ සිනහවන්න!",
      "8. නව උදාහරණයක් උත්සාහ කරන්න: තවත් එකතු කිරීම් පුහුණු කිරීමට 'ඊළඟ උදාහරණය' ක්ලික් කර එය උද්දීපනය කරන්න。",
    ],
  },
};

// Initial easy examples for the first 5 examples
const initialEasyExamples = [
  { num1: 1, num2: 0, sum: 1 },
  { num1: 1, num2: 1, sum: 2 },
  { num1: 2, num2: 1, sum: 3 },
  { num1: 2, num2: 2, sum: 4 },
  { num1: 3, num2: 2, sum: 5 }
];

// Function to generate addition examples based on exampleCount
const generateExample = (exampleCount) => {
  // First 5 examples: Use predefined easy examples
  if (exampleCount <= 5) {
    return initialEasyExamples[exampleCount - 1];
  }
  // Basic Level (examples 6–10): Random examples with num1, num2 in 0–5, sum 0–5
  else if (exampleCount <= 10) {
    let num1, num2, sum;
    do {
      num1 = Math.floor(Math.random() * 6); // 0–5
      num2 = Math.floor(Math.random() * 6); // 0–5
      sum = num1 + num2;
    } while (sum > 5);
    return { num1, num2, sum };
  }
  // Advanced Level (examples 11+): Random examples with num1, num2 in 0–10, sum 0–10
  else {
    let num1, num2, sum;
    do {
      num1 = Math.floor(Math.random() * 11); // 0–10
      num2 = Math.floor(Math.random() * 11); // 0–10
      sum = num1 + num2;
    } while (sum > 10);
    return { num1, num2, sum };
  }
};

const LearningComponent = () => {
  const navigate = useNavigate();
  const [example, setExample] = useState(generateExample(1));
  const [exampleCount, setExampleCount] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true); 
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await getLanguagePreference(userId);
        console.log("Fetched language:", response.data.data.language);
        if (response.data.status === "success") {
          setLanguage(response.data.data.language || "en"); 
        }
      } catch (err) {
        console.error("Error fetching language:", err);
        if (err.response?.status === 404 || err.response?.status === 500) {
          setLanguage("en"); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [userId]);

  const playSound = (number, lang = language) => {
    if (loading) return; 
    const numberSounds = lang === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
    const sound = numberSounds[number];
    if (sound) {
      const audio = new Audio(sound);
      audio.play().catch((error) => {
        console.error(`Error playing ${lang} sound for ${number}:`, error);
      });
    } else {
      console.warn(`No sound file found for number ${number} in language ${lang}`);
    }
  };

  const playAudioSequence = (ex) => {
    const numberSounds = language === 'si' ? numberSoundsSinhala : numberSoundsEnglish;
    const num1Audio = new Audio(numberSounds[ex.num1]);
    const num2Audio = new Audio(numberSounds[ex.num2]);
    const plusAudio = new Audio(language === 'si' ? plusSinhala : plusEnglish);
    const whatIsTheAnswerAudio = new Audio(whatIstheAnswerAudioEnglish);
    const sumAudio = new Audio(numberSounds[ex.sum]);

    if (language === 'si') {
      const andAudio = new Audio(andSinhala);
      num1Audio.play().catch((error) => console.log("Num1 audio error:", error));
      num1Audio.onended = () => {
        andAudio.play().catch((error) => console.log("And audio error:", error));
        andAudio.onended = () => {
          num2Audio.play().catch((error) => console.log("Num2 audio error:", error));
          num2Audio.onended = () => {
            plusAudio.play().catch((error) => console.log("Plus audio error:", error));
            plusAudio.onended = () => {
              sumAudio.play().catch((error) => console.log("Sum audio error:", error));
            };
          };
        };
      };
    } else {
      num1Audio.play().catch((error) => console.log("Num1 audio error:", error));
      num1Audio.onended = () => {
        plusAudio.play().catch((error) => console.log("Plus audio error:", error));
        plusAudio.onended = () => {
          num2Audio.play().catch((error) => console.log("Num2 audio error:", error));
          num2Audio.onended = () => {
            whatIsTheAnswerAudio.play().catch((error) => console.log("What is the answer audio error:", error));
            whatIsTheAnswerAudio.onended = () => {
              sumAudio.play().catch((error) => console.log("Sum audio error:", error));
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

  // Play audio sequence when the page loads, but only after language is fetched
  useEffect(() => {
    if (!loading) {
      playAudioSequence(example);
    }
  }, [example, language, loading]);

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
              onClick={() => navigate("/math/addition/practice")}
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
            ➕ {translations[language].title}
          </h2>

          {/* Example Container */}
          <div className="w-full max-w-md sm:max-w-4xl bg-white bg-opacity-80 rounded-xl shadow-lg p-4 sm:p-6 z-20 lg:mr-5 lg:w-[800px]">
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

            {/* Dynamic Addition Example */}
            <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 my-4 sm:my-6">
              <img
                src={numberImages[example.num1]}
                alt={String(example.num1)}
                className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => playSound(example.num1)}
              />
              <span className="text-4xl sm:text-5xl font-bold text-purple-600">+</span>
              <img
                src={numberImages[example.num2]}
                alt={String(example.num2)}
                className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => playSound(example.num2)}
              />
              <span className="text-4xl sm:text-5xl font-bold text-purple-600">=</span>
              <img
                src={numberImages[example.sum]}
                alt={String(example.sum)}
                className="w-24 h-20 sm:w-32 sm:h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 cursor-pointer hover:scale-110 transition-all duration-200"
                onClick={() => playSound(example.sum)}
              />
            </div>

            <p className="text-base sm:text-lg text-purple-600 font-semibold mt-4 drop-shadow-md">
              {translations[language].pronunciation}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningComponent;