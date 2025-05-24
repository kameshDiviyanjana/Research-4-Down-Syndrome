// src/steps/Step3Letters.jsx
import { useState, useRef } from 'react';
import LetterDisplay from '../components/LetterDisplay';
import LetterAnimator from '../components/LetterAnimator';
import TracingCanvas from '../components/TracingCanvas';

// Import all letter SVGs
import letter01SVGPath from '../../../../assets/letters/01-අ-min.svg';
import letter02SVGPath from '../../../../assets/letters/02-ආ-min.svg';
import letter03SVGPath from '../../../../assets/letters/03-ඇ-min.svg';
import letter04SVGPath from '../../../../assets/letters/04-ඈ-min.svg';
import letter05SVGPath from '../../../../assets/letters/05-ඉ-min.svg';
import letter06SVGPath from '../../../../assets/letters/06-ඊ-min.svg';
import letter07SVGPath from '../../../../assets/letters/07-උ-min.svg';
import letter08SVGPath from '../../../../assets/letters/08-ඌ-min.svg';
import letter09SVGPath from '../../../../assets/letters/09-ඍ-min.svg';
import letter10SVGPath from '../../../../assets/letters/10-ඎ-min.svg';
import letter11SVGPath from '../../../../assets/letters/11-ඏ-min.svg';
import letter13SVGPath from '../../../../assets/letters/13-එ-min.svg';
import letter14SVGPath from '../../../../assets/letters/14-ඒ-min.svg';
import letter16SVGPath from '../../../../assets/letters/16-ඔ-min.svg';
import letter21SVGPath from '../../../../assets/letters/21-ක-min.svg';
import letter27SVGPath from '../../../../assets/letters/27-ච-min.svg';
import letter33SVGPath from '../../../../assets/letters/33-ට-min.svg';
import letter39SVGPath from '../../../../assets/letters/39-ත-min.svg';
import letter41SVGPath from '../../../../assets/letters/41-ද-min.svg';
import letter43SVGPath from '../../../../assets/letters/43-න-min.svg';
import letter49SVGPath from '../../../../assets/letters/49-ම-min.svg';
import letter51SVGPath from '../../../../assets/letters/51-ය-min.svg';
import letter52SVGPath from '../../../../assets/letters/52-ර-min.svg';
import letter53SVGPath from '../../../../assets/letters/53-ල-min.svg';

function Step3Letters() {  // Define all available letters
  const allLetters = [
    { id: 'letter_01', name: 'අ', svg: letter01SVGPath },
    { id: 'letter_02', name: 'ආ', svg: letter02SVGPath },
    { id: 'letter_03', name: 'ඇ', svg: letter03SVGPath },
    { id: 'letter_04', name: 'ඈ', svg: letter04SVGPath },
    { id: 'letter_05', name: 'ඉ', svg: letter05SVGPath },
    { id: 'letter_06', name: 'ඊ', svg: letter06SVGPath },
    { id: 'letter_07', name: 'උ', svg: letter07SVGPath },
    { id: 'letter_08', name: 'ඌ', svg: letter08SVGPath },
    { id: 'letter_09', name: 'ඍ', svg: letter09SVGPath },
    { id: 'letter_10', name: 'ඎ', svg: letter10SVGPath },
    { id: 'letter_11', name: 'ඏ', svg: letter11SVGPath },
    { id: 'letter_13', name: 'එ', svg: letter13SVGPath },
    { id: 'letter_14', name: 'ඒ', svg: letter14SVGPath },
    { id: 'letter_16', name: 'ඔ', svg: letter16SVGPath },
    { id: 'letter_21', name: 'ක', svg: letter21SVGPath },
    { id: 'letter_27', name: 'ච', svg: letter27SVGPath },
    { id: 'letter_33', name: 'ට', svg: letter33SVGPath },
    { id: 'letter_39', name: 'ත', svg: letter39SVGPath },
    { id: 'letter_41', name: 'ද', svg: letter41SVGPath },
    { id: 'letter_43', name: 'න', svg: letter43SVGPath },
    { id: 'letter_49', name: 'ම', svg: letter49SVGPath },
    { id: 'letter_51', name: 'ය', svg: letter51SVGPath },
    { id: 'letter_52', name: 'ර', svg: letter52SVGPath },
    { id: 'letter_53', name: 'ල', svg: letter53SVGPath }
  ];
  // State to track the current letter
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const currentLetter = allLetters[currentLetterIndex];
  
  // State to control display mode
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Reference to the animator component
  const animatorRef = useRef(null);
    
  // Define the desired size for the display area
  // Use slightly taller canvas for letters to fit better
  const displayWidth = 500;
  const displayHeight = 520;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        Trace the Letter: {currentLetter.name}
      </h1>
        <div
        className="relative"
        style={{ width: `${displayWidth}px`, height: `${displayHeight}px`, marginBottom: '50px' }}
      >
        {/* Show either LetterAnimator or LetterDisplay based on mode */}
        {showAnimation ? (
          <LetterAnimator 
            ref={animatorRef}
            SvgComponent={currentLetter.svg} 
            tracerColor="#FF5733"
            tracerSize={10}
            duration={4}
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
            <LetterDisplay SvgComponent={currentLetter.svg} />

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
        Show me how to write
      </button>
      
      {/* Navigation buttons for switching between letters */}
      <div className="mt-20 flex flex-wrap justify-center gap-8" style={{ zIndex: 30, position: 'relative' }}>        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentLetterIndex((prev) => (prev === 0 ? allLetters.length - 1 : prev - 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Previous Letter"
        >
          ←
        </button>
        
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow text-lg font-bold">
          {currentLetterIndex + 1} / {allLetters.length}
        </div>
        
        <button 
          onClick={() => {
            setShowAnimation(false);
            setCurrentLetterIndex((prev) => (prev === allLetters.length - 1 ? 0 : prev + 1));
          }}
          className="bg-button-bg text-button-text p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-blue-700"
          aria-label="Next Letter"
        >
          →
        </button>
      </div>
      
      {/* List of all letters for quick navigation - can be scrolled horizontally on mobile */}
      <div className="mt-6 w-full max-w-3xl overflow-x-auto pb-4">
        <div className="flex space-x-2 px-4">
          {allLetters.map((letter, index) => (
            <button
              key={letter.id}
              onClick={() => {
                setShowAnimation(false);
                setCurrentLetterIndex(index);
              }}
              className={`py-1 px-3 rounded-md whitespace-nowrap flex-shrink-0 transition-colors ${
                index === currentLetterIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              {letter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step3Letters;
