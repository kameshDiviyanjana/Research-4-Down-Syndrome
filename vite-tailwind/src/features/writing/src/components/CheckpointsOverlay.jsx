import React from 'react';

/**
 * @typedef {object} Checkpoint
 * @property {string} id - Unique ID for the checkpoint.
 * @property {number} x - X-coordinate.
 * @property {number} y - Y-coordinate.
 * @property {number} order - The sequence order.
 * @property {boolean} isHit - Whether it has been hit.
 */

/**
 * CheckpointsOverlay component displays visual cues (circles) for each checkpoint.
 * @param {object} props
 * @param {Array<Checkpoint>} props.checkpoints - The list of checkpoints to display.
 * @param {number} [props.checkpointSize=12] - The diameter of the checkpoint circle.
 * @param {string} [props.nextTargetColor='gold'] - Color for the next unhit checkpoint.
 * @param {string} [props.hitColor='rgba(74, 222, 128, 0.7)'] - Color for hit checkpoints (semi-transparent green).
 * @param {string} [props.defaultColor='rgba(150, 150, 150, 0.5)'] - Color for unhit, non-target checkpoints.
 */
function CheckpointsOverlay({
  checkpoints,
  checkpointSize = 12, // Slightly larger for visibility
  nextTargetColor = 'gold',
  hitColor = 'rgba(74, 222, 128, 0.7)', // Tailwind green-400 with alpha
  defaultColor = 'rgba(150, 150, 150, 0.5)'
}) {
  if (!checkpoints || checkpoints.length === 0) {
    return null;
  }

  const firstUnhitIndex = checkpoints.findIndex(cp => !cp.isHit);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }} // Ensure it's above the guide SVG but below the TracingCanvas
    >
      {checkpoints.map((cp, index) => {
        let fillColor = defaultColor;
        let strokeColor = 'rgba(0,0,0,0.1)';
        let effectiveSize = checkpointSize;

        if (cp.isHit) {
          fillColor = hitColor;
        } else if (index === firstUnhitIndex) {
          fillColor = nextTargetColor;
          strokeColor = 'rgba(0,0,0,0.3)';
          effectiveSize = checkpointSize * 1.2; // Make next target slightly bigger
        }

        return (
          <svg
            key={cp.id}
            className="absolute"
            style={{
              left: `${cp.x - effectiveSize / 2}px`,
              top: `${cp.y - effectiveSize / 2}px`,
              transition: 'transform 0.2s ease-out, fill 0.2s ease-in-out' // Smooth transitions
            }}
            width={effectiveSize}
            height={effectiveSize}
            viewBox={`0 0 ${effectiveSize} ${effectiveSize}`} // Adjust viewBox
          >
            <circle
              cx={effectiveSize / 2}
              cy={effectiveSize / 2}
              r={effectiveSize / 2 * 0.8} // Circle radius smaller than SVG element for padding
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="1"
            />
            {/* Optional: Display order number */}
            {/* <text
              x={effectiveSize / 2}
              y={effectiveSize / 2}
              fontSize={effectiveSize / 2.5}
              textAnchor="middle"
              dy=".3em"
              fill="black"
              opacity={cp.isHit ? 0.5 : 1}
            >
              {cp.order + 1}
            </text> */}
          </svg>
        );
      })}
    </div>
  );
}

export default CheckpointsOverlay;