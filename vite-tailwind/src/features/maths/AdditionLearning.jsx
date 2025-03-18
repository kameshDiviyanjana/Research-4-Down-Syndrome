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

// Import sounds
import sound1 from "../maths/sounds/1.mp3";
import sound2 from "../maths/sounds/2.mp3";
import sound4 from "../maths/sounds/4.mp3";
import sound5 from "../maths/sounds/5.mp3";
import sound8 from "../maths/sounds/8.mp3";
import sound9 from "../maths/sounds/9.mp3";

// Map numbers to sounds dynamically
const numberSounds = {
    1: sound1,
    2: sound2,
    4: sound4,
    5: sound5,
    8: sound8,
    9: sound9,
};

// Function to generate a simple addition example
const generateRandomExample = () => {
    const num1 = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
    const num2 = Math.floor(Math.random() * (9 - num1)) + 1; // Ensure sum <= 9
    const sum = num1 + num2;
    return { num1, num2, sum };
};

const LearningComponent = () => {
    const navigate = useNavigate();
    const [example, setExample] = useState(generateRandomExample()); // Initial example
    const [exampleCount, setExampleCount] = useState(1); // Track example number

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

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 flex flex-col items-center justify-center p-8 text-center">
            {/* Header */}
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2 drop-shadow-lg">
                    Number Addition
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

                {/* Dynamic Addition Example */}
                <div className="!flex !flex-row justify-center items-center gap-4 my-6">
                    <img
                        src={numberImages[example.num1]}
                        alt={String(example.num1)}
                        className="w-50 h-50 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.num1)}
                    />
                    <span className="text-4xl font-bold text-purple-600">+</span>
                    <img
                        src={numberImages[example.num2]}
                        alt={String(example.num2)}
                        className="w-50 h-50 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.num2)}
                    />
                    <span className="text-4xl font-bold text-purple-600">=</span>
                    <img
                        src={numberImages[example.sum]}
                        alt={String(example.sum)}
                        className="w-50 h-50 cursor-pointer hover:scale-110 transition"
                        onClick={() => playSound(example.sum)}
                    />
                </div>
            </div>

            {/* Start Practice Button */}
            <button
                onClick={() => navigate("/learning-practice")}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
            >
                📝 Start Practice
            </button>
        </div>
    );
};

export default LearningComponent;