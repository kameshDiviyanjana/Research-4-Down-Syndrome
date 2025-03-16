import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Mathskills from "../features/maths/Mathskills";
import { AuthProvider } from "../auth/AuthProvider";
import MathLearing from "../features/maths/MathLearing";

import Dashboard from "../features/maths/Dashboard";
import NumberLearning from "../features/maths/NumberLearning";
import SequenceLearning from "../features/maths/SequenceLearning";
import ActivityPage from "../features/maths/ActivityPage";
import AdditionLearning from "../features/maths/AdditionLearning";
import SubtractionLearning from "../features/maths/SubtractionLearning";
import SequencePractice from "../features/maths/SequencePractice";
import AdditionPractice from "../features/maths/AdditionPractice";
import NumberPractice from "../features/maths/NumberPractice";
import SubtractionPractice from "../features/maths/SequencePractice";





function MathskillRoute() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* <Route path="" element={<Mathskills />} />
          <Route path="learing" element={<MathLearing />} /> */}
          <Route path="mathdashboard" element={<Dashboard />} />
                <Route path="numbers" element={<ActivityPage title="Numbers" learningComponent={<NumberLearning/>} practiceComponent={<NumberPractice />} />} />
                <Route path="sequence" element={<ActivityPage title="sequence" learningComponent={<SequenceLearning />} practiceComponent={<SequencePractice/>} />} />
                <Route path="addition" element={<ActivityPage title="sequence" learningComponent={<AdditionLearning />} practiceComponent={<AdditionPractice />} />} />
                <Route path="subtraction" element={<ActivityPage title="sequence" learningComponent={<SubtractionLearning />} practiceComponent={<SubtractionPractice/>} />} />
            
        </Routes>
      </AuthProvider>
      <Outlet />
    </div>
  );
}

export default MathskillRoute;
