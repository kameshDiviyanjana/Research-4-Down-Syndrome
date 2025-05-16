//import React from "react";

// export const FillInTheBlank = ({ word, shouldBlank }) => {
//   const getBlankedWord = (word) => {
//     return word.split("").map((char, index) => {
//       // Example logic: hide 2nd and 4th letters (index 1 and 3)
//       if (shouldBlank && (index === 1 || index === 3)) {
//         return "_";
//       }
//       return char;
//     });
//   };

//   const display = getBlankedWord(word);

//   return (
//     <div style={{ fontSize: "24px", fontFamily: "monospace" }}>
//       {display.map((char, index) => (
//         <span key={index} style={{ margin: "0 4px" }}>
//           {char}
//         </span>
//       ))}
//     </div>
//   );
// };

// // Example usage

// import React from "react";

// export const FillInTheBlank = ({ word, shouldBlank, selectedLetters = [] }) => {
//   return (
//     <div className="flex gap-2 text-2xl font-bold">
//       {word.split("").map((char, index) => {
//         const upperChar = char.toUpperCase();
//         const isFilled = selectedLetters.includes(upperChar);

//         return (
//           <span
//             key={index}
//             className="w-10 h-10 flex items-center justify-center border-b-4 border-blue-600"
//           >
//             {shouldBlank ? (isFilled ? char : "_") : char}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

import React from "react";

export const FillInTheBlank = ({
  word,
  blankIndexes = [],
  selectedLetters = [],
}) => {
  return (
    <div className="flex gap-2 text-2xl font-bold">
      {word.split("").map((char, index) => {
        const upperChar = char.toUpperCase();
        const isBlank = blankIndexes.includes(index);
        const isFilled = selectedLetters.includes(upperChar);

        return (
          <span
            key={index}
            className="w-10 h-10 flex items-center justify-center border-b-4 border-blue-600"
          >
            {isBlank ? (isFilled ? char : "_") : char}
          </span>
        );
      })}
    </div>
  );
};


