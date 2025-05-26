// src/steps/Step1Shapes.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import ShapeDisplay from '../components/ShapeDisplay';
import ShapeAnimator from '../components/ShapeAnimator';
import TracingCanvas from '../components/TracingCanvas';
import CheckpointsOverlay from '../components/CheckpointsOverlay';

// Import all SVG shapes
import circleLargeDonutSVGPath from '../../../../assets/shapes/circle-large-donut.svg';
import flowerCircle4FilledSVGPath from '../../../../assets/shapes/flower-circle-4-filled.svg';
import flowerCircle8OctogonSVGPath from '../../../../assets/shapes/flower-circle-8-in-octogon-layout.svg';
import flowerOval4PlusXSVGPath from '../../../../assets/shapes/flower-oval-4-plus-and-X-shape.svg';
import mixCircleQuarterDonutSVGPath from '../../../../assets/shapes/mix-circle-quarter-donut-circle-half-small.svg';
import mixRectanglesCircleSVGPath from '../../../../assets/shapes/mix-rectangles-circle-halves.svg';
import rectangleQuarterLongSVGPath from '../../../../assets/shapes/rectangle-quarter-long-alternates.svg';
import rectangleThirdPlusSVGPath from '../../../../assets/shapes/rectangle-third-plus-shape.svg';
import squareLargeSVGPath from '../../../../assets/shapes/square-large.svg';

