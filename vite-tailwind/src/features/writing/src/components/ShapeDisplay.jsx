import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
  const prevSvgComponent = useRef(null);
  const prevPathId = useRef(null);

  useEffect(() => {
    if (!svgContainerRef.current || typeof SvgComponent !== 'string') {
      if (onCheckpointsCalculated) onCheckpointsCalculated([]);
      return;
    }

    // Only reload SVG if SvgComponent or critical pathIdInSvg changed
    if (SvgComponent !== prevSvgComponent.current || pathIdInSvg !== prevPathId.current) {
      svgContainerRef.current.innerHTML = '';
      prevSvgComponent.current = SvgComponent;
      prevPathId.current = pathIdInSvg;

      if (!pathIdInSvg || typeof numberOfCheckpoints !== 'number' || !onCheckpointsCalculated) {
        console.warn(`ShapeDisplay for ${SvgComponent}: Checkpoint props missing.`);
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
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

            const allPathsForStyle = svgElement.querySelectorAll('path');
            allPathsForStyle.forEach(p => {
              p.setAttribute('stroke', 'currentColor');
              const fileName = SvgComponent.split('/').pop();
              const isShapeFile = fileName.match(/shape/); // Adjust pattern as needed
              p.setAttribute('stroke-width', isShapeFile ? '3' : '4');
              p.setAttribute('fill', 'none');
            });

            let pathElement = svgElement.querySelector(`#${pathIdInSvg}`);
            if (!pathElement) pathElement = svgElement.querySelector(`#${DEFAULT_ID_MULTI_PREFIX}0`);

            if (pathElement) {
              const calculatedCheckpoints = [];
              const viewBox = svgElement.viewBox?.baseVal;

              if (numberOfCheckpoints > 0 && viewBox && container.clientWidth > 0 && container.clientHeight > 0) {
                try {
                  const totalLength = pathElement.getTotalLength();
                  if (totalLength === 0) {
                    console.warn(`Path for checkpoints in ${SvgComponent} has zero length.`);
                  } else {
                    const scaleToFit = Math.min(container.clientWidth / viewBox.width, container.clientHeight / viewBox.height);
                    const finalViewBoxRenderedWidth = viewBox.width * scaleToFit;
                    const finalViewBoxRenderedHeight = viewBox.height * scaleToFit;
                    const offsetX = (container.clientWidth - finalViewBoxRenderedWidth) / 2;
                    const offsetY = (container.clientHeight - finalViewBoxRenderedHeight) / 2;

                    for (let i = 0; i < numberOfCheckpoints; i++) {
                      const pointLength = numberOfCheckpoints === 1 ? 0 : (i / (numberOfCheckpoints - 1)) * totalLength;
                      const rawSvgPoint = pathElement.getPointAtLength(pointLength);

                      const finalX = (rawSvgPoint.x - viewBox.x) * scaleToFit + offsetX;
                      const finalY = (rawSvgPoint.y - viewBox.y) * scaleToFit + offsetY;

                      calculatedCheckpoints.push({
                        id: `cp-${pathIdInSvg.replace(/[^\w-]/g, '')}-${i}`,
                        x: finalX,
                        y: finalY,
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
    }
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

ShapeDisplay.propTypes = {
  SvgComponent: PropTypes.string.isRequired,
  guideColor: PropTypes.string,
  pathIdInSvg: PropTypes.string.isRequired,
  numberOfCheckpoints: PropTypes.number,
  onCheckpointsCalculated: PropTypes.func.isRequired,
};

export default ShapeDisplay;