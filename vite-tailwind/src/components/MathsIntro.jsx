import maths from "../assets/maths.png";
import { useNavigate } from "react-router-dom";

const MathsIntro = () => {
   const navigate = useNavigate();
   const handleNavigate = () => {
     navigate("/math/mathdashboard");
   };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between  p-6 rounded-2xl shadow-md space-y-8 md:space-y-0 md:space-x-10">
      {/* Left Section: Illustration */}
      <div className="relative flex justify-center">
        <img
          src={maths}
          alt="Math Illustration"
          className="w-[200px] max-w-xs md:max-w-md rounded-xl drop-shadow-xl"
        />
        {/* <div className="absolute top-0 left-0 bg-white text-emerald-500 font-bold py-1 px-3 rounded-full shadow text-sm transform -translate-x-3 -translate-y-3">
          Fun with Numbers 🔢
        </div> */}
      </div>

      {/* Right Section: Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-4 drop-shadow-md">
          ✨ Connecting Math Concepts!
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Counting and math have never been this fun! With simple hand gestures,
          kids can learn numbers, shapes, and basic math concepts in an
          interactive and playful way. Click below to start this hands-on math
          adventure!
        </p>
        <button
          onClick={handleNavigate}
          className="bg-emerald-400 hover:bg-emerald-500 text-white font-semibold text-md py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          🚀 Let's Practice and Learn!
        </button>
      </div>
    </div>

    // <div >
    //   {/* Left Section: Text Content */}
    //   {/* <div className="relative mt-8 md:mt-0">
    //     <img
    //       src={maths}
    //       alt="writng Illustration"
    //       className="w-full max-w-md"
    //     />
    //     {/* <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4"></div>
    //   </div> */}

    //   {/* Right Section: Illustration */}
    //   <div className="max-w-lg">
    //     <h1 className="text-4xl font-bold text-emerald-500 mb-4">
    //       Connecting Mathematical Concepts
    //     </h1>
    //     <p className="text-gray-600 text-lg mb-6">
    //       Counting and math have never been this fun! With simple hand gestures,
    //       kids can learn numbers, shapes, and basic math concepts in an
    //       interactive and playful way. Click below to start this hands-on math
    //       adventure!
    //     </p>
    //     <button
    //       className="bg-emerald-50 text-emerald-500 font-semibold px-6 py-2 rounded-md hover:bg-emerald-100 transition"
    //       onClick={handleNavigate}
    //     >
    //       Lets Practice and Learn how to do it
    //     </button>
    //   </div>
    // </div>
  );
};

export default MathsIntro;
