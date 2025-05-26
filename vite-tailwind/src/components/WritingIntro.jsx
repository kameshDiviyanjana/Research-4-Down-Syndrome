import { Link } from "react-router-dom";
import write from "../assets/write.png";

const translations = {
  en: {
    title: "✏️ Letter Writing Fun!",
    description:
      "Ready to draw letters and have fun? Kids learn each stroke while building confidence through play.",
    button: "🚀 Let's Start!",
  },
  si: {
    title: "✏️ අකුරු ලිවීමේ විනෝදය!",
    description:
      "අකුරු ඇඳීමට සහ විනෝද වීමට සූදානම්ද? දරුවන් සෑම ආඝාතයක්ම ඉගෙන ගනිමින් සෙල්ලම් හරහා ආත්ම විශ්වාසය ගොඩනගයි.",
    button: "🚀 අපි ආරම්භ කරමු!",
  },
};

const WritingIntro = ({ selectedLanguage = "en" }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-md space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Section: Text Content */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-600 mb-2 drop-shadow-md">
          {translations[selectedLanguage]?.title || translations.en.title}
        </h1>
        <p className="text-base text-gray-700 mb-4 leading-snug">
          {translations[selectedLanguage]?.description || translations.en.description}
        </p>
        <Link to="/write/writing-home">
          <button className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow transition duration-300">
            {translations[selectedLanguage]?.button || translations.en.button}
          </button>
        </Link>
      </div>

      {/* Right Section: Illustration */}
      <div className="flex justify-center">
        <img
          src={write}
          alt="Writing Illustration"
          className="w-[140px] max-w-xs rounded-lg drop-shadow"
        />
      </div>
    </div>
  );
};

export default WritingIntro;