// src/App.jsx
import React, { useState } from 'react';
import Step1Shapes from './steps/Step1Shapes';   // Now implemented
import Step2Strokes from './steps/Step2Strokes';
import Step3Letters from './steps/Step3Letters'; // Now implemented
import letterWritingBg from '../../../assets/letter writing background.png';
import whiteboardBg from '../../../assets/white board.png';

function App() {
  // State to track selected component or home screen
  const [currentStepComponent, setCurrentStepComponent] = useState(null); // null means show home screen with cards

  // Back button to return to home screen
  const renderBackButton = () => (
    <button 
      onClick={() => setCurrentStepComponent(null)}
      className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
    >
      <span className="mr-1">←</span> පෙර මෙනුව වෙත යන්න
    </button>
  );

  // Card selection view
  const renderCardSelection = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">ලියන ක්‍රියාකාරකම්</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shapes Card */}
        <div 
          onClick={() => setCurrentStepComponent("shapes")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer border-2 border-blue-200 hover:border-blue-500"
        >
          <h2 className="text-2xl font-bold text-center mb-4">හැඩතල</h2>
          <div className="h-32 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full"></div>
          </div>
          <p className="text-center mt-4">මූලික හැඩතල අදිමු</p>
        </div>

        {/* Strokes Card */}
        <div 
          onClick={() => setCurrentStepComponent("strokes")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer border-2 border-blue-200 hover:border-blue-500"
        >
          <h2 className="text-2xl font-bold text-center mb-4">චලන</h2>
          <div className="h-32 flex items-center justify-center">
            <div className="w-24 h-12 border-t-4 border-blue-500 rounded"></div>
          </div>
          <p className="text-center mt-4">චලන අදිමු</p>
        </div>

        {/* Letters Card */}
        <div 
          onClick={() => setCurrentStepComponent("letters")}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer border-2 border-blue-200 hover:border-blue-500"
        >
          <h2 className="text-2xl font-bold text-center mb-4">අකුරු</h2>
          <div className="h-32 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-500">අ</span>
          </div>
          <p className="text-center mt-4">අකුරු ලියන්න පුරුදු වෙමු</p>
        </div>
      </div>
    </div>
  );

  // Render the selected component
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
    return null; // This case is handled by showing the card selection
  };
  // Choose background based on whether home screen or activity screen
  const backgroundStyle = {
    backgroundImage: `url(${currentStepComponent === null ? letterWritingBg : whiteboardBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="App min-h-screen bg-gray-50" style={backgroundStyle}>
      {/* Show home page with cards or a specific activity */}
      {currentStepComponent === null ? (
        renderCardSelection()
      ) : (
        <div className="p-4"> 
          {renderBackButton()}
          {renderStep()}
        </div>
      )}
    </div>
  );
}

export default App;