// src/steps/Step1Shapes.jsx
import { useState } from 'react';
import ShapeDisplay from '../components/ShapeDisplay';
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
        {/* ShapeDisplay will show the SVG *underneath* the canvas */}
        <ShapeDisplay SvgComponent={currentShape.svg} />

        {/* TracingCanvas is where the child draws, it's *on top* and transparent */}
        <TracingCanvas
          width={displayWidth}
          height={displayHeight}
          traceColor="#22C55E" /* A nice green for tracing (Tailwind green-500) */
        />
      </div>
      
      {/* Navigation buttons for switching between shapes */}
      <div className="mt-20 flex flex-wrap justify-center gap-8" style={{ zIndex: 30, position: 'relative' }}>
        <button 
          onClick={() => {
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
              onClick={() => setCurrentShapeIndex(index)}
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