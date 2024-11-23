// import React from 'react'
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirecting
// function Dashboard () {
//     const navigate = useNavigate();
//     const move = ()=>{
//       navigate("kkk");
//     }
//   return (
//     <div>
//       <h1 onClick={move}>dashhk</h1>
//     </div>
//   );
// }

// export default Dashboard 

// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("kkk"); // Navigate to the nested "kkk" route within "/dashboard"
//   };

//   return (
//     <div>
//       <h1 onClick={handleNavigate} style={{ cursor: "pointer" }}>
//         Dashboard
//       </h1>
//     </div>
//   );
// }

// export default Dashboard;
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import mic from "../assets/mic-svgrepo-com.svg";
import write from "../assets/write-document-svgrepo-com.svg";
import math from "../assets/maths-svgrepo-com.svg";
import teach from "../assets/teacher-svgrepo-com.svg";
function Dashboard() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const move = () => {
    navigate("/kkk"); // Navigate to the nested 'kkk' route
  };
   

  return (
    <div>
      <div className=" py-4 px-6">
        <div className="  lg:ml-60 lg:mr-60">
          <div className=" py-16 px-12">
            <div className="  grid grid-cols-2 ">
              <div className=" border-r-2 border-b-2 border-[#F18F02] flex justify-center py-6 px-7">
                <img src={mic} alt="image" className=" h-48" onClick={move} />
              </div>
              <div className="border-b-2 border-[#F18F02] flex justify-center py-6 px-7">
                <img src={write} alt="image" className=" h-48" onClick={move} />
              </div>
            </div>
            <div className="  grid grid-cols-2  ">
              <div className="border-r-2  border-[#F18F02] flex justify-center py-12 px-7">
                <img src={math} alt="image" className=" h-48" onClick={move} />
              </div>
              <div className=" flex justify-center py-12 px-7">
                <img src={teach} alt="image" className=" h-48" onClick={move} />
              </div>
            </div>
          </div>
        </div>

        {/* Renders nested routes */}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}

export default Dashboard;


