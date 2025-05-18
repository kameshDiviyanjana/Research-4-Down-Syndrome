import vocabulary from "../assets/vocab.png";
import { useNavigate } from "react-router-dom";
const VocabularyIntro = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    
   navigate("/vocabulary");
  };
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between  p-6 rounded-2xl shadow-md space-y-8 md:space-y-0 md:space-x-10"
      onClick={handleNavigate}
    >
      {/* Left Section: Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-4 drop-shadow-md">
          🗣️ Improve Speaking Skills!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Let’s make learning new words exciting and fun! Explore colorful
          pictures, playful sounds, and interactive games that help kids
          discover and remember new words easily. Tap below to open a world of
          words and start the fun-filled journey to boost vocabulary!
        </p>
        <button
          onClick={handleNavigate}
          className="bg-purple-400 hover:bg-purple-500 text-white font-semibold text-md py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          🎉 Let's Practice and Learn!
        </button>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative flex justify-center">
        <img
          src={vocabulary}
          alt="Vocabulary Illustration"
          className="w-[200px] max-w-xs md:max-w-md rounded-xl drop-shadow-xl"
        />

        {/* <div className="absolute top-0 right-0 bg-white text-purple-500 font-bold py-1 px-3 rounded-full shadow text-sm transform translate-x-3 -translate-y-3">
          Word Fun 🎈
        </div> */}
      </div>
    </div>

    // <div >
    //   {/* Left Section: Text Content */}
    //   <div className="max-w-lg">
    //     <h1 className="text-4xl font-bold text-sky-600 mb-4">
    //       Improve Speeching
    //     </h1>
    //     <p className="text-gray-600 text-lg mb-6">
    //       Let’s make learning new words exciting and fun! Explore colorful
    //       pictures, playful sounds, and interactive games that help kids
    //       discover and remember new words easily. Tap below to open a world of
    //       words and start the fun-filled journey to boost vocabulary!
    //     </p>
    //     <button
    //       className="bg-blue-100 text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-blue-200 transition"
    //       onClick={handleNavigate}
    //     >
    //       Lets Practice and Learn how to do it
    //     </button>
    //   </div>

    //   {/* Right Section: Illustration */}
    //   {/* <div className="relative mt-8 md:mt-0">
    //     <img
    //       src={vocabulary}
    //       alt="writng Illustration"
    //       className="w-full max-w-md"
    //     />
    //     <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4"></div>
    //   </div> */}
    // </div>
  );
};

export default VocabularyIntro;
