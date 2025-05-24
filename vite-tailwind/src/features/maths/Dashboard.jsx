import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import backgroundImage from "../../assets/dashboard-bg.jpg";
import bgMusic from '../../assets/bgmusic.mp3';
import FishModel from "../maths/models/FishModel";
import ClownfishModel from "./models/ClownfishModel";
import TropicalFishSchoolModel from "./models/TropicalFishSchoolModel";
import useLanguageStore from "../maths/store/languageStore";

const Dashboard = () => {
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    console.log("User ID from localStorage:", userId);
  }, []);

  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguageStore();

  const translations = {
    en: {
      welcome: "DASHBOARD",
      subtitle: "Your Interactive Learning Dashboard",
      numbers: "Learn Numbers",
      sequence: "Number Sequence",
      addition: "Addition",
      subtraction: "Subtraction",
      progress: "Track Progress",
    },
    si: {
      welcome: "සාදරයෙන් පිළිගනිමු",
      subtitle: "ඔබේ අන්තර්ක්‍රියාකාරී ඉගෙනුම් උපකරණ පුවරුව",
      numbers: "ඉලක්කම් ඉගෙන ගන්න",
      sequence: "ඉලක්කම් අනු පිළිවෙළ",
      addition: "එකතු කිරීම",
      subtraction: "අඩු කිරීම",
      progress: "ප්‍රගතිය ලුහුබඳින්න",
    },
  };

  return (
    <div
      className="relative w-screen min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-blue-100 to-blue-200 overflow-hidden md:bg-none"
      style={{ backgroundImage: window.innerWidth >= 768 ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Background Music (Desktop Only) */}
      <audio autoPlay loop className="hidden md:block">
        <source src={bgMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="absolute top-4 right-5 z-20">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {language === "en" ? "සිංහල" : "English"}
        </button>
      </div>

      {/* Main Card */}
      <div className="relative z-10 mt-4 sm:mt-[-150px] rounded-2xl max-w-lg w-full p-6 sm:p-8 bg-white/90 md:bg-white/10 backdrop-blur-sm shadow-xl animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-3 text-center">
          {translations[language]?.welcome}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-center md:hidden">
          {translations[language]?.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 sm:px-10 mt-6 sm:mt-0">
  <button
    onClick={() => navigate("/math/numbers")}
    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-aqua-400 to-teal-500 text-black rounded-xl hover:from-aqua-500 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold w-full"
  >
    <span className="text-xl sm:text-2xl">🔢</span> {translations[language].numbers}
  </button>

  <button
    onClick={() => navigate("/math/sequence")}
    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-aqua-400 to-teal-500 text-black rounded-xl hover:from-aqua-500 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold w-full"
  >
    <span className="text-xl sm:text-2xl">🔢</span> {translations[language].sequence}
  </button>

  <button
    onClick={() => navigate("/math/addition")}
    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-aqua-400 to-teal-500 text-black rounded-xl hover:from-aqua-500 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold w-full"
  >
    <span className="text-xl sm:text-2xl">➕</span> {translations[language].addition}
  </button>

  <button
    onClick={() => navigate("/math/subtraction")}
    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-aqua-400 to-teal-500 text-black rounded-xl hover:from-aqua-500 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold w-full"
  >
    <span className="text-lg sm:text-xl">➖</span> {translations[language].subtraction}
  </button>

  <button
    onClick={() => navigate("/math/progress")}
    className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-aqua-400 to-teal-500 text-black rounded-xl hover:from-aqua-500 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-semibold w-full sm:col-span-2"
  >
    <span className="text-lg sm:text-xl">📊</span> {translations[language].progress}
  </button>
</div>


      </div>

      {/* Fish Model Canvas in bottom-right (Desktop Only) */}
      <div className="hidden md:block absolute bottom-4 left-4 w-[600px] h-[700px] z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <ambientLight intensity={4} />
          <Suspense fallback={null}>
            <FishModel />
          </Suspense>
        </Canvas>
      </div>

      {/* ClownFish Model Canvas in bottom-left (Desktop Only) */}
      <div className="hidden md:block absolute bottom-4 right-4 w-[600px] h-[700px] z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <ambientLight intensity={2.5} />
          <Suspense fallback={null}>
            <ClownfishModel />
          </Suspense>
        </Canvas>
      </div>

      {/* Tropical Fish School (Desktop Only) */}
      <div className="hidden md:block absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-screen h-[900px] z-15 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 2.5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[2, 5, 2]} intensity={2} castShadow />
          <pointLight position={[0, 1, 0]} intensity={3} distance={10} decay={2} color="white" />
          <Suspense fallback={null}>
            <TropicalFishSchoolModel
              scale={0.5}
              moveDistanceX={0.4}
              moveDistanceY={0.5}
              moveDuration={10}
              rotationSpeed={0.001}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Dashboard;