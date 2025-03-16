// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./PracticeAnimations.css";

// const SubtractionLearning = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="subtraction-learning">
//             <h2>➖ Learning Subtraction</h2>
//             <p>Learn to subtract numbers using fingers.</p>

//             <div className="example">
//                 <h3>Example 1:</h3>
//                 <p>5 - 2 = 3</p>
//             </div>

//             <div className="example">
//                 <h3>Example 2:</h3>
//                 <p>4 - 1 = 3</p>
//             </div>

//             <button className="start-button" onClick={() => navigate("/subtraction-practice")}>
//                 📝 Start Practice
//             </button>
//         </div>
//     );
// };

// export default SubtractionLearning;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubtractionLearning.css";

// Import number images
import num0 from "../../assets/numbers/0.png";
import num1 from "../../assets/numbers/1.png";
import num2 from "../../assets/numbers/2.png";
import num3 from "../../assets/numbers/3.png";
import num4 from "../../assets/numbers/4.png";
import num5 from "../../assets/numbers/5.png";

// Number images map
const numberImages = { 0: num0, 1: num1, 2: num2, 3: num3, 4: num4, 5: num5 };

// Function to play sound
const playSound = (number) => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

const SubtractionLearning = () => {
    const navigate = useNavigate();

    return (
        <div className="subtraction-learning">
            <h2>➖ Learning Subtraction</h2>
            <p>Click on the numbers to hear their pronunciation.</p>

            {/* Example 1 */}
            <div className="example">
                <h3>Example 1:</h3>
                <div className="subtraction-equation">
                    <img src={numberImages[5]} alt="5" className="number-img" onClick={() => playSound(5)} />
                    <span className="operator">-</span>
                    <img src={numberImages[2]} alt="2" className="number-img" onClick={() => playSound(2)} />
                    <span className="operator">=</span>
                    <img src={numberImages[3]} alt="3" className="number-img" onClick={() => playSound(3)} />
                </div>
            </div>

            {/* Example 2 */}
            <div className="example">
                <h3>Example 2:</h3>
                <div className="subtraction-equation">
                    <img src={numberImages[4]} alt="4" className="number-img" onClick={() => playSound(4)} />
                    <span className="operator">-</span>
                    <img src={numberImages[1]} alt="1" className="number-img" onClick={() => playSound(1)} />
                    <span className="operator">=</span>
                    <img src={numberImages[3]} alt="3" className="number-img" onClick={() => playSound(3)} />
                </div>
            </div>

            {/* <button className="start-button" onClick={() => navigate("/subtraction-practice")}>
                📝 Start Practice
            </button> */}
        </div>
    );
};

export default SubtractionLearning;
