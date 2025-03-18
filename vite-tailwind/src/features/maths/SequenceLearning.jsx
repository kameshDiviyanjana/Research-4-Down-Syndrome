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

const SequenceLearning = () => {
    const [example, setExample] = useState(generateRandomExample()); // Initial example
    const [exampleCount, setExampleCount] = useState(1); // Track example number
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
                    {example.sequence.map((num, index) => (
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
                                className="w-40 h-40 flex justify-center items-center   border-gray-300 rounded-full"
                            >
                                <AiOutlineQuestionCircle className="w-24 h-24 text-purple-600" />
                            </div>
                        )
                    ))}
                    <div className="text-3xl text-purple-600 font-bold my-4">,</div>
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
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
            >
                📝 Start Practice
            </button>
        </div>
    );
};

export default SequenceLearning;
