// src/WritingCanvas.jsx
import { useRef, useEffect, useState } from 'react';

const WritingCanvas = ({ onDoneWriting, guideLetter }) => { // Receive guideLetter prop
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 600;
        canvas.height = 400;
        canvas.style.width = '600px';
        canvas.style.height = '400px';

        const context = canvas.getContext('2d');
        if (!context) return;

        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;

        // Clear canvas initially and draw guide letter
        clearCanvas(); // Clear first, then draw guide in clearCanvas function now

    }, []); // Run only once on component mount

    // useEffect to draw guide letter (runs when guideLetter prop changes)
    useEffect(() => {
        clearCanvas(); // Clear canvas and redraw guide image
    }, [guideLetter]);


    const drawGuideLetter = (context, canvas, letter) => {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing new guide

        context.font = '200px sans-serif'; // Adjust font size and family as needed
        context.fillStyle = 'lightgray'; // Guide letter color (adjust as needed)
        context.textAlign = 'center'; // Center text horizontally
        context.textBaseline = 'middle'; // Center text vertically
        context.globalAlpha = 0.5;       // Set opacity for guide letter (adjust as needed)

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        context.fillText(letter, centerX, centerY);
        context.globalAlpha = 1.0;       // Reset opacity for user drawing
    };


    const startDrawing = ({ nativeEvent }) => {
        if (!contextRef.current || !canvasRef.current) return;
        const { offsetX, offsetY } = getMousePos(canvasRef.current, nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing || !contextRef.current || !canvasRef.current) return;
        const { offsetX, offsetY } = getMousePos(canvasRef.current, nativeEvent);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const endDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        contextRef.current.closePath();
    };

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: evt.clientX - rect.left,
            offsetY: evt.clientY - rect.top,
        };
    };

    const clearCanvas = () => {
        if (!contextRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        if (guideLetter) { // Redraw guide letter after clear if it exists
            drawGuideLetter(contextRef.current, canvas, guideLetter);
        }
    };

    const handleDoneButtonClick = () => {
        if (!canvasRef.current) return;
        const imageDataURL = canvasRef.current.toDataURL();
        onDoneWriting(imageDataURL);
        clearCanvas(); // Clear for next round, and this will also redraw the guide if needed for next letter (if `guideLetter` prop changes next time)
    };

    return (
        <div className="bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden flex flex-col items-center">
            <canvas
                ref={canvasRef}
                className="touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
            />
            <div className="p-4 flex space-x-4">
                <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                    onClick={clearCanvas}
                >
                    Clear
                </button>
                <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDoneButtonClick}
                >
                    Done Writing
                </button>
            </div>
        </div>
    );
};

export default WritingCanvas;