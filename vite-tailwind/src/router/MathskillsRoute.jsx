import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Mathskills from "../features/maths/Mathskills";
import { AuthProvider } from "../auth/AuthProvider";
import MathLearing from "../features/maths/MathLearing";
import Dashboard from "../features/maths/Dashboard";
import NumberLearning from "../features/maths/NumberLearning";
import SequenceLearning from "../features/maths/SequenceLearning";
import AdditionLearning from "../features/maths/AdditionLearning";
import SubtractionLearning from "../features/maths/SubtractionLearning";
import SequencePractice from "../features/maths/SequencePractice";
import AdditionPractice from "../features/maths/AdditionPractice";
import NumberPractice from "../features/maths/NumberPractice";
import SubtractionPractice from "../features/maths/SubtractionPractice";
import ProgressBar from "../features/maths/ProgressBar";

function MathskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="mathdashboard" element={<Dashboard />} />
          
          {/* Numbers Routes */}
          <Route path="numbers" element={<NumberLearning />} />
          <Route path="numbers/practice" element={<NumberPractice />} />

          {/* Sequence Routes */}
          <Route path="sequence" element={<SequenceLearning />} />
          <Route path="sequence/practice" element={<SequencePractice />} />

          {/* Addition Routes */}
          <Route path="addition" element={<AdditionLearning />} />
          <Route path="addition/practice" element={<AdditionPractice />} />

          {/* Subtraction Routes */}
          <Route path="subtraction" element={<SubtractionLearning />} />
          <Route path="subtraction/practice" element={<SubtractionPractice />} />

          <Route path="progress" element={<ProgressBar />} />
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default MathskillRoute;