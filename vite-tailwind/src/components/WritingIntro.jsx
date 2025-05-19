import { Link } from "react-router-dom";
import write from "../assets/write.png";
const WritingIntro = () => {
  return (
   
    <div className="flex flex-col md:flex-row items-center justify-between  p-6 rounded-2xl shadow-lg space-y-8 md:space-y-0 md:space-x-10">
      {/* Left Section: Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-sky-600 mb-4 drop-shadow-md">
          ✏️ Improve Letter Writing!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Get ready for a fun letter-drawing adventure! Let’s explore the joy of
          drawing each letter, one stroke at a time. It’s not just about
          writing— it’s about playing, learning, and building confidence while
          having tons of fun.
        </p>

        <Link to="/write/writing-home">
          <button className="bg-pink-400 hover:bg-pink-500 text-white text-md font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out">
            🚀 Let's Practice and Learn!
          </button>
        </Link>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative flex justify-center">
        <img
          src={write}
          alt="Writing Illustration"
          className="w-[200px] max-w-xs md:max-w-md rounded-xl drop-shadow-lg"
        />

        {/* Optional floating badge */}
        {/* <div className="absolute top-0 right-0 bg-white text-pink-500 font-bold py-1 px-3 rounded-full shadow-lg text-sm transform translate-x-3 -translate-y-3">
          Fun Zone 🎉
        </div> */}
      </div>
    </div>
  );
};

export default WritingIntro;
