import React, { useState } from "react";

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

import sound1 from "../maths/sounds/1.mp3";
import sound2 from "../maths/sounds/2.mp3";
import sound4 from "../maths/sounds/4.mp3";
import sound5 from "../maths/sounds/5.mp3";
import sound8 from "../maths/sounds/8.mp3";
import sound9 from "../maths/sounds/9.mp3";

// Number data with images and sounds
const numbers = [
    { value: 1, image: num1, sound: sound1 },
    { value: 2, image: num2, sound: sound2 },
    { value: 3, image: num3, sound: sound2 },
    { value: 4, image: num4, sound: sound4 },
    { value: 5, image: num5, sound: sound5 },
    { value: 6, image: num6, sound: sound2 },
    { value: 7, image: num7, sound: sound2 },
    { value: 8, image: num8, sound: sound8 },
    { value: 9, image: num9, sound: sound9 },
];

const NumberLearning = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 flex flex-col items-center justify-center p-0 m-0 overflow-hidden">
            {/* Header */}
            <h2 className="text-5xl font-extrabold text-indigo-700 drop-shadow-lg animate-bounce mb-6">
                🔢 Number Adventure!
            </h2>
            <p className="text-xl text-purple-600 font-semibold mb-8 drop-shadow-md">
                Tap the picture to hear the number!
            </p>

            {/* Main Content */}
            <div className="flex items-center justify-center w-full max-w-4xl space-x-8">
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

            {/* Number Display */}
            <h2 className="text-8xl font-extrabold text-blue-800 mt-10 drop-shadow-lg animate-pulse">
                {numbers[currentIndex].value}
            </h2>
        </div>
    );
};

export default NumberLearning;