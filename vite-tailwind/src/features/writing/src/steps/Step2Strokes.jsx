// src/steps/Step2Strokes.jsx
import { useState, useRef } from 'react';
import LetterDisplay from '../components/LetterDisplay';
import LetterAnimator from '../components/LetterAnimator';
import TracingCanvas from '../components/TracingCanvas';

// Import all SVGs
import alapillaSVGPath from '../../../../assets/strokes/alapilla.svg';
import ketiAdayaSVGPath from '../../../../assets/strokes/keti_adaya.svg';
import deergaAdayaSVGPath from '../../../../assets/strokes/deerga_adaya.svg';
import ketiIspillaSVGPath from '../../../../assets/strokes/keti_ispilla.svg';
import deergaIspillaSVGPath from '../../../../assets/strokes/deerga_ispilla.svg';
import ketiPapillaSVGPath from '../../../../assets/strokes/keti_papilla.svg';
import deergaPapillaSVGPath from '../../../../assets/strokes/deerga_papilla.svg';
import gaetayaSahithaAlapillaSVGPath from '../../../../assets/strokes/gaetaya_sahitha_alapilla.svg';
import gaetayaSahithaAlapilliDekaSVGPath from '../../../../assets/strokes/gaetaya_sahitha_alapilli_deka.svg';
import kombuwaSVGPath from '../../../../assets/strokes/kombuwa.svg';
import kombuwaSahaHalSVGPath from '../../../../assets/strokes/kombuwa_saha_hal.svg';
import kombuDekaSVGPath from '../../../../assets/strokes/kombu_deka.svg';
import kombuwaSahaAlapillaSVGPath from '../../../../assets/strokes/kombuwa_saha_alapilla.svg';
import kombuwaAlapillaSahaHalSVGPath from '../../../../assets/strokes/kombuwa_alapilla_saha_hal.svg';
import kombuwaSahaGayanukitthaSVGPath from '../../../../assets/strokes/kombuwa_saha_gayanukiththa.svg';
import visargayaSVGPath from '../../../../assets/strokes/visargaya.svg';
import yanshayaSVGPath from '../../../../assets/strokes/yanshaya.svg';
import rakaranshayaSVGPath from '../../../../assets/strokes/rakaranshaya.svg';
import halLakunaSVGPath from '../../../../assets/strokes/hal_lakuna.svg';

