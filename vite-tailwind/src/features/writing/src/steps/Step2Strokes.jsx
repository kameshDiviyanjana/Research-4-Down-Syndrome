// src/steps/Step2Strokes.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import LetterDisplay from '../components/LetterDisplay';
import LetterAnimator from '../components/LetterAnimator';
import TracingCanvas from '../components/TracingCanvas';
import CheckpointsOverlay from '../components/CheckpointsOverlay';

// Import all SVGs
import alapillaSVGPath from '../../../../assets/strokes/alapilla.svg';
import anusvaraSVGPath from '../../../../assets/strokes/anusvara.svg';
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

function Step2Strokes() {  // Define all available strokes
  const allStrokes = [
    { id: 'alapilla', name: 'ඇලපිල්ල', svg: alapillaSVGPath, svgPathId: 'tracePath' },
    { id: 'anusvara', name: 'අනුස්වාරය', svg: anusvaraSVGPath, svgPathId: 'tracePath' },
    { id: 'keti_adaya', name: 'කෙටි ඇදය', svg: ketiAdayaSVGPath, svgPathId: 'tracePath' },
    { id: 'deerga_adaya', name: 'දීර්ඝ ඇදය', svg: deergaAdayaSVGPath, svgPathId: 'tracePath' },
    { id: 'keti_ispilla', name: 'කෙටි ඉස්පිල්ල', svg: ketiIspillaSVGPath, svgPathId: 'tracePath' },
    { id: 'deerga_ispilla', name: 'දීර්ඝ ඉස්පිල්ල', svg: deergaIspillaSVGPath, svgPathId: 'tracePath' },
    { id: 'keti_papilla', name: 'කෙටි පාපිල්ල', svg: ketiPapillaSVGPath, svgPathId: 'tracePath' },
    { id: 'deerga_papilla', name: 'දීර්ඝ පාපිල්ල', svg: deergaPapillaSVGPath, svgPathId: 'tracePath' },
    { id: 'gaetaya_sahitha_alapilla', name: 'ගැටය සහිත ඇලපිල්ල', svg: gaetayaSahithaAlapillaSVGPath, svgPathId: 'tracePath' },
    { id: 'gaetaya_sahitha_alapilli_deka', name: 'ගැටය සහිත ඇලපිලි දෙක', svg: gaetayaSahithaAlapilliDekaSVGPath, svgPathId: 'tracePath' },
    { id: 'kombuwa', name: 'කොම්බුව', svg: kombuwaSVGPath, svgPathId: 'tracePath' },
    { id: 'kombuwa_saha_hal', name: 'කොම්බුව සහ හල් ලකුණ', svg: kombuwaSahaHalSVGPath, svgPathId: 'tracePath' },
    { id: 'kombu_deka', name: 'කොම්බු දෙක', svg: kombuDekaSVGPath, svgPathId: 'tracePath' },
    { id: 'kombuwa_saha_alapilla', name: 'කොම්බුව සහ ඇලපිල්ල', svg: kombuwaSahaAlapillaSVGPath, svgPathId: 'tracePath' },
    { id: 'kombuwa_alapilla_saha_hal', name: 'කොම්බුව, ඇලපිල්ල සහ හල් ලකුණ', svg: kombuwaAlapillaSahaHalSVGPath, svgPathId: 'tracePath' },
    { id: 'kombuwa_saha_gayanukiththa', name: 'කොම්බුව සහ ගයනුකිත්ත', svg: kombuwaSahaGayanukitthaSVGPath, svgPathId: 'tracePath' },
    { id: 'visargaya', name: 'විසර්ගය', svg: visargayaSVGPath, svgPathId: 'tracePath' },
    { id: 'yanshaya', name: 'යංශය', svg: yanshayaSVGPath, svgPathId: 'tracePath' },
    { id: 'rakaranshaya', name: 'රකාරාංශය', svg: rakaranshayaSVGPath, svgPathId: 'tracePath' },
    { id: 'hal_lakuna', name: 'හල් ලකුණ', svg: halLakunaSVGPath, svgPathId: 'tracePath' }
  ];  const NUMBER_OF_CHECKPOINTS_PER_ITEM = 8; // Tune this value

  // State to track the current stroke
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const animatorRef = useRef(null);
  
  const [checkpoints, setCheckpoints] = useState([]);
  const [isLoadingCheckpoints, setIsLoadingCheckpoints] = useState(true);
  const [userFeedback, setUserFeedback] = useState("Let's trace!");
  
  const currentStroke = allStrokes[currentStrokeIndex];
  
  // Using larger dimensions for children with Down syndrome to improve accessibility
  const displayWidth = 500;
  const displayHeight = 500;
  const interactiveAreaMarginBottom = 70; // For "Clear Trace" button
  
  useEffect(() => {
    setIsLoadingCheckpoints(true);
    setUserFeedback("Preparing trace guide...");
    setCheckpoints([]); // Clear to trigger LetterDisplay calculation
  }, [currentStrokeIndex]);
  
  const handleCheckpointsCalculated = useCallback((calculatedCpList) => {
    setIsLoadingCheckpoints(false);
    if (calculatedCpList && calculatedCpList.length > 0) {
      setCheckpoints(calculatedCpList.map(cp => ({ ...cp, isHit: false })));
      setUserFeedback(`Ready to trace: ${currentStroke?.name || 'the stroke'}`);
    } else {
      setCheckpoints([]);
      setUserFeedback(`Error preparing "${currentStroke?.name || 'the stroke'}". Try another.`);
    }
  }, [currentStroke]);
  
  const handleCheckpointHit = useCallback((hitOrder) => {
    setCheckpoints(prevCheckpoints => {
      const updated = prevCheckpoints.map(cp => {
        if (cp.order === hitOrder) {
          return { ...cp, isHit: true };
        }
        return cp;
      });
      const allHit = updated.every(cp => cp.isHit);
      if (allHit) {
        setUserFeedback(`Great! You traced "${currentStroke?.name}"!`);
      } else {
        setUserFeedback(`Checkpoint ${hitOrder + 1} hit! Keep going!`);
      }
      return updated;
    });
  }, [currentStroke]);
  
  const handleClearTrace = useCallback(() => {
    setCheckpoints(prev => prev.map(cp => ({ ...cp, isHit: false })));
    setUserFeedback(`Trace cleared for ${currentStroke?.name}. Try again!`);
  }, [currentStroke]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        Trace the Stroke: {currentStroke?.name || "Loading..."}
      </h1>

      <div
        className="relative bg-gray-100 p-1 rounded-lg shadow-inner border border-gray-300"
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, marginBottom: `${interactiveAreaMarginBottom}px` }}
      >
        {isLoadingCheckpoints && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-30 z-40 rounded-lg">
            <p className="text-lg font-semibold text-white bg-black/50 px-4 py-2 rounded">Preparing trace guide...</p>
          </div>
        )}

        {currentStroke && (
          <LetterDisplay
            key={`ld-${currentStroke.id}`}
            SvgComponent={currentStroke.svg}
            pathIdInSvg={currentStroke.svgPathId}
            numberOfCheckpoints={NUMBER_OF_CHECKPOINTS_PER_ITEM}
            onCheckpointsCalculated={handleCheckpointsCalculated}
            guideColor="stroke-gray-400"
          />
        )}

        {!isLoadingCheckpoints && checkpoints.length > 0 && !showAnimation && (
          <>
            <CheckpointsOverlay
              key={`co-${currentStroke.id}`}
              checkpoints={checkpoints}
            />
            <TracingCanvas
              key={`tc-${currentStroke.id}`}
              width={displayWidth}
              height={displayHeight}
              targetCheckpoints={checkpoints}
              onCheckpointHit={handleCheckpointHit}
              onClearTraceRequest={handleClearTrace}
              traceColor="#22C55E"
            />
          </>
        )}

        {showAnimation && currentStroke && (
          <LetterAnimator
            key={`la-${currentStroke.id}`}
            ref={animatorRef}
            SvgComponent={currentStroke.svg}
            tracerColor="#FF5733"
            tracerSize={10}
            duration={3}
            onAnimationComplete={() => setTimeout(() => setShowAnimation(false), 500)}
          />
        )}
         {!isLoadingCheckpoints && checkpoints.length === 0 && currentStroke && (
            <div className="absolute inset-0 flex justify-center items-center text-red-700 p-3 bg-red-100 rounded-md z-30">
                <p className="text-center">Could not initialize tracing guide for &quot;{currentStroke.name}&quot;.<br/> Please check SVG configuration or try another item.</p>
            </div>
        )}
      </div>

      {userFeedback && (
        <div className="my-2 text-center text-xl font-semibold text-indigo-700 min-h-[3rem] px-4 py-2 bg-indigo-50 rounded-md shadow">
          {userFeedback}
        </div>
      )}
      {!isLoadingCheckpoints && checkpoints.length > 0 && (
          <div className="text-sm text-gray-700 mt-1 mb-3">
              Progress: {checkpoints.filter(cp => cp.isHit).length} of {checkpoints.length} points.
          </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            if (currentStroke) {
                setShowAnimation(true);
                setTimeout(() => animatorRef.current?.play(), 100);
            }
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          disabled={isLoadingCheckpoints || showAnimation || !currentStroke}
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          Show Animation
        </button>
         <button
            onClick={handleClearTrace}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            disabled={isLoadingCheckpoints || showAnimation || !currentStroke || checkpoints.length === 0 }
          >
            Reset Trace
          </button>
      </div>
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