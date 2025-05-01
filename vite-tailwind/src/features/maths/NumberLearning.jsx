import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const numbers = [
    { value: 0, image: num0, sound: sound0 },
    { value: 1, image: num1, sound: sound1 },
    { value: 2, image: num2, sound: sound2 },
    { value: 3, image: num3, sound: sound3 },
    { value: 4, image: num4, sound: sound4 },
    { value: 5, image: num5, sound: sound5 },
    { value: 6, image: num6, sound: sound6 },
    { value: 7, image: num7, sound: sound7 },
    { value: 8, image: num8, sound: sound8 },
    { value: 9, image: num9, sound: sound9 },
];

const translations = {
    en: {
        title: "Guide for Parents: Helping Your Child Learn Numbers",
        adventure: "Number Adventure!",
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
        title: "දෙමවුපියන් සඳහා මාර්ගෝපදේශය: ඔබේ දරුවාට ඉලක්කම් ඉගෙන ගැනීමට උපකාර කිරීම",
        adventure: "ඉලක්කම් වික්‍රමය!",
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
    const navigate = useNavigate();
    const location = useLocation();

    // Extract language from query parameter
    const queryParams = new URLSearchParams(location.search);
    const initialLang = queryParams.get("lang") === "si" ? "si" : "en";
    const [language, setLanguage] = useState(initialLang);

    const playSound = () => {
        const audio = new Audio(numbers[currentIndex].sound);
        audio.play().catch((error) => {
            console.log("Audio play error:", error);
        });
    };

    const prevNumber = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? numbers.length - 1 : prevIndex - 1));
    };

    const nextNumber = () => {
        setCurrentIndex((prevIndex) => (prevIndex === numbers.length - 1 ? 0 : prevIndex + 1));
    };

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === "en" ? "si" : "en"));
    };

    const toggleInstructions = () => {
        setShowInstructions((prev) => !prev);
    };

    return (
        <div className="h-[100vh] w-screen relative flex flex-col items-center justify-start p-4 m-0 overflow-hidden">
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
                    onClick={() => navigate(`/math/numbers/practice?lang=${language}`)}
                    className="bg-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
                >
                    {translations[language].practiceButton}
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
                                {translations[language].title}
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

            <h2 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg animate-bounce mb-4 mt-10">
                {translations[language].adventure}
            </h2>

            <div className="flex items-center justify-center w-full max-w-4xl space-x-8 mt-[-15px]">
                <button
                    className="bg-yellow-400 text-white text-3xl font-bold p-6 rounded-full shadow-2xl hover:bg-yellow-500 active:scale-90 transition-all duration-200"
                    onClick={prevNumber}
                >
                    ⬅️
                </button>
                <img
                    src={numbers[currentIndex].image}
                    alt={`Number ${numbers[currentIndex].value}`}
                    className="w-96 h-72 object-contain cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-3 active:scale-90"
                    onClick={playSound}
                />
                <button
                    className="bg-yellow-400 text-white text-3xl font-bold p-6 rounded-full shadow-2xl hover:bg-yellow-500 active:scale-90 transition-all duration-200"
                    onClick={nextNumber}
                >
                    ➡️
                </button>
            </div>

            <p className="text-xl text-purple-600 font-semibold mb-6 drop-shadow-md">
                {translations[language].tapInstruction}
            </p>
        </div>
    );
};

export default NumberLearning;