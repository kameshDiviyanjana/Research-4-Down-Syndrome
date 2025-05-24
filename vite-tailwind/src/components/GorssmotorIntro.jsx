import grossSkill from "../assets/grossmotor.png";
import { useNavigate } from "react-router-dom";

const GorssmotorIntro = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/grossmotor");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-md space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Section: Illustration */}
      <div className="flex justify-center">
        <img
          src={grossSkill}
          alt="Gross Motor Skills Illustration"
          className="w-[140px] max-w-xs rounded-lg drop-shadow"
        />
      </div>

      {/* Right Section: Text Content */}
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2 drop-shadow-md">
          💪 Gross Motor Fun!
        </h1>
        <p className="text-base text-gray-700 mb-4 leading-snug">
          Move, play, and grow! Tracing and tapping help kids build coordination and motor skills.
        </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow transition duration-300"
          onClick={handleNavigate}
        >
          🧠 Let's Start!
        </button>
      </div>
    </div>
  );
};

export default GorssmotorIntro;
