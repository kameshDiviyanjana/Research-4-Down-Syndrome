import maths from "../assets/maths.png";
import { useNavigate } from "react-router-dom";

const MathsIntro = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/math/mathdashboard");
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-md space-y-4 md:space-y-0 md:space-x-6"
    >
      {/* Left Section: Illustration */}
      <div className="flex justify-center">
        <img
          src={maths}
          alt="Math Illustration"
          className="w-[140px] max-w-xs rounded-lg drop-shadow"
        />
      </div>

      {/* Right Section: Text Content */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-500 mb-2 drop-shadow-md">
          ✨ Learn Basic Math!
        </h1>
        <p className="text-base text-gray-700 mb-4 leading-snug">
          Fun and easy math! Kids learn numbers, addition, subtraction, and number order through playful gestures and visuals.
        </p>
        <button
          onClick={handleNavigate}
          className="bg-emerald-400 hover:bg-emerald-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
        >
          🚀 Let's Practice!
        </button>
      </div>
    </div>
  );
};

export default MathsIntro;
