// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ActivityPage.css";

// const ActivityPage = ({ title, learningComponent, practiceComponent }) => {
//     const navigate = useNavigate();
//     const [isLearning, setIsLearning] = React.useState(true);

//     return (
//         <div className="activity-container">
//             <h1>{title}</h1>
//             <div className="switch-buttons">
//                 <button onClick={() => setIsLearning(true)}>📖 Learning</button>
//                 <button onClick={() => setIsLearning(false)}>📝 Practice</button>
//             </div>

//             <div className="activity-content">
//                 {isLearning ? learningComponent : practiceComponent}
//             </div>

//             <button className="back-button" onClick={() => navigate("/")}>🔙 Back to Dashboard</button>
//         </div>
//     );
// };

// export default ActivityPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProgress } from "../../utils/progress";
import Swal from "sweetalert2";
import "./ActivityPage.css";

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
        <div className="activity-container-one">
        <div className="activity-container">
            {/* <h1>{title}</h1> */}
            <br></br>
            <br></br>
            <div className="switch-buttons">
                <button onClick={() => setIsLearning(true)}>📖 Learning</button>
                <button onClick={() => setIsLearning(false)}>📝 Practice</button>
            </div>

            <div className="activity-content">
                {isLearning ? learningComponent : practiceComponent}
            </div>

            {!isLearning && (
                <button className="complete-button" onClick={handleComplete}>
                    ✅ Mark as Complete
                </button>
            )}

            <button className="back-button" onClick={() => navigate("/")}>🔙 Back to Dashboard</button>
        </div>
        </div>
    );
};

export default ActivityPage;

