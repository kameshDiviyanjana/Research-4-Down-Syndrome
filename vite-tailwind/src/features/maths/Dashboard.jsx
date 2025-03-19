import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/dashboard-bg.jpg";

const Dashboard = () => {
    const navigate = useNavigate();

    const buttonStyles = `
        flex items-center justify-center gap-2
        px-6 py-4 
        bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white rounded-xl 
        hover:from-blue-600 hover:to-indigo-700 
        transform hover:-translate-y-1 
        transition-all duration-300 
        shadow-md hover:shadow-lg
        text-lg font-medium
    `;

    return (
        <div 
            className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 "></div>

            {/* Main Card */}
            <div className="relative z-10 mt-[95px] p-8 rounded-2xl shadow-xl max-w-2xl w-full animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
                    Welcome to 
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Maths Learning</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 text-center font-light">Your Interactive Learning Dashboard</p>

                {/* Button Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate("/math/numbers")}
                        className={buttonStyles}
                    >
                        <span className="text-2xl">🔢</span> Learn Numbers
                    </button>
                    <button 
                        onClick={() => navigate("/math/sequence")}
                        className={buttonStyles}
                    >
                        <span className="text-2xl">🔢</span> Number Sequence
                    </button>
                    <button 
                        onClick={() => navigate("/math/addition")}
                        className={buttonStyles}
                    >
                        <span className="text-2xl">➕</span> Addition
                    </button>
                    <button 
                        onClick={() => navigate("/math/subtraction")}
                        className={buttonStyles}
                    >
                        <span className="text-2xl">➖</span> Subtraction
                    </button>
                    <button 
                        onClick={() => navigate("/math/progress")}
                        className={buttonStyles + " sm:col-span-2 w-3/4 mx-auto"}
                    >
                        <span className="text-2xl">📊</span> Track Progress
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;