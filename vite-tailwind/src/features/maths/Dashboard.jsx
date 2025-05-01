import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/dashboard-bg.jpg";

const Dashboard = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState("en"); // Default to English

    const translations = {
        en: {
            welcome: "Welcome to",
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
        bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white rounded-lg 
        hover:from-blue-600 hover:to-indigo-700 
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
            className="relative w-screen min-h-screen bg-cover bg-center flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Language Toggle Button */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                    {language === "en" ? "සිංහල" : "English"}
                </button>
            </div>

            {/* Main Card */}
            <div className="relative z-10 mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl  max-w-lg w-full animate-fade-in">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center">
                    {translations[language].welcome}
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Maths Learning</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 text-center font-light">
                    {translations[language].subtitle}
                </p>

                {/* Button Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                        onClick={() => navigate(`/math/numbers?lang=${language}`)} 
                        className={buttonStyles}
                    >
                        <span className="text-xl">🔢</span> {translations[language].numbers}
                    </button>
                    <button 
                        onClick={() => navigate(`/math/sequence?lang=${language}`)}
                        className={buttonStyles}
                    >
                        <span className="text-xl">🔢</span> {translations[language].sequence}
                    </button>
                    <button 
                        onClick={() => navigate(`/math/addition?lang=${language}`)}
                        className={buttonStyles}
                    >
                        <span className="text-xl">➕</span> {translations[language].addition}
                    </button>
                    <button 
                        onClick={() => navigate(`/math/subtraction?lang=${language}`)}
                        className={buttonStyles}
                    >
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
        </div>
    );
};

export default Dashboard;