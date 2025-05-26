import React, { useEffect, useRef } from 'react';

const DEFAULT_ID_MULTI_PREFIX = "tracePath-"; // Must match your Python script

/**
 * ShapeDisplay loads an SVG shape, styles it, and calculates checkpoints.
 */
function ShapeDisplay({
  SvgComponent, // Path to SVG
  guideColor = "stroke-guide-stroke", // Default Tailwind class
  pathIdInSvg,
  numberOfCheckpoints = 10,
  onCheckpointsCalculated
}) {
  const svgContainerRef = useRef(null);

  useEffect(() => {
    if (!svgContainerRef.current || typeof SvgComponent !== 'string') {
      if (onCheckpointsCalculated) onCheckpointsCalculated([]);
      return;
    }
    svgContainerRef.current.innerHTML = '';

    if (!pathIdInSvg || typeof numberOfCheckpoints !== 'number' || !onCheckpointsCalculated) {
      console.warn(`ShapeDisplay for ${SvgComponent}: Checkpoint calculation props missing.`);
      if (onCheckpointsCalculated) onCheckpointsCalculated([]);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', SvgComponent, true);

    xhr.onload = function() {
      if (!svgContainerRef.current) return;

      if (xhr.status === 200) {
        const container = svgContainerRef.current;
        container.innerHTML = xhr.responseText;
        const svgElement = container.querySelector('svg');

        if (svgElement) {
          // === Shape-specific SVG Styling Logic START ===
          svgElement.style.width = '100%';
          svgElement.style.height = '100%';
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          svgElement.style.transform = 'scale(0.95)'; // Default for shapes

          const allPathsForStyle = svgElement.querySelectorAll('path');
          allPathsForStyle.forEach(p => {
            p.setAttribute('stroke', 'currentColor');
            p.setAttribute('stroke-width', '4'); // Consistent thickness for shapes
            p.setAttribute('fill', 'none');
          });
          // === Shape-specific SVG Styling Logic END ===

          // --- Checkpoint Calculation (same as LetterDisplay) ---
          let pathElement = svgElement.querySelector(`#${pathIdInSvg}`);
          if (!pathElement) {
            pathElement = svgElement.querySelector(`#${DEFAULT_ID_MULTI_PREFIX}0`);
            // if (pathElement) console.info(`ShapeDisplay: Using fallback ID for ${SvgComponent}`);
          }

          if (pathElement) {
            const calculatedCheckpoints = [];
            if (numberOfCheckpoints > 0) {
              try {
                const totalLength = pathElement.getTotalLength();
                if (totalLength === 0) {
                  console.warn(`ShapeDisplay: Path in ${SvgComponent} for checkpoints has zero length.`);
                } else {
                  for (let i = 0; i < numberOfCheckpoints; i++) {
                    const pointLength = numberOfCheckpoints === 1 ? 0 : (i / (numberOfCheckpoints - 1)) * totalLength;
                    const point = pathElement.getPointAtLength(pointLength);
                    calculatedCheckpoints.push({
                      id: `cp-${pathIdInSvg.replace(/[^\w-]/g, '')}-${i}`,
                      x: point.x,
                      y: point.y,
                      order: i,
                      isHit: false,
                    });
                  }
                }
              } catch (error) {
                console.error(`ShapeDisplay: Error generating checkpoints for ${SvgComponent}`, error);
              }
            }
            onCheckpointsCalculated(calculatedCheckpoints);
          } else {
            console.warn(`ShapeDisplay: No traceable path element found for checkpoints in ${SvgComponent}.`);
            onCheckpointsCalculated([]);
          }
        } else {
            if (onCheckpointsCalculated) onCheckpointsCalculated([]);
        }
      } else {
        console.error(`ShapeDisplay: Failed to load SVG ${SvgComponent}. Status: ${xhr.status}`);
        if (onCheckpointsCalculated) onCheckpointsCalculated([]);
      }
    };
    xhr.onerror = function() {
        if (!svgContainerRef.current) return;
        console.error(`ShapeDisplay: Network error loading SVG ${SvgComponent}.`);
        if (onCheckpointsCalculated) onCheckpointsCalculated([]);
    };
    xhr.send();

  }, [SvgComponent, guideColor, pathIdInSvg, numberOfCheckpoints, onCheckpointsCalculated]);


  // Your existing rendering logic for the SVG container
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50" style={{zIndex: 1}}> {/* Guide opacity */}
      <div
        ref={svgContainerRef}
        className={`w-[400px] h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center text-black ${guideColor}`} // Use Tailwind stroke color class
        style={{ maxWidth: '95%', maxHeight: '95%' }}
      ></div>
    </div>
  );
}

export default ShapeDisplay;