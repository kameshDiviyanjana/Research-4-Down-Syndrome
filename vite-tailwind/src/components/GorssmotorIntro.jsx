import grossSkill from "../assets/grossmotor.png";
import { useNavigate } from "react-router-dom";

const GorssmotorIntro = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/grossmotor");
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:py-16 md:px-32">
      {/* Left Section: Text Content */}
      <div className="relative mt-8 md:mt-0">
        <img
          src={grossSkill}
          alt="writng Illustration"
          className="w-full max-w-md"
        />
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4"></div>
      </div>

      {/* Right Section: Illustration */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-emerald-500 mb-4">
          Gross motor skills development
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Move, play, and grow strong! Through exciting activities like tracing,
          tapping, and swiping, kids can build their coordination and motor
          skills while having a blast. Ready to get those little hands moving?
          Let’s start the fun!
        </p>
        <button className="bg-emerald-50 text-emerald-500 font-semibold px-6 py-2 rounded-md hover:bg-emerald-100 transition" onClick={handleNavigate}>
          Lets Practice and Learn how to do it
        </button>
      </div>
    </div>
  );
};

export default GorssmotorIntro;
