// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ProgressBar from "./ProgressBar";
// import "./Dashboard.css";
// import numbersImg from "../assets/dash.png";

// const Dashboard = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="dashboard-container">
//             <h1>📚 Learning Dashboard</h1>
//             <ProgressBar />
//             <img src={numbersImg} alt="Numbers" className="activity-img" />
//             <div className="activity-buttons">
//                 <button onClick={() => navigate("/numbers")}>🔢 Learn Numbers</button>
//                 <button onClick={() => navigate("/sequence")}>🔢 Number Sequence</button>
//                 <button onClick={() => navigate("/addition")}>➕ Addition</button>
//                 <button onClick={() => navigate("/subtraction")}>➖ Subtraction</button>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import backgroundImage from "../../assets/dashboard-bg.jpg"; 



import ProgressBar from "./ProgressBar";

import numbersImg from "../../assets/dash.png";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div >
                <br></br>
                <br></br>
                <br></br>
                <h1>Welcome to <span className="highlight">Maths Learning</span></h1>
                <p>Learning Dashboard</p>
                {/* <button className="start-button" onClick={() => navigate("/activities")}>Start Practice</button>
                <button className="start-button" onClick={() => navigate("/activities")}>Start Practice</button> */}
                <div className="activity-buttons">
                <button onClick={() => navigate("/math/numbers")}>🔢 Learn Numbers</button>
                <button onClick={() => navigate("/math/sequence")}>🔢 Number Sequence</button>&nbsp;&nbsp;
                 <button onClick={() => navigate("/math/addition")}>➕ Addition</button>&nbsp;&nbsp;
                 <button onClick={() => navigate("/math/subtraction")}>➖ Subtraction</button>
             </div>
            </div>
        </div>



    );
};

export default Dashboard;