function Step1Shapes() {  // Define all available shapes
  const allShapes = [
    { id: 'circle_large_donut', name: 'Circle Donut', svg: circleLargeDonutSVGPath, svgPathId: 'tracePath' },
    { id: 'flower_circle_4_filled', name: 'Flower Circle', svg: flowerCircle4FilledSVGPath, svgPathId: 'tracePath' },
    { id: 'flower_circle_8_octogon', name: 'Flower Octagon', svg: flowerCircle8OctogonSVGPath, svgPathId: 'tracePath' },
    { id: 'flower_oval_4_plus_x', name: 'Oval Plus X', svg: flowerOval4PlusXSVGPath, svgPathId: 'tracePath' },
    { id: 'mix_circle_quarter_donut', name: 'Mixed Circles', svg: mixCircleQuarterDonutSVGPath, svgPathId: 'tracePath' },
    { id: 'mix_rectangles_circle', name: 'Mixed Shapes', svg: mixRectanglesCircleSVGPath, svgPathId: 'tracePath' },
    { id: 'rectangle_quarter_long', name: 'Rectangle Long', svg: rectangleQuarterLongSVGPath, svgPathId: 'tracePath' },
    { id: 'rectangle_third_plus', name: 'Rectangle Plus', svg: rectangleThirdPlusSVGPath, svgPathId: 'tracePath' },
    { id: 'square_large', name: 'Square', svg: squareLargeSVGPath, svgPathId: 'tracePath' }
  ];  const NUMBER_OF_CHECKPOINTS_PER_ITEM = 8; // Tune this value

  // State to track the current shape
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const animatorRef = useRef(null);
  
  const [checkpoints, setCheckpoints] = useState([]);
  const [isLoadingCheckpoints, setIsLoadingCheckpoints] = useState(true);
  const [userFeedback, setUserFeedback] = useState("Let's trace!");
  
  const currentShape = allShapes[currentShapeIndex];
  
  // Define the desired size for the display area
  const displayWidth = 500;
  const displayHeight = 500;
  const interactiveAreaMarginBottom = 70; // For "Clear Trace" button
  
  useEffect(() => {
    setIsLoadingCheckpoints(true);
    setUserFeedback("Preparing trace guide...");
    setCheckpoints([]); // Clear to trigger ShapeDisplay calculation
  }, [currentShapeIndex]);
  
  const handleCheckpointsCalculated = useCallback((calculatedCpList) => {
    setIsLoadingCheckpoints(false);
    if (calculatedCpList && calculatedCpList.length > 0) {
      setCheckpoints(calculatedCpList.map(cp => ({ ...cp, isHit: false })));
      setUserFeedback(`හැඩ තලය අදින්න සූදානම් වෙමු : ${currentShape?.name || 'the shape'}`);
    } else {
      setCheckpoints([]);
      setUserFeedback(`Error preparing "${currentShape?.name || 'the shape'}". Try another.`);
    }
  }, [currentShape]);
  
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
        setUserFeedback(`Great! You traced "${currentShape?.name}"!`);
      } else {
        setUserFeedback(`Checkpoint ${hitOrder + 1} hit! Keep going!`);
      }
      return updated;
    });
  }, [currentShape]);
  
  const handleClearTrace = useCallback(() => {
    setCheckpoints(prev => prev.map(cp => ({ ...cp, isHit: false })));
    setUserFeedback(`Trace cleared for ${currentShape?.name}. Try again!`);
  }, [currentShape]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        හැඩතලය තිරය මත අදින්න: {currentShape?.name || "Loading..."}
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

        {currentShape && (
          <ShapeDisplay
            key={`sd-${currentShape.id}`}
            SvgComponent={currentShape.svg}
            pathIdInSvg={currentShape.svgPathId}
            numberOfCheckpoints={NUMBER_OF_CHECKPOINTS_PER_ITEM}
            onCheckpointsCalculated={handleCheckpointsCalculated}
            guideColor="stroke-gray-400"
          />
        )}

        {!isLoadingCheckpoints && checkpoints.length > 0 && !showAnimation && (
          <>
            <CheckpointsOverlay
              key={`co-${currentShape.id}`}
              checkpoints={checkpoints}
            />
            <TracingCanvas
              key={`tc-${currentShape.id}`}
              width={displayWidth}
              height={displayHeight}
              targetCheckpoints={checkpoints}
              onCheckpointHit={handleCheckpointHit}
              onClearTraceRequest={handleClearTrace}
              traceColor="#22C55E"
            />
          </>
        )}

        {showAnimation && currentShape && (
          <ShapeAnimator
            key={`sa-${currentShape.id}`}
            ref={animatorRef}
            SvgComponent={currentShape.svg}
            tracerColor="#FF5733"
            tracerSize={10}
            duration={3}
            onAnimationComplete={() => setTimeout(() => setShowAnimation(false), 500)}
          />
        )}
         {!isLoadingCheckpoints && checkpoints.length === 0 && currentShape && (
            <div className="absolute inset-0 flex justify-center items-center text-red-700 p-3 bg-red-100 rounded-md z-30">
                <p className="text-center">Could not initialize tracing guide for &quot;{currentShape.name}&quot;.<br/> Please check SVG configuration or try another item.</p>
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
              මම දැනට පොයින්ට්ස් : {checkpoints.filter(cp => cp.isHit).length} of {checkpoints.length} ලබා ගෙන තියෙනව.
          </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            if (currentShape) {
                setShowAnimation(true);
                setTimeout(() => animatorRef.current?.play(), 100);
            }
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          disabled={isLoadingCheckpoints || showAnimation || !currentShape}
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          පාට කරන්න ඔන විදිහ බලමු.
        </button>
         <button
            onClick={handleClearTrace}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            disabled={isLoadingCheckpoints || showAnimation || !currentShape || checkpoints.length === 0 }
          >
            මුලට යමු
          </button>
      </div>
      
      {/* Navigation buttons for switching between shapes */}
      <div className="mt-20 flex flex-wrap justify-center gap-8" style={{ zIndex: 30, position: 'relative' }}>        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentShapeIndex((prev) => (prev === 0 ? allShapes.length - 1 : prev - 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Previous Shape"
        >
          ←
        </button>
        
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow text-lg font-bold">
          {currentShapeIndex + 1} / {allShapes.length}
        </div>
        
        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentShapeIndex((prev) => (prev === allShapes.length - 1 ? 0 : prev + 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Next Shape"
        >
          →
        </button>
      </div>
      
      {/* List of all shapes for quick navigation - can be scrolled horizontally on mobile */}
      <div className="mt-6 w-full max-w-3xl overflow-x-auto pb-4">
        <div className="flex space-x-2 px-4">
          {allShapes.map((shape, index) => (
            <button
              key={shape.id}
              onClick={() => {
                setShowAnimation(false);
                setCurrentShapeIndex(index);
              }}
              className={`py-1 px-3 rounded-md whitespace-nowrap flex-shrink-0 transition-colors ${
                index === currentShapeIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              {shape.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step1Shapes;