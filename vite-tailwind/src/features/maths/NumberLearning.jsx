// import React from "react";
// import "./Numbers.css";

// const NumberLearning = () => {
//     return (
//         <div className="number-learning">
//             <h2>🔢 Learning Numbers</h2>
//             <p>Click on a number to hear its pronunciation.</p>
//             <div className="number-buttons">
//                 {Array.from({ length: 10 }, (_, i) => (
//                     <button key={i} onClick={() => new Audio(`/sounds/${i}.mp3`).play()}>
//                         {i}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NumberLearning;


import React, { useState } from "react";
import "./Numbers.css";

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

// Number data with images and sounds
const numbers = [
    { value: 0, image: num0 },
    { value: 1, image: num1 },
    { value: 2, image: num2 },
    { value: 3, image: num3 },
    { value: 4, image: num4 },
    { value: 5, image: num5 },
    { value: 6, image: num6 },
    { value: 7, image: num7 },
    { value: 8, image: num8 },
    { value: 9, image: num9 },
];

const NumberLearning = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to play sound when clicking an image
    const playSound = () => {
        const soundPath = `${window.location.origin}/sounds/${numbers[currentIndex].value}.mp3`;
        const audio = new Audio(soundPath);
        audio.play().catch((error) => console.log("Audio play error:", error));
    };

    // Function to manually swap numbers (Previous / Next)
    const prevNumber = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? numbers.length - 1 : prevIndex - 1));
    };

    const nextNumber = () => {
        setCurrentIndex((prevIndex) => (prevIndex === numbers.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="number-learning">
            <h2>🔢 Learning Numbers</h2>
            <p>Click the number to hear its pronunciation.</p>

            <div className="number-display">
                <button className="nav-button" onClick={prevNumber}>⬅️</button>
                <img 
                    src={numbers[currentIndex].image} 
                    alt={`Number ${numbers[currentIndex].value}`} 
                    className="number-image" 
                    onClick={playSound} 
                />
                <button className="nav-button" onClick={nextNumber}>➡️</button>
            </div>

            <h2>{numbers[currentIndex].value}</h2>
        </div>
    );
};

export default NumberLearning;