function Step2Strokes() {
  // Define all available strokes
  const allStrokes = [
    { id: 'alapilla', name: 'ඇලපිල්ල', svg: alapillaSVGPath },
    { id: 'keti_adaya', name: 'කෙටි ඇදය', svg: ketiAdayaSVGPath },
    { id: 'deerga_adaya', name: 'දීර්ඝ ඇදය', svg: deergaAdayaSVGPath },
    { id: 'keti_ispilla', name: 'කෙටි ඉස්පිල්ල', svg: ketiIspillaSVGPath },
    { id: 'deerga_ispilla', name: 'දීර්ඝ ඉස්පිල්ල', svg: deergaIspillaSVGPath },
    { id: 'keti_papilla', name: 'කෙටි පාපිල්ල', svg: ketiPapillaSVGPath },
    { id: 'deerga_papilla', name: 'දීර්ඝ පාපිල්ල', svg: deergaPapillaSVGPath },
    { id: 'gaetaya_sahitha_alapilla', name: 'ගැටය සහිත ඇලපිල්ල', svg: gaetayaSahithaAlapillaSVGPath },
    { id: 'gaetaya_sahitha_alapilli_deka', name: 'ගැටය සහිත ඇලපිලි දෙක', svg: gaetayaSahithaAlapilliDekaSVGPath },
    { id: 'kombuwa', name: 'කොම්බුව', svg: kombuwaSVGPath },
    { id: 'kombuwa_saha_hal', name: 'කොම්බුව සහ හල් ලකුණ', svg: kombuwaSahaHalSVGPath },
    { id: 'kombu_deka', name: 'කොම්බු දෙක', svg: kombuDekaSVGPath },
    { id: 'kombuwa_saha_alapilla', name: 'කොම්බුව සහ ඇලපිල්ල', svg: kombuwaSahaAlapillaSVGPath },
    { id: 'kombuwa_alapilla_saha_hal', name: 'කොම්බුව, ඇලපිල්ල සහ හල් ලකුණ', svg: kombuwaAlapillaSahaHalSVGPath },    { id: 'kombuwa_saha_gayanukiththa', name: 'කොම්බුව සහ ගයනුකිත්ත', svg: kombuwaSahaGayanukitthaSVGPath },
    { id: 'visargaya', name: 'විසර්ගය', svg: visargayaSVGPath },
    { id: 'yanshaya', name: 'යංශය', svg: yanshayaSVGPath },
    { id: 'rakaranshaya', name: 'රකාරාංශය', svg: rakaranshayaSVGPath },
    { id: 'hal_lakuna', name: 'හල් ලකුණ', svg: halLakunaSVGPath }
  ];
  // State to track the current stroke
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const currentStroke = allStrokes[currentStrokeIndex];
  
  // State to control display mode
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Reference to the animator component
  const animatorRef = useRef(null);
  
  // Define the desired size for the display area. The canvas will match this.
  // Using larger dimensions for children with Down syndrome to improve accessibility
  const displayWidth = 500;
  const displayHeight = 500;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        Trace the Stroke: {currentStroke.name}
      </h1>      <div
        className="relative"
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, marginBottom: '50px' }}
      >
        {/* Show either LetterAnimator or LetterDisplay based on mode */}
        {showAnimation ? (
          <LetterAnimator 
            ref={animatorRef}
            SvgComponent={currentStroke.svg} 
            tracerColor="#FF5733"
            tracerSize={10}
            duration={3}
            onAnimationComplete={() => {
              // Switch back to tracing mode after animation completes
              setTimeout(() => {
                setShowAnimation(false);
              }, 500);
            }}
          />
        ) : (
          <>
            {/* LetterDisplay will show the SVG *underneath* the canvas */}
            <LetterDisplay SvgComponent={currentStroke.svg} />

            {/* TracingCanvas is where the child draws, it's *on top* and transparent */}
            <TracingCanvas
              key={`tc-${currentStroke.id}`} // MODIFIED KEY: Only depends on the currentStroke.id
              width={displayWidth}
              height={displayHeight}
              traceColor="#22C55E" /* A nice green for tracing (Tailwind green-500) */
            />
          </>
        )}
      </div>
      
      {/* Animation control button */}
      <button
        onClick={() => {
          setShowAnimation(true);
          // Give a small delay before playing to ensure the component is mounted
          setTimeout(() => {
            if (animatorRef.current) {
              animatorRef.current.play();
            }
          }, 100);
        }}
        className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Show me how to write
      </button>
        {/* Navigation buttons for switching between strokes */}
      <div className="mt-20 flex flex-wrap justify-center gap-8" style={{ zIndex: 30, position: 'relative' }}>        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentStrokeIndex((prev) => (prev === 0 ? allStrokes.length - 1 : prev - 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Previous Stroke"
        >
          ←
        </button>
        
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow text-lg font-bold">
          {currentStrokeIndex + 1} / {allStrokes.length}
        </div>        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentStrokeIndex((prev) => (prev === allStrokes.length - 1 ? 0 : prev + 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Next Stroke"
        >
          →
        </button>
      </div>
      
      {/* List of all strokes for quick navigation - can be scrolled horizontally on mobile */}
      <div className="mt-6 w-full max-w-3xl overflow-x-auto pb-4">
        <div className="flex space-x-2 px-4">
          {allStrokes.map((stroke, index) => (
            <button
              key={stroke.id}
              onClick={() => {
                setShowAnimation(false);
                setCurrentStrokeIndex(index);
              }}
              className={`py-1 px-3 rounded-md whitespace-nowrap flex-shrink-0 transition-colors ${
                index === currentStrokeIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              {stroke.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step2Strokes;