// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./PracticeAnimations.css";

// const SequenceLearning = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="sequence-learning">
//             <h2>🔢 Learning Number Sequences</h2>
//             <p>Identify the missing number in the sequence.</p>

//             <div className="example">
//                 <h3>Example 1:</h3>
//                 <p>2, 4, ?, 8 → Answer: 6</p>
//             </div>

//             <div className="example">
//                 <h3>Example 2:</h3>
//                 <p>1, 3, 5, ?, 9 → Answer: 7</p>
//             </div>

//             <button className="start-button" onClick={() => navigate("/SequencePractice")}>
//                 📝 Start Practice
//             </button>
//         </div>
//     );
// };

// export default SequenceLearning;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./PracticeAnimations.css";

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

// Number data for images
const numberImages = {
    0: num0, 1: num1, 2: num2, 3: num3, 4: num4,
    5: num5, 6: num6, 7: num7, 8: num8, 9: num9,
    10: num10
};

// Function to play sound
const playSound = (number) => {
    const audio = new Audio(`/sounds/${number}.mp3`);
    audio.play().catch((error) => console.log("Audio play error:", error));
};

const SequenceLearning = () => {
    const navigate = useNavigate();

    return (
        <div className="sequence-learning-container">
        <h1 className="title">🔢 Learn Number Sequences</h1>
        <p className="subtitle">Click on a number to hear its pronunciation.</p>

        {/* Example 1 */}
        <div className="example-card">
            <h2>Example 1</h2>
            <div className="sequence">
                <img src={numberImages[2]} alt="2" className="number-img" onClick={() => playSound(2)} /> 
                <img src={numberImages[4]} alt="4" className="number-img" onClick={() => playSound(4)} />
                <img src={numberImages[10]} alt="4" className="number-img" onClick={() => playSound(4)} />
                <img src={numberImages[8]} alt="8" className="number-img" onClick={() => playSound(8)} />
            </div>
            <h3>Answer is</h3>
            <p className="answer-text">
                <img src={numberImages[6]} alt="6" className="answer-img" onClick={() => playSound(6)} />
            </p>
        </div>
<br></br>
<br></br>
        {/* Example 2 */}
        <div className="example-card">
            <h2>Example 2</h2>
            <div className="sequence">
                <img src={numberImages[1]} alt="1" className="number-img" onClick={() => playSound(1)} />
                <img src={numberImages[3]} alt="3" className="number-img" onClick={() => playSound(3)} />
                <img src={numberImages[5]} alt="5" className="number-img" onClick={() => playSound(5)} />
                <img src={numberImages[10]} alt="4" className="number-img" onClick={() => playSound(4)} />
                <img src={numberImages[9]} alt="9" className="number-img" onClick={() => playSound(9)} />
            </div>
            <h3>Answer is</h3>
            <p className="answer-text">
                <img src={numberImages[7]} alt="7" className="answer-img" onClick={() => playSound(7)} />
            </p>
        </div>

       
    </div>
    );
};

export default SequenceLearning;

