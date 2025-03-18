import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProgress } from "../../utils/progress";
import Swal from "sweetalert2";

const ActivityPage = ({ title, activityKey, learningComponent, practiceComponent }) => {
    const navigate = useNavigate();
    const [isLearning, setIsLearning] = useState(true);

    const handleComplete = () => {
        updateProgress(activityKey);
        Swal.fire({
            title: "🎉 Activity Completed!",
            text: "You have successfully completed this activity.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
        });

        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div className={`min-h-screen w-full ${isLearning ? "bg-transparent" : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"} flex flex-col items-center justify-between`}>
            {/* Switch Buttons - Centered at the Top */}
            <div className="w-full flex justify-center pt-6 mb-2">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsLearning(true)}
                        className="bg-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
                    >
                        📖 Learning
                    </button>
                    <button
                        onClick={() => setIsLearning(false)}
                        className="bg-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 active:scale-95 transition-all duration-200"
                    >
                        📝 Practice
                    </button>
                </div>
            </div>

            {/* Content Area - No styling to respect learningComponent */}
            <div className="flex-grow w-full flex items-center justify-center">
                {isLearning ? learningComponent : practiceComponent}
            </div>

            {/* Footer Buttons - Fixed at Bottom with Spacing */}
            <div className="w-full flex justify-center pb-6 space-x-4 mt-2">
                {!isLearning && (
                    <button
                        onClick={handleComplete}
                        className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 active:scale-95 transition-all duration-200"
                    >
                        ✅ Mark as Complete
                    </button>
                )}
                <button
                    onClick={() => navigate("/math/mathdashboard")}
                    className="bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
                >
                    🔙 Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ActivityPage;