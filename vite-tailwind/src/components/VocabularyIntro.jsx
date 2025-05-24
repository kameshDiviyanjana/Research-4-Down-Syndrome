import vocabulary from "../assets/vocab.png";
import { useNavigate } from "react-router-dom";

const VocabularyIntro = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/vocabulary");
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-md space-y-4 md:space-y-0 md:space-x-6 cursor-pointer"
      onClick={handleNavigate}
    >
      {/* Left Section: Text Content */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2 drop-shadow-md">
          🗣️ Build Vocabulary!
        </h1>
        <p className="text-base text-gray-700 mb-4 leading-snug">
          Discover new words with fun sounds and pictures. Vocabulary learning has never been this exciting!
        </p>
        <button
          onClick={handleNavigate}
          className="bg-purple-400 hover:bg-purple-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow transition duration-300"
        >
          🎉 Start Now!
        </button>
      </div>

      {/* Right Section: Illustration */}
      <div className="flex justify-center">
        <img
          src={vocabulary}
          alt="Vocabulary Illustration"
          className="w-[140px] max-w-xs rounded-lg drop-shadow"
        />
      </div>
    </div>
  );
};

export default VocabularyIntro;
