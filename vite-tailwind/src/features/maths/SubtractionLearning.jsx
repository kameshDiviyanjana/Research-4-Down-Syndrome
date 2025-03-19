import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";

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

// Import number sounds
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
    1: sound1,
    2: sound2,
    3:sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7:sound7,
    8: sound8,
    9: sound9,
};

// Function to generate a simple subtraction example
const generateRandomExample = () => {
    const minuend = Math.floor(Math.random() * 6) + 4; // Random number between 4 and 9
    const subtrahend = Math.floor(Math.random() * (minuend - 1)) + 1; // Ensure difference >= 0
    const difference = minuend - subtrahend;
    return { minuend, subtrahend, difference };
};

// Instruction guides in English and Sinhala
const instructions = {
    en: {
        title: "Guide for Parents: Helping Your Child Learn Subtraction",
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
        title: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට අඩු කිරීම ඉගෙන ගැනීමට උපකාර කිරීම",
        content: [
            "1. එකට වාඩි වන්න: ඔබේ දරුවා සමඟ සන්සුන්, සුවපහසු ස්ථානයක වාඩි වී අඩු කිරීම කෙරෙහි අවධානය යොමු කරන්න.",
            "2. ඉලක්කම් පෙන්වන්න: තිරයේ ඇති පළමු ඉලක්කම (විශාල එක) සහ දෙවන ඉලක්කම (අඩු කරන එක) ඇඟිල්ලෙන් යොමු කරන්න.",
            "3. තට්ටු කර ඇසීමට: එක් එක් ඉලක්කම ක්ලික් කර එහි ශබ්දය ඇසෙන්න. ඔබේ දරුවාට හොඳින් ඇසීමට ධෛර්යමත් කරන්න.",
            "4. අඩු කිරීම පැහැදිලි කරන්න: 'අපි මෙය එතැනින් අඩු කරමු' කියන්න සහ අඩු ලකුණට (-) යොමු කරන්න. පසුව ප්‍රතිඵලය පෙන්වන්න.",
            "5. ඇඟිලිවලින් ගණන් කරන්න: පළමු ඉලක්කම සඳහා ඇඟිලි ඉහළට තබන්න, පසුව දෙවන ඉලක්කමේ ප්‍රමාණය බිමට හකුලන්න. ඉතිරි වූ ගණන ගණන් කරන්න.",
            "6. ප්‍රතිඵලය කියන්න: ප්‍රතිඵලයේ ශබ්දය ඇසූ පසු, එය සතුටු හඬකින් එකට කියන්න!",
            "7. පුනරුච්�චාරණය කර ප්‍රශංසා කරන්න: උදාහරණය කිහිප වතාවක් යන්න. සෑම උත්සාහයකටම සතුටු වන්න හෝ අත්පුඩි ගසන්න!",
            "8. නව උදාහරණයක් උත්සාහ කරන්න: තවත් අඩු කිරීම් පුහුණු කිරීමට 'ඊළඟ උදාහරණය' ක්ලික් කර එය රසවත් කරන්න.",
        ],
    },
};

const SubtractionLearning = () => {
    const navigate = useNavigate();
    const [example, setExample] = useState(generateRandomExample()); // Initial example
    const [exampleCount, setExampleCount] = useState(1); // Track example number
    const [language, setLanguage] = useState("en"); // Default to English

    // Function to play sound
    const playSound = (number) => {
        const sound = numberSounds[number];
        if (sound) {
            const audio = new Audio(sound);
            audio.play().catch((error) => {
                console.log("Audio play error:", error);
            });
        }
    };

    // Function to generate a new random example
    const swapExample = () => {
        setExample(generateRandomExample());
        setExampleCount((prev) => prev + 1); // Increment example number
    };

    // Function to toggle language
    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === "en" ? "si" : "en"));
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 flex flex-col items-center justify-center p-8 text-center">
            {/* Header */}
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2 drop-shadow-lg">
                    ➖ Learn Subtraction
                </h1>
                <p className="text-lg text-purple-600 mb-6 drop-shadow-md">
                    Click on the numbers to hear their pronunciation.
                </p>
            </div>

            {/* Example Container */}
            <div className="w-full max-w-md p-6 rounded-xl shadow-none">
                {/* Example Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-blue-800 drop-shadow-md">
                        Example {exampleCount}
                    </h2>
                    <button
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                        onClick={swapExample}
                    >
                        ➡ Next Example
                    </button>
                </div>

                {/* Dynamic Subtraction Example */}
                <div className="!flex !flex-row justify-center items-center gap-4 my-6">
                    <img
                        src={numberImages[example.minuend]}
                        alt={String(example.minuend)}
                        className="w-36 h-36 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.minuend)}
                    />
                    <span className="text-4xl font-bold text-purple-600">-</span>
                    <img
                        src={numberImages[example.subtrahend]}
                        alt={String(example.subtrahend)}
                        className="w-36 h-36 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.subtrahend)}
                    />
                    <span className="text-4xl font-bold text-purple-600">=</span>
                    <img
                        src={numberImages[example.difference]}
                        alt={String(example.difference)}
                        className="w-36 h-36 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.difference)}
                    />
                </div>
            </div>

            {/* Start Practice Button */}
            {/* <button
                onClick={() => navigate("/subtraction-practice")}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
            >
                📝 Start Practice
            </button> */}

            {/* Instruction Guide */}
            <div className="mt-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-indigo-600">
                        {instructions[language].title}
                    </h3>
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200"
                        onClick={toggleLanguage}
                    >
                        {language === "en" ? "සිංහල" : "English"}
                    </button>
                </div>
                <ul className="list-disc list-inside text-gray-700 text-lg">
                    {instructions[language].content.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubtractionLearning;