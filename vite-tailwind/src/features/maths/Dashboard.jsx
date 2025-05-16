import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import backgroundImage from "../../assets/dashboard-bg.jpg";
import FishModel from "../maths/models/FishModel";
// import TurtleModel from "../models/TurtleModel";
import bgMusic from '../../assets/bgmusic.mp3';
import ClownfishModel from "./models/ClownfishModel";
// import CrabModel from "./models/CrabModel";
import TropicalFishSchoolModel from "./models/TropicalFishSchoolModel";

const Dashboard = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState("en");

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
            sequence: "ඉලක්කම් අනුක්‍රමය",
            addition: "එකතු කිරීම",
            subtraction: "අඩු කිරීම",
            progress: "ප්‍රගතිය ලුහුබඳින්න",
        },
    };

    const buttonStyles = `
    flex items-center justify-center gap-2
    px-4 py-2 
    bg-gradient-to-r from-aqua-400 to-teal-500 
    text-white rounded-lg 
    hover:from-aqua-500 hover:to-teal-600 
    transform hover:-translate-y-0.5 
    transition-all duration-300 
    shadow-sm hover:shadow-md
    text-base font-medium
    w-full
`;

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "si" : "en");
    };

    return (
        <div 
            className="relative w-screen min-h-screen bg-cover bg-center flex items-center justify-center p-4 sm:p-6 overflow-hidden"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Background Music */}
            <audio autoPlay loop>
                <source src={bgMusic} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    {language === "en" ? "සිංහල" : "English"}
                </button>
            </div>

            {/* Main Card */}
            <div className="relative z-10 mt-[-350px] rounded-2xl max-w-lg w-full animate-fade-in p-6 sm:p-8">
                <h1 className="text-4xl md:text-3xl font-extrabold text-black mb-3 text-center">
                    {translations[language]?.welcome}{" "}
                    {/* <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-black">
                        Maths Learning
                    </span> */}
                </h1>
                

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-10 pr-10">
                    <button onClick={() => navigate(`/math/numbers?lang=${language}`)} className={buttonStyles}>
                        <span className="text-xl">🔢</span> {translations[language].numbers}
                    </button>
                    <button onClick={() => navigate(`/math/sequence?lang=${language}`)} className={buttonStyles}>
                        <span className="text-xl">🔢</span> {translations[language].sequence}
                    </button>
                    <button onClick={() => navigate(`/math/addition?lang=${language}`)} className={buttonStyles}>
                        <span className="text-xl">➕</span> {translations[language].addition}
                    </button>
                    <button onClick={() => navigate(`/math/subtraction?lang=${language}`)} className={buttonStyles}>
                        <span className="text-xl">➖</span> {translations[language].subtraction}
                    </button>
                    <button
                        onClick={() => navigate(`/math/progress?lang=${language}`)}
                        className={buttonStyles + " sm:col-span-2"}
                    >
                        <span className="text-xl">📊</span> {translations[language].progress}
                    </button>
                </div>
            </div>

            {/* Fish Model Canvas in bottom-right */}
            <div className="absolute bottom-4 left-4 w-[600px] h-[700px] z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                    <ambientLight intensity={4} />
                    <Suspense fallback={null}>
                        <FishModel />
                    </Suspense>
                </Canvas>
            </div>

            {/* ClownFish Model Canvas in bottom-left */}
            <div className="absolute bottom-4 right-4 w-[600px] h-[700px] z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                    <ambientLight intensity={2.5} />
                    <Suspense fallback={null}>
                        <ClownfishModel />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-screen h-[900px] z-15 pointer-events-none">
    <Canvas camera={{ position: [0, 2, 2.5], fov: 50 }}> {/* Adjusted camera position */}
        {/* Ambient light for soft overall lighting */}
        <ambientLight intensity={0.3} /> 

        {/* Add a stronger directional light for dynamic lighting */}
        <directionalLight 
            position={[2, 5, 2]} 
            intensity={2} 
            castShadow 
        />

        {/* Add a point light to increase brightness and create more dynamic light spots */}
        <pointLight 
            position={[0, 1, 0]} 
            intensity={3} 
            distance={10} 
            decay={2} 
            color="white" 
        />

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