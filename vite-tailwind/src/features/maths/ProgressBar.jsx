import React, { useEffect, useState } from "react";
import { getProgress } from "../../utils/progress";
import "./ProgressBar.css";

const ProgressBar = () => {
    const [progress, setProgress] = useState(getProgress());

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(getProgress());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="progress-container">
            <h2>📊 Your Progress</h2>
            {Object.keys(progress).map((activity) => (
                <div key={activity} className="progress-item">
                    <span className="activity-label">{activity.toUpperCase()}</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress[activity].completion}%` }}>
                            {progress[activity].completion}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
