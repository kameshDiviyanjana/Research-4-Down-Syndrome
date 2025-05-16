// src/App.jsx
import React, { useState } from 'react';
import Step1Shapes from './steps/Step1Shapes';   // Now implemented
import Step2Strokes from './steps/Step2Strokes';
import Step3Letters from './steps/Step3Letters'; // Now implemented

function App() {
  // Later, you'll use state to switch between steps
  // For now, we directly render Step2Strokes for testing
  const [currentStepComponent, setCurrentStepComponent] = useState("strokes"); // 'shapes', 'strokes', 'letters'

  // A simple navigation (you can make this a proper component later)
  const renderNavigation = () => (
    <nav className="bg-blue-600 p-4 text-white flex justify-center space-x-4">
      <button
        onClick={() => setCurrentStepComponent("shapes")}
        className={`px-3 py-2 rounded ${currentStepComponent === 'shapes' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
      >
        Shapes (Step 1)
      </button>
      <button
        onClick={() => setCurrentStepComponent("strokes")}
        className={`px-3 py-2 rounded ${currentStepComponent === 'strokes' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
      >
        Strokes (Step 2)
      </button>
      <button
        onClick={() => setCurrentStepComponent("letters")}
        className={`px-3 py-2 rounded ${currentStepComponent === 'letters' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
      >
        Letters (Step 3)
      </button>
    </nav>
  );
  const renderStep = () => {
    if (currentStepComponent === "strokes") {
      return <Step2Strokes />;
    }
    if (currentStepComponent === "letters") {
      return <Step3Letters />;
    }
    if (currentStepComponent === "shapes") {
      return <Step1Shapes />;
    }
    return <div className="p-10 text-center text-xl">Select a step to begin!</div>;
  };


  return (
    <div className="App min-h-screen bg-app-bg">
      {renderNavigation()}
      {/* For now, we only have Step2Strokes.
          Uncomment and implement other steps later.
      */}
      {renderStep()}
    </div>
  );
}

export default App;