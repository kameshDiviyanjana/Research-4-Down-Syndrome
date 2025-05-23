import React, { useState } from "react";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import Vehicale from "../../../utile/Vehicale.json";
import car from "../../../assets/car55.jpeg";
import Motorcycle from "../../../assets/bike.jpeg";
import Bicycle from "../../../assets/bicycle.jpeg";
import Lory from "../../../assets/Lorry.avif";
import Train from "../../../assets/train.jpeg";
import Bus from "../../../assets/bus.jpeg";
import Van from "../../../assets/van.jpeg";
import Button from "../../../atomes/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg1 from "../../../../public/images/bg3.jpg";

const imageMapping = {
  Car: car,
  Motorcycle: Motorcycle,
  Bicycle: Bicycle,
  Van: Van,
  Lory: Lory,
  Train: Train,
  Bus: Bus,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInTop = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function TestDashbord() {

    const navigate = useNavigate();
    const [pagecount, setPagecount] = useState(0);
    const totalVehicles = Vehicale.Vehicale.length;
    const nextWord = () => setPagecount((prev) => (prev + 1) % totalVehicles);
    const prevWord = () =>
      setPagecount((prev) => (prev - 1 + totalVehicles) % totalVehicles);

    const currentVehicle = Vehicale.Vehicale[pagecount];
    const imagePath = imageMapping[currentVehicle?.word] || "/default.jpg";
    const navigateLetters = () => {
      navigate("/vocabulary/aplpabte");
    };

    const navigateAlphabet = () => {
      navigate("/vocabulary/dectation");
    };
  return (
    // <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center  w-full">
    //   <div className="py-12 px-8">
    //     {/* Sun & Bush Images */}
    //     <div className=" flex flex-row">
    //       <div className="h-full w-full flex flex-col items-center text-center p-2">
    //         {/* Alpert Sound Section */}
    //         <h1 className="text-4xl font-extrabold text-blue-700 mt-8">
    //           🏆 Alphabet Sound
    //         </h1>
    //         <p className="text-xl text-gray-700 mt-2 font-semibold">
    //           Let's start the adventure! 🚀
    //         </p>

    //         {/* Animated Icon */}
    //         <div
    //           className="mt-6 w-24 h-24 bg-yellow-400 flex items-center justify-center
    //               rounded-full shadow-xl animate-bounce border-4 border-white"
    //         >
    //           <span className="text-5xl text-white">✨</span>
    //         </div>

    //         {/* Start Practice Button */}
    //         <button
    //           className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-extrabold
    //            py-4 px-8 rounded-full shadow-xl mt-6 hover:scale-105 active:scale-95
    //            transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-yellow-300"
    //           onClick={navigateAlphabet}
    //         >
    //           🚀 Start Practice 🎉
    //         </button>
    //       </div>

    //       <div className="h-full w-full flex flex-col items-center text-center p-4">
    //         {/* Letter Sound Section */}
    //         <h1 className="text-4xl font-extrabold text-blue-700 mt-8">
    //           🔤 Letter Sound
    //         </h1>
    //         <p className="text-xl text-gray-700 mt-2 font-semibold">
    //           Let's explore letters! 🎈
    //         </p>

    //         {/* Animated Icon */}
    //         <div
    //           className="mt-6 w-24 h-24 bg-yellow-400 flex items-center justify-center
    //               rounded-full shadow-xl animate-pulse border-4 border-white"
    //         >
    //           <span className="text-5xl text-white">🔠</span>
    //         </div>

    //         {/* Start Practice Button */}
    //         <button
    //           className="bg-gradient-to-r from-purple-400 to-blue-500 text-white text-lg font-extrabold
    //            py-4 px-8 rounded-full shadow-xl mt-6 hover:scale-105 active:scale-95
    //            transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-blue-300"
    //           onClick={navigateLetters}
    //         >
    //           🎵 Start Practice 🎶
    //         </button>
    //       </div>
    //     </div>
    //     <div className=" mb-16">

    //     </div>
    //   </div>
    // </div>

    // <div className="mt-16 flex flex-col items-center text-center bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-yellow-300 max-w-4xl mx-auto">
    //   <h1 className="text-4xl font-extrabold text-pink-600 mb-4">
    //     🧠 Fun Quiz Time!
    //   </h1>
    //   <p className="text-xl text-gray-800 font-semibold mb-6">
    //     Test your knowledge with exciting quizzes! 🎯
    //   </p>

    //   {/* Quiz Image */}
    //   <div className="mb-6">
    //     <img
    //       src="https://cdn.pixabay.com/photo/2014/04/02/10/56/question-mark-305567_960_720.png"
    //       alt="Quiz"
    //       className="w-32 h-32 animate-wiggle"
    //     />
    //   </div>

    //   {/* Start Quiz Button */}
    //   <button
    //     className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-lg font-extrabold
    //   py-4 px-10 rounded-full shadow-xl hover:scale-105 active:scale-95
    //   transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-green-300"
    //     onClick={navigateLetters}
    //   >
    //     🎉 Start Quiz 🎯
    //   </button>
    // </div>
    // <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center  w-full  h-[900px] flex items-center justify-center">
    //   <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
    //     {/* Single Letter Learning */}
    //     <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-pink-300 flex flex-col items-center">
    //       <h2 className="text-3xl font-extrabold text-pink-600 mb-4">
    //         🔠 Learn One Letter
    //       </h2>
    //       <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
    //         Discover each letter one by one with sound and fun visuals! 🎨
    //       </p>

    //       {/* Fun Animated Icon */}
    //       <div className="w-24 h-24 bg-pink-200 flex items-center justify-center rounded-full shadow-lg animate-bounce border-4 border-white mb-6">
    //         <span className="text-4xl">📚</span>
    //       </div>

    //       {/* Button */}
    //       <button
    //         className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
    //         onClick={navigateAlphabet}
    //       >
    //         🧠 Start Learning
    //       </button>
    //     </div>

    //     {/* Alphabet Free Learning */}
    //     <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-blue-300 flex flex-col items-center">
    //       <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
    //         🔤 Alphabet Free Learn
    //       </h2>
    //       <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
    //         Explore all letters with sounds, images, and animations! 🌈
    //       </p>

    //       {/* Fun Icon */}
    //       <div className="w-24 h-24 bg-blue-200 flex items-center justify-center rounded-full shadow-lg animate-pulse border-4 border-white mb-6">
    //         <span className="text-4xl">🧩</span>
    //       </div>

    //       {/* Button */}
    //       <button
    //         className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
    //         onClick={navigateLetters}
    //       >
    //         🚀 Explore Now
    //       </button>
    //     </div>
    //   </div>
    // </div>

    // <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center w-full h-[900px] ">
    //   <div className="flex items-center justify-center">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
    //       {/* Single Letter Learning */}
    //       <motion.div
    //         variants={slideInLeft}
    //         initial="hidden"
    //         animate="visible"
    //         transition={{ duration: 0.8, ease: "easeOut" }}
    //         className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-pink-300 flex flex-col items-center"
    //       >
    //         <h2 className="text-3xl font-extrabold text-pink-600 mb-4">
    //           🔠 Learn One Letter
    //         </h2>
    //         <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
    //           Discover each letter one by one with sound and fun visuals! 🎨
    //         </p>
    //         <div className="w-24 h-24 bg-pink-200 flex items-center justify-center rounded-full shadow-lg animate-bounce border-4 border-white mb-6">
    //           <span className="text-4xl">📚</span>
    //         </div>
    //         <button
    //           className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
    //           onClick={navigateAlphabet}
    //         >
    //           🧠 Start Learning
    //         </button>
    //       </motion.div>

    //       {/* Alphabet Free Learning */}
    //       <motion.div
    //         variants={slideInRight}
    //         initial="hidden"
    //         animate="visible"
    //         transition={{ duration: 0.8, ease: "easeOut" }}
    //         className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-blue-300 flex flex-col items-center"
    //       >
    //         <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
    //           🔤 Alphabet Free Learn
    //         </h2>
    //         <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
    //           Explore all letters with sounds, images, and animations! 🌈
    //         </p>
    //         <div className="w-24 h-24 bg-blue-200 flex items-center justify-center rounded-full shadow-lg animate-pulse border-4 border-white mb-6">
    //           <span className="text-4xl">🧩</span>
    //         </div>
    //         <button
    //           className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
    //           onClick={navigateLetters}
    //         >
    //           🚀 Explore Now
    //         </button>
    //       </motion.div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="bg-cover bg-no-repeat bg-center w-full justify-center items-center text-center p-6 h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
       
      }}
    >
      <div className="grid grid-cols-1 gap-8 px-6">
        {/* 🏆 Scoreboard */}
        <motion.div
          variants={fadeInTop}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border-4 border-yellow-400 flex items-center justify-center mb-6"
        >
          <h3 className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
            🏆 Score: <span className="text-3xl text-yellow-600">120</span>
          </h3>
        </motion.div>

        {/* Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Single Letter Learning */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-pink-300 flex flex-col items-center"
          >
            <h2 className="text-3xl font-extrabold text-pink-600 mb-4">
              🔠 Learn One Letter
            </h2>
            <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
              Discover each letter one by one with sound and fun visuals! 🎨
            </p>
            <div className="w-24 h-24 bg-pink-200 flex items-center justify-center rounded-full shadow-lg animate-bounce border-4 border-white mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <button
              className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={navigateAlphabet}
            >
              🧠 Start Learning
            </button>
          </motion.div>

          {/* Alphabet Free Learning */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-blue-300 flex flex-col items-center"
          >
            <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
              🔤 Alphabet Free Learn
            </h2>
            <p className="text-lg text-gray-700 font-semibold mb-4 text-center">
              Explore all letters with sounds, images, and animations! 🌈
            </p>
            <div className="w-24 h-24 bg-blue-200 flex items-center justify-center rounded-full shadow-lg animate-pulse border-4 border-white mb-6">
              <span className="text-4xl">🧩</span>
            </div>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={navigateLetters}
            >
              🚀 Explore Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TestDashbord;
