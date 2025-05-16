
// import React, { useState } from "react";
// import { FillInTheBlank } from "./FillInTheBlank ";
// import { AllAddWord } from "../../../Api/vocabularyApi";

// function Dectation() {
//     const userme = localStorage.getItem("userid");
//   const [pagecount, setPagecount] = useState(1);

//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   const [selectedLetters, setSelectedLetters] = useState([]);
//   const [spokenText, setSpokenText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isresults, setResults] = useState(false); // State to track completion
  
//   const word = "Apple".toUpperCase();
//   const blankIndexes = [1, 3]; // Hiding P and L

//     const {
//       data: getallword,
//       isLoading,
//       error,
//     } = AllAddWord(pagecount, 1, userme);
//   const missingLetters = blankIndexes.map((i) => word[i]);
//   const isComplete = missingLetters.every((letter) =>
//     selectedLetters.includes(letter)
//   );

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onstart = () => {
//       setIsListening(true);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toUpperCase();
//       setSpokenText(transcript);

//       const spokenLetters = transcript
//         .split("")
//         .filter((char) => letters.includes(char));

//       setSelectedLetters((prev) =>
//         Array.from(new Set([...prev, ...spokenLetters]))
//       );
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//   };
//   //const word = "APPLE";
//   //const blankIndexes = [1, 3]; // assuming you're blanking letters at these positions
//   const blankLetters = blankIndexes.map((i) => word[i].toUpperCase());

//   // Calculate how many of those letters were guessed correctly
//   const correctGuesses = blankLetters.filter((letter) =>
//     selectedLetters.includes(letter)
//   );

//   // Score out of total blanks
//   const score = Math.round((correctGuesses.length / blankLetters.length) * 100);

//   // Check if the word is fully completed
//  // const isComplete = correctGuesses.length === blankLetters.length;

//   // const spechword = (textword) => {
//   //   const utterance = new SpeechSynthesisUtterance(textword);
//   //   window.speechSynthesis.speak(utterance);
//   // };
// const movefrowd = () => {
//   setPagecount((prev) =>
//     prev < getallword.data.totalCount - 1 ? prev + 1 : prev
//   );
// };

//   const moveback = ()=>{
//    setPagecount((prev) => (prev > 0 ? prev - 1 : 0));
//   }
//   return (
//     <div
//       className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] 
//                 bg-cover bg-no-repeat bg-center w-full h-screen flex flex-col
//                 justify-center items-center text-center p-6"
//     >
//       {isComplete ? (
//         <>
//           {" "}
//           {/* <div className="mt-4 text-4xl animate-bounce text-yellow-500">
//             ⭐ Great Job! ⭐
//             {spokenText && (
//               <div className="text-lg text-gray-800">
//                 You said: <span className="font-semibold">{spokenText}</span>
//               </div>
//             )}
//           </div> */}
//           <div className="mt-6 w-full h-[300px] max-w-md mx-auto flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-xl shadow-lg border-2 border-yellow-300">
//             <div className="text-3xl text-blue-600 font-extrabold mb-2">
//               🧠 Score: {score}%
//             </div>

//             <div className="w-full bg-gray-300 rounded-full h-4">
//               <div
//                 className="bg-green-400 h-4 rounded-full transition-all duration-500"
//                 style={{ width: `${score}%` }}
//               />
//             </div>

//             {isComplete && (
//               <div className="text-4xl mt-4 text-yellow-500 font-bold animate-bounce">
//                 ⭐ Great Job! ⭐
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="flex flex-col items-center gap-6 p-6">
//             <button
//               onClick={startListening}
//               className="px-6 py-2 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
//             >
//               🎤 Speak Letters
//             </button>

//             {spokenText && (
//               <div className="text-lg text-gray-800">
//                 You said: <span className="font-semibold">{spokenText}</span>
//               </div>
//             )}

//             <div className="flex flex-wrap justify-center gap-2 mt-4">
//               {letters.map((letter) => (
//                 <span
//                   key={letter}
//                   className={`w-12 h-12 flex items-center justify-center rounded-full shadow text-lg font-bold cursor-pointer transition ${
//                     selectedLetters.includes(letter)
//                       ? "bg-green-400 text-white"
//                       : "bg-blue-200 text-blue-800 hover:bg-blue-400 hover:text-white"
//                   }`}
//                 >
//                   {letter}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* <img
//               src="https://th.bing.com/th/id/R.deab0c9d44c793d66cf1d03999e66c4b?rik=Rc%2fv65T9OlhOlQ&pid=ImgRaw&r=0"
//               alt="Apple"
//               className="w-60 h-60 object-cover rounded-xl border-4 border-yellow-300"
//             /> */}
//           {/* <div>
//             <button dangerouslySetInnerHTML={{ __html: "&lt;" }} />
//           </div>
//           {getallword?.data?.wordses?.map((word) => (
//             <div
//               key={word._id}
//               className="flex flex-col md:flex-row items-center gap-10 bg-white bg-opacity-70 p-6 rounded-xl shadow-xl"
//             >
//               <div>
//                 <img
//                   src={word.imagewordUrl}
//                   alt={word.wordAdd}
//                   className="w-60 h-60 object-cover rounded-xl border-4 border-yellow-300"
//                 />
//               </div>

//               <div>
//                 <h1 className="text-3xl font-bold text-blue-700 mb-4">
//                   Can You Guess the Word?
//                 </h1>
//                 <FillInTheBlank
//                   word={word.wordAdd}
//                   blankIndexes={blankIndexes}
//                   selectedLetters={selectedLetters}
//                 />
//               </div>
//             </div> */}
//           {/* ))} */}
//           <div>
//             <button dangerouslySetInnerHTML={{ __html: "&gt;" }} />
//           </div>
//           <div  className=" flex  flex-wrap gap-3">
//             <div className="flex justify-center items-center gap-4 my-6">
           
//               <button
//                 className="text-4xl bg-pink-200 hover:bg-pink-300 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
//                 dangerouslySetInnerHTML={{ __html: "&lt;" }}
//                 onClick={moveback} // Move to the previous word
//               />
//             </div>

//             {getallword?.data?.wordses?.map((word) => (
//               <div
//                 key={word._id}
//                 className="flex flex-col md:flex-row items-center gap-10 bg-yellow-100 p-6 rounded-3xl shadow-xl border-4 border-yellow-300 my-4"
//               >
            
//                 <div>
//                   <img
//                     src={word.imagewordUrl}
//                     alt={word.wordAdd}
//                     className="w-64 h-64 object-cover rounded-3xl border-4 border-pink-400"
//                   />
//                 </div>

//                 <div className="text-center md:text-left">
//                   <h1 className="text-4xl font-bold text-pink-600 mb-4 font-serif">
//                     Can You Guess the Word?
//                   </h1>
//                   <FillInTheBlank
//                     word={word.wordAdd}
//                     blankIndexes={blankIndexes}
//                     selectedLetters={selectedLetters}
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-center items-center gap-4 my-6">
             
//               <button
//                 className="text-4xl bg-pink-200 hover:bg-pink-300 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
//                 dangerouslySetInnerHTML={{ __html: "&gt;" }}
//                 onClick={movefrowd} // Move to the next word
//               />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dectation;
import React, { useState, useEffect } from "react";
import { FillInTheBlank } from "./FillInTheBlank ";
import { AllAddWord } from "../../../Api/vocabularyApi";

function Dectation() {
  const userme = localStorage.getItem("userid");
  const [pagecount, setPagecount] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(pagecount, 1, userme);
  const wordObj = getallword?.data?.wordses?.[0];
  const word = wordObj?.wordAdd?.toUpperCase() || "";
  const blankIndexes = [1, 3]; // Customize blanks here
  const blankLetters = blankIndexes.map((i) => word[i]);

  const isComplete = blankLetters.every((letter) =>
    selectedLetters.includes(letter)
  );
  const correctGuesses = blankLetters.filter((letter) =>
    selectedLetters.includes(letter)
  );
  const score = Math.round((correctGuesses.length / blankLetters.length) * 100);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toUpperCase();
      setSpokenText(transcript);

      const spokenLetters = transcript
        .split("")
        .filter((char) => letters.includes(char));

      setSelectedLetters((prev) =>
        Array.from(new Set([...prev, ...spokenLetters]))
      );
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakWord = () => {
    if (!word) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const moveForward = () => {
    setPagecount((prev) =>
      prev < getallword?.data?.totalCount - 1 ? prev + 1 : prev
    );
    setSelectedLetters([]);
    setSpokenText("");
  };

  const moveBack = () => {
    setPagecount((prev) => (prev > 0 ? prev - 1 : 0));
    setSelectedLetters([]);
    setSpokenText("");
  };

  return (
    <div
      className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] 
      bg-cover bg-no-repeat bg-center w-full min-h-screen flex flex-col
      justify-center items-center text-center p-6"
    >
      {isComplete ? (
        <div className="mt-6 w-full h-[300px] max-w-md mx-auto flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-xl shadow-lg border-2 border-yellow-300">
          <div className="text-3xl text-blue-600 font-extrabold mb-2">
            🧠 Score: {score}%
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-green-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="text-4xl mt-4 text-yellow-500 font-bold animate-bounce">
            ⭐ Great Job! ⭐
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4 p-6">
            <button
              onClick={startListening}
              className="px-6 py-2 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            >
              🎤 Speak Letters
            </button>

            <button
              onClick={speakWord}
              className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              🔊 Hear Word
            </button>

            {spokenText && (
              <div className="text-lg text-gray-800">
                You said: <span className="font-semibold">{spokenText}</span>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {letters.map((letter) => (
                <span
                  key={letter}
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow text-lg font-bold cursor-pointer transition ${
                    selectedLetters.includes(letter)
                      ? "bg-green-400 text-white"
                      : "bg-blue-200 text-blue-800 hover:bg-blue-400 hover:text-white"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 my-6">
            <button
              className="text-4xl bg-pink-200 hover:bg-pink-300 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
              onClick={moveBack}
              dangerouslySetInnerHTML={{ __html: "&lt;" }}
            />
          </div>

          {wordObj && (
            <div className="flex flex-col md:flex-row items-center gap-10 bg-yellow-100 p-6 rounded-3xl shadow-xl border-4 border-yellow-300 my-4">
              <img
                src={wordObj.imagewordUrl}
                alt={wordObj.wordAdd}
                className="w-64 h-64 object-cover rounded-3xl border-4 border-pink-400"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-pink-600 mb-4 font-serif">
                  Can You Guess the Word?
                </h1>
                <FillInTheBlank
                  word={word}
                  blankIndexes={blankIndexes}
                  selectedLetters={selectedLetters}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center items-center gap-4 my-6">
            <button
              className="text-4xl bg-pink-200 hover:bg-pink-300 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
              onClick={moveForward}
              dangerouslySetInnerHTML={{ __html: "&gt;" }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dectation;
