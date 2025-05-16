// src/components/TracingCanvas.jsx
import React, { useRef, useEffect, useState } from 'react';


function TracingCanvas({ width = 500, height = 500, traceColor = '#3B82F6' /* Default to a blue */ }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // For high DPI screens
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(ratio, ratio);      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 16; // Increased line thickness for better accessibility for Down syndrome users
      setContext(ctx);
    }
  }, [width, height]);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    if (event.touches && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  const startDrawing = (event) => {
    event.preventDefault(); // Prevent scrolling on touch
    const coords = getCoordinates(event);
    if (context && coords) {
      setIsDrawing(true);
      context.strokeStyle = traceColor; // Set trace color
      context.beginPath();
      context.moveTo(coords.x, coords.y);
    }
  };

  const draw = (event) => {
    event.preventDefault();
    if (!isDrawing || !context) return;
    const coords = getCoordinates(event);
    if (coords) {
      context.lineTo(coords.x, coords.y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing} // Stop drawing if mouse leaves canvas
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="border-2 border-dashed border-gray-400 touch-none bg-transparent" // bg-transparent is key!
        // style={{ touchAction: 'none' }} // Redundant due to Tailwind's touch-none
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
      >
        Your browser does not support the canvas element.
      </canvas>      
      <div className="w-full flex justify-center my-4" style={{ position: 'relative', zIndex: 20, marginTop: `${height + 20}px` }}>
        <button
          onClick={clearCanvas}
          className="mx-auto bg-button-bg text-button-text font-bold py-2 px-6 rounded hover:bg-blue-700"
        >
          Clear Trace
        </button>
      </div>
    </div>
  );
}

export default TracingCanvas;