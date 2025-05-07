import { Link } from "react-router-dom";
import write from "../assets/write.png";
const WritingIntro = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:py-16 md:px-32">
      {/* Left Section: Text Content */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-sky-600 mb-4">
          Improve Letter Writing
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Get ready for a fun letter-drawing adventure! Let’s explore the joy of
          drawing each letter, one stroke at a time. It’s not just about
          writing—it’s about playing, learning, and building confidence while
          having tons of fun. Tap below to start drawing your way to an amazing
          learning journey!
        </p>
        <button className="bg-blue-100 text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-blue-200 transition">
          <Link to='/write/writing-home'> 
            Lets Practice and Learn how to do it
          </Link>
        </button>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative mt-8 md:mt-0">
        <img
          src={write}
          alt="writng Illustration"
          className="w-full max-w-md"
        />
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4"></div>
      </div>
    </div>
  );
};

export default WritingIntro;
