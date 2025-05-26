import vocabulary from "../assets/vocab.png";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    title: "🗣️ Build Vocabulary!",
    description:
      "Discover new words with fun sounds and pictures. Vocabulary learning has never been this exciting!",
    button: "🎉 Start Now!",
  },
  si: {
    title: "🗣️ වචන මාලාව ගොඩනගන්න!",
    description:
      "සතුටුදායක ශබ්ද සහ රූප සමඟින් නව වචන සොයා ගන්න. වචන ඉගෙනීම මෙතරම් උද්දීපනයක් වූයේ නැත!",
    button: "🎉 දැන් ආරම්භ කරන්න!",
  },
};

const VocabularyIntro = ({ selectedLanguage = "en" }) => {
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
          {translations[selectedLanguage]?.title || translations.en.title}
        </h1>
        <p className="text-base text-gray-700 mb-4 leading-snug">
          {translations[selectedLanguage]?.description || translations.en.description}
        </p>
        <button
          onClick={handleNavigate}
          className="bg-purple-400 hover:bg-purple-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow transition duration-300"
        >
          {translations[selectedLanguage]?.button || translations.en.button}
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