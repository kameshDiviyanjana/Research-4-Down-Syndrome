// import React from "react";

// function Learning() {
//   const numbers = [
//     { num: 0, audio: "/audio/0.mp3", image: "/images/0.png" },
//     { num: 1, audio: "/audio/1.mp3", image: "/images/1.png" },

  
//   ];

//   const playAudio = (audioPath) => {
//     new Audio(audioPath).play();
//   };

//   return (
//     <div className="learning">
//       <h1>Learn Numbers</h1>
//       <div className="numbers">
//         {numbers.map((n) => (
//           <div key={n.num} className="number-card" onClick={() => playAudio(n.audio)}>
//             <img src={n.image} alt={`Number ${n.num}`} />
//             <p>{n.num}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Learning;


import React, { useState } from "react";

function Learning() {
  const numbers = [
    { num: 0, audio: "/audio/0.mp3", image: "./images/1.jpg" },
    { num: 1, audio: "/audio/1.mp3", image: "/images/1.png" },
    { num: 2, audio: "/audio/2.mp3", image: "/images/2.png" },
    // Add more numbers...
  ];

  const [currentNumber, setCurrentNumber] = useState(0);

  const playAudio = (audioPath) => {
    new Audio(audioPath).play();
  };

  const nextNumber = () => {
    if (currentNumber < numbers.length - 1) {
      setCurrentNumber(currentNumber + 1);
      playAudio(numbers[currentNumber + 1].audio);
    }
  };

  return (
    <div className="learning">
      <h2>Learn Numbers</h2>
      <div>
        <img
          src={numbers[currentNumber].image}
          alt={`Number ${numbers[currentNumber].num}`}
        />
        <p>Number {numbers[currentNumber].num}</p>
        
        <button onClick={nextNumber}>Next</button>
      </div>
    </div>
  );
}

export default Learning;
