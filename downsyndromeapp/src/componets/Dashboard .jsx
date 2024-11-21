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
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const move = () => {
    navigate("/kkk"); // Navigate to the nested 'kkk' route
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={move}>Go to Move</button>
      {/* Renders nested routes */}
      <Outlet />
    </div>
  );
}

export default Dashboard;


