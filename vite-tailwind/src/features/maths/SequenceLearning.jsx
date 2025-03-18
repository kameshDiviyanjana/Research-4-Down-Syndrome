import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai"; // Importing question mark icon from react-icons

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
    0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
    5: num5, 6: num6, 7: num7, 8: num8, 9: num9
};

// Import sounds
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

// Function to generate a simple consecutive sequence example (max 9)
const generateRandomExample = () => {
    const maxStart = 5; // Max start to ensure sequence doesn’t exceed 9 with length 4 or 5
    const start = Math.floor(Math.random() * (maxStart + 1)); // Random start between 0 and 5
    const length = Math.floor(Math.random() * 2) + 4; // Random length between 4 and 5
    const sequence = Array.from({ length }, (_, i) => start + i); // Consecutive sequence
    if (sequence[sequence.length - 1] > 9) { // If sequence exceeds 9, truncate it
        sequence.length = sequence.findIndex(num => num > 9); // Trim to last valid number
    }
    const answerIndex = Math.floor(Math.random() * sequence.length); // Random index for answer
    const answer = sequence[answerIndex]; // Pick answer from sequence
    sequence[answerIndex] = null; // Hide the answer in the sequence
    return { sequence, answer };
};

// Instruction guides in English and Sinhala
const instructions = {
    en: {
        title: "Guide for Parents: Helping Your Child Learn Number Sequences",
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
        title: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට ඉලක්කම් අනුක්‍රම ඉගෙන ගැනීමට උපකාර කිරීම",
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
    const [example, setExample] = useState(generateRandomExample()); // Initial example
    const [exampleCount, setExampleCount] = useState(1); // Track example number
    const [language, setLanguage] = useState("en"); // Default to English
    const navigate = useNavigate();

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
                    🔢 Learn Number Sequences
                </h1>
                <p className="text-lg text-purple-600 mb-6 drop-shadow-md">
                    Click on a number to hear its pronunciation.
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

                {/* Dynamic Sequence - Horizontal Layout with Centering */}
                <div className="!flex !flex-row justify-center items-center gap-4 my-6">
                    {example.sequence.map((num, index) =>
                        num !== null ? (
                            <img
                                key={index}
                                src={numberImages[num]}
                                alt={String(num)}
                                className="w-40 h-40 cursor-pointer hover:scale-110 transition"
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
                        Answer is:
                    </h3>
                    <img
                        src={numberImages[example.answer]}
                        alt={String(example.answer)}
                        className="w-48 h-48 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.answer)}
                    />
                </div>
            </div>

            {/* Start Practice Button */}
            <button
                onClick={() => navigate("/sequence-practice")}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition mb-10"
            >
                📝 Start Practice
            </button>

            {/* Instruction Guide */}
            <div className="mt-20 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
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

export default SequenceLearning;