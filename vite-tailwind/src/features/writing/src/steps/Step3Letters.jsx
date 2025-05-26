import { useState, useRef, useEffect, useCallback } from 'react';
import LetterDisplay from '../components/LetterDisplay';
import LetterAnimator from '../components/LetterAnimator';
import TracingCanvas from '../components/TracingCanvas';
import CheckpointsOverlay from '../components/CheckpointsOverlay';

// === IMPORTANT: Ensure these paths are correct for YOUR project structure ===
import letter01SVGPath from '../../../../assets/letters/01-අ-min.svg';
import letter05SVGPath from '../../../../assets/letters/05-ඉ-min.svg';
import letter07SVGPath from '../../../../assets/letters/07-උ-min.svg';
import letter13SVGPath from '../../../../assets/letters/13-එ-min.svg';
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

// === Add `svgPathId: 'tracePath'` to EVERY letter object ===
const allLetters = [
  { id: 'letter_01', name: 'අ', svg: letter01SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_02', name: 'ඉ', svg: letter05SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_03', name: 'උ', svg: letter07SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_04', name: 'එ', svg: letter13SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_05', name: 'ඔ', svg: letter16SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_06', name: 'ක', svg: letter21SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_07', name: 'ච', svg: letter27SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_08', name: 'ට', svg: letter33SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_09', name: 'ත', svg: letter39SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_10', name: 'ද', svg: letter41SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_11', name: 'න', svg: letter43SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_12', name: 'ම', svg: letter49SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_13', name: 'ය', svg: letter51SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_14', name: 'ර', svg: letter52SVGPath, svgPathId: 'tracePath' },
  { id: 'letter_15', name: 'ල', svg: letter53SVGPath, svgPathId: 'tracePath' }
];

const NUMBER_OF_CHECKPOINTS_PER_ITEM = 8; // Tune this value

function Step3Letters() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const animatorRef = useRef(null);

  const [checkpoints, setCheckpoints] = useState([]);
  const [isLoadingCheckpoints, setIsLoadingCheckpoints] = useState(true);
  const [userFeedback, setUserFeedback] = useState("Let's trace!");

  const currentLetter = allLetters[currentLetterIndex];

  useEffect(() => {
    setIsLoadingCheckpoints(true);
    setUserFeedback("Preparing trace guide...");
    setCheckpoints([]); // Clear to trigger LetterDisplay calculation
    //setShowAnimation(false); // Ensure tracing mode when letter changes
  }, [currentLetterIndex]);

  const handleCheckpointsCalculated = useCallback((calculatedCpList) => {
    setIsLoadingCheckpoints(false);
    if (calculatedCpList && calculatedCpList.length > 0) {
      setCheckpoints(calculatedCpList.map(cp => ({ ...cp, isHit: false })));
      setUserFeedback(`Ready to trace: ${currentLetter?.name || 'the item'}`);
    } else {
      setCheckpoints([]);
      setUserFeedback(`Error preparing "${currentLetter?.name || 'the item'}". Try another.`);
    }
  }, [currentLetter]);

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
        setUserFeedback(`Great! You traced "${currentLetter?.name}"!`);
      } else {
        setUserFeedback(`Checkpoint ${hitOrder + 1} hit! Keep going!`);
      }
      return updated;
    });
  }, [currentLetter]);

  const handleClearTrace = useCallback(() => {
    setCheckpoints(prev => prev.map(cp => ({ ...cp, isHit: false })));
    setUserFeedback(`Trace cleared for ${currentLetter?.name}. Try again!`);
  }, [currentLetter]);

  const navigateItem = (direction) => {
    setShowAnimation(false);
    setCurrentLetterIndex(prev => {
      let newIdx = prev + direction;
      if (newIdx < 0) newIdx = allLetters.length - 1;
      else if (newIdx >= allLetters.length) newIdx = 0;
      return newIdx;
    });
  };

  const selectSpecificItem = (index) => {
    setShowAnimation(false);
    setCurrentLetterIndex(index);
  };

  // Your existing displayWidth, displayHeight
  const displayWidth = 500;
  const displayHeight = 520;
  const interactiveAreaMarginBottom = 70; // For "Clear Trace" button


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4"> {/* Adjust min-h if needed */}
      <h1 className="text-3xl font-bold text-neutral-700 mb-6">
        Trace the Letter: {currentLetter?.name || "Loading..."}
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

        {currentLetter && (
          <LetterDisplay
            key={`ld-${currentLetter.id}`}
            SvgComponent={currentLetter.svg}
            pathIdInSvg={currentLetter.svgPathId}
            numberOfCheckpoints={NUMBER_OF_CHECKPOINTS_PER_ITEM}
            onCheckpointsCalculated={handleCheckpointsCalculated}
            guideColor="stroke-gray-400" // Example: A visible but not overpowering guide color
          />
        )}

        {!isLoadingCheckpoints && checkpoints.length > 0 && !showAnimation && (
          <>
            <CheckpointsOverlay
              key={`co-${currentLetter.id}`}
              checkpoints={checkpoints}
            />
            <TracingCanvas
              key={`tc-${currentLetter.id}`} // MODIFIED KEY: Only depends on the currentLetter.id
              width={displayWidth}
              height={displayHeight}
              targetCheckpoints={checkpoints}
              onCheckpointHit={handleCheckpointHit}
              onClearTraceRequest={handleClearTrace}
            />
          </>
        )}

        {showAnimation && currentLetter && (
          <LetterAnimator
            key={`la-${currentLetter.id}`}
            ref={animatorRef}
            SvgComponent={currentLetter.svg}
            onAnimationComplete={() => setTimeout(() => setShowAnimation(false), 500)}
            // Pass other props for LetterAnimator
          />
        )}
         {!isLoadingCheckpoints && checkpoints.length === 0 && currentLetter && (
            <div className="absolute inset-0 flex justify-center items-center text-red-700 p-3 bg-red-100 rounded-md z-30">
                <p className="text-center">Could not initialize tracing guide for &quot;{currentLetter.name}&quot;.<br/> Please check SVG configuration or try another item.</p>
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
            if (currentLetter) {
                setShowAnimation(true);
                setTimeout(() => animatorRef.current?.play(), 100);
            }
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          disabled={isLoadingCheckpoints || showAnimation || !currentLetter}
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          Show Animation
        </button>
         <button
            onClick={handleClearTrace}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            disabled={isLoadingCheckpoints || showAnimation || !currentLetter || checkpoints.length === 0 }
          >
            Reset Trace
          </button>
      </div>


      <div className="mt-4 flex flex-wrap justify-center gap-6 items-center" style={{ zIndex: 30, position: 'relative' }}>
        <button onClick={() => navigateItem(-1)} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110" aria-label="Previous">←</button>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold text-gray-700">{currentLetterIndex + 1} / {allLetters.length}</div>
        <button onClick={() => navigateItem(1)} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110" aria-label="Next">→</button>
      </div>

      <div className="mt-6 w-full max-w-3xl overflow-x-auto pb-4">
  <div className="flex space-x-2 px-4 justify-center">
    {allLetters.map((letter, index) => (
      <button
        key={letter.id}
        onClick={() => selectSpecificItem(index)}
        className={`py-2 px-4 rounded-md whitespace-nowrap flex-shrink-0 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          index === currentLetterIndex
            ? 'bg-blue-600 text-white font-semibold ring-2 ring-blue-700 scale-105'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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