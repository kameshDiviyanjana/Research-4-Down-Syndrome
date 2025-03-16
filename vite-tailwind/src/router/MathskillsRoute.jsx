import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Mathskills from "../features/maths/Mathskills";
import { AuthProvider } from "../auth/AuthProvider";
import MathLearing from "../features/maths/MathLearing";

function MathskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Mathskills />} />
          <Route path="learing" element={<MathLearing />} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default MathskillRoute;
