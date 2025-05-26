import React, { useRef, useEffect, useState } from 'react';

const HIT_RADIUS = 25; // Adjust this for sensitivity! Higher = more forgiving.

/**
 * @typedef {object} Checkpoint
 * @property {string} id
 * @property {number} x
 * @property {number} y
 * @property {number} order
 * @property {boolean} isHit
 */

/**
 * TracingCanvas provides the drawing surface and detects checkpoint hits.
 * @param {object} props
 * @param {number} [props.width=500]
 * @param {number} [props.height=500]
 * @param {string} [props.traceColor='#3B82F6']
 * @param {Array<Checkpoint>} [props.targetCheckpoints=[]] - Checkpoints to aim for.
 * @param {(hitOrder: number) => void} props.onCheckpointHit - Callback when a checkpoint is hit.
 * @param {() => void} props.onAllCheckpointsHit - Callback when all checkpoints are hit.
 * @param {() => void} props.onClearTraceRequest - Callback when user clicks "Clear Trace".
 */
function TracingCanvas({
  width = 500,
  height = 500,
  traceColor = '#22C55E', // Using your Tailwind green-500
  targetCheckpoints = [],
  onCheckpointHit,
  onAllCheckpointsHit,
  onClearTraceRequest
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  const nextCheckpointOrderRef = useRef(0);
  const latestCheckpointsRef = useRef(targetCheckpoints);

  // Update refs when targetCheckpoints prop changes (e.g., new letter)
  useEffect(() => {
    latestCheckpointsRef.current = targetCheckpoints;
    const firstUnhitIdx = targetCheckpoints.findIndex(cp => !cp.isHit);
    nextCheckpointOrderRef.current = firstUnhitIdx === -1 ? targetCheckpoints.length : firstUnhitIdx;
  }, [targetCheckpoints]);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(ratio, ratio);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 16; // Keep your accessible line width
      setContext(ctx);
    }
  }, [width, height]);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    if (typeof clientX === 'undefined' || typeof clientY === 'undefined') return null;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (event) => {
    event.preventDefault();
    const coords = getCoordinates(event);
    if (context && coords) {
      setIsDrawing(true);
      context.strokeStyle = traceColor;
      context.beginPath();
      context.moveTo(coords.x, coords.y);
      checkHit(coords); // Check hit on start
    }
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing || !context) return;
    const coords = getCoordinates(event);
    if (coords) {
      context.lineTo(coords.x, coords.y);
      context.stroke();
      checkHit(coords);
    }
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const checkHit = (userPoint) => {
    const currentCheckpoints = latestCheckpointsRef.current;
    const currentOrderToHit = nextCheckpointOrderRef.current;

    if (!currentCheckpoints || currentCheckpoints.length === 0 || currentOrderToHit >= currentCheckpoints.length) {
      return; // No more checkpoints to hit or not initialized
    }

    const targetCp = currentCheckpoints[currentOrderToHit];
    if (targetCp.isHit) return; // Already hit this one, should not happen if `nextCheckpointOrderRef` is updated correctly

    const distance = Math.sqrt(
      Math.pow(userPoint.x - targetCp.x, 2) +
      Math.pow(userPoint.y - targetCp.y, 2)
    );

    if (distance < HIT_RADIUS) {
      if (onCheckpointHit) {
        onCheckpointHit(targetCp.order); // Parent will update the `targetCheckpoints` prop.
                                       // This will trigger the useEffect for `targetCheckpoints`
                                       // which will then update `nextCheckpointOrderRef`.
      }
      // Check if this was the last unhit checkpoint in the sequence
      const allHitNow = currentCheckpoints.every((cp, index) => index === targetCp.order ? true : cp.isHit);
      if(allHitNow && currentCheckpoints.length > 0 && targetCp.order === currentCheckpoints.length -1){ // If the one hit was the last *ordered* one, and others are now hit
         if (onAllCheckpointsHit && currentCheckpoints.every(cp => cp.isHit || cp.order === targetCp.order)) { // Final check all are hit
             onAllCheckpointsHit();
         }
      }
    }
  };

  const handleClearButtonClick = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (onClearTraceRequest) { // Notify parent to reset checkpoint states
      onClearTraceRequest();
    }
  };

  return (
    // This outer div wrapper helps position the canvas and its button consistently
    <div className="flex flex-col items-center" style={{ width: `${width}px`, height: `${height}px`, position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="border-2 border-dashed border-gray-400 touch-none bg-transparent"
        // The absolute positioning below should be relative to the direct parent.
        // style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }} // This style seems to be applied already in your snippet. Good.
      >
        Your browser does not support the canvas element.
      </canvas>
      {/* Positioning the button below the canvas. Parent must have height for this to not overlap. */}
      <div
        className="w-full flex justify-center"
        style={{ position: 'absolute', bottom: `-${40 + 20}px`, left: '0', zIndex: 20 }} // Position it clearly below. `40px` is example button height + `20px` margin.
      >
        <button
          onClick={handleClearButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
        >
          අකුර මකා දමන්න
        </button>
      </div>
    </div>
  );
}

export default TracingCanvas;