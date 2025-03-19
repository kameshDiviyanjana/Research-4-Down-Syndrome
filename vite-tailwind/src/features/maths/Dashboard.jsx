import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import numbersImg from "../../assets/dash.png"; 
import backgroundImage from "../../assets/dashboard-bg.jpg"; 

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="relative w-screen h-screen bg-cover bg-center flex items-end justify-center pb-40"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="text-center bg-white bg-opacity-85 p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-orange-500">Maths Learning</span>
                </h1>
                <p className="text-xl text-gray-600 mb-6">Learning Dashboard</p>

                {/* Button Grid Layout */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate("/math/numbers")} 
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        🔢 Learn Numbers
                    </button>
                    <button 
                        onClick={() => navigate("/math/sequence")} 
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        🔢 Number Sequence
                    </button>
                    <button 
                        onClick={() => navigate("/math/addition")} 
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        ➕ Addition
                    </button>
                    <button 
                        onClick={() => navigate("/math/subtraction")} 
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        ➖ Subtraction
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
