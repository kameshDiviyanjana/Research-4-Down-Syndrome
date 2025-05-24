// src/steps/Step1Shapes.jsx
import { useState, useRef } from 'react';
import ShapeDisplay from '../components/ShapeDisplay';
import ShapeAnimator from '../components/ShapeAnimator';
import TracingCanvas from '../components/TracingCanvas';

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

function Step1Shapes() {
  // Define all available shapes
  const allShapes = [
    { id: 'circle_large_donut', name: 'Circle Donut', svg: circleLargeDonutSVGPath },
    { id: 'flower_circle_4_filled', name: 'Flower Circle', svg: flowerCircle4FilledSVGPath },
    { id: 'flower_circle_8_octogon', name: 'Flower Octagon', svg: flowerCircle8OctogonSVGPath },
    { id: 'flower_oval_4_plus_x', name: 'Oval Plus X', svg: flowerOval4PlusXSVGPath },
    { id: 'mix_circle_quarter_donut', name: 'Mixed Circles', svg: mixCircleQuarterDonutSVGPath },
    { id: 'mix_rectangles_circle', name: 'Mixed Shapes', svg: mixRectanglesCircleSVGPath },
    { id: 'rectangle_quarter_long', name: 'Rectangle Long', svg: rectangleQuarterLongSVGPath },
    { id: 'rectangle_third_plus', name: 'Rectangle Plus', svg: rectangleThirdPlusSVGPath },
    { id: 'square_large', name: 'Square', svg: squareLargeSVGPath }
  ];
  // State to track the current shape
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const currentShape = allShapes[currentShapeIndex];
  
  // State to control display mode
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Reference to the animator component
  const animatorRef = useRef(null);
  
  // Define the desired size for the display area
  const displayWidth = 500;
  const displayHeight = 500;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        Trace the Shape: {currentShape.name}
      </h1>
        <div
        className="relative"
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, marginBottom: '50px' }}
      >
        {/* Show either ShapeAnimator or ShapeDisplay based on mode */}
        {showAnimation ? (
          <ShapeAnimator 
            ref={animatorRef}
            SvgComponent={currentShape.svg} 
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
            {/* ShapeDisplay will show the SVG *underneath* the canvas */}
            <ShapeDisplay SvgComponent={currentShape.svg} />

            {/* TracingCanvas is where the child draws, it's *on top* and transparent */}
            <TracingCanvas
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
        Show me how to draw
      </button>
      
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