// src/components/ShapeDisplay.jsx

import React, { useEffect, useRef } from 'react';

function ShapeDisplay({ SvgComponent, guideColor = "stroke-guide-stroke" }) {
  const svgContainerRef = useRef(null);
  
  useEffect(() => {
    // This will run when the component mounts or when SvgComponent changes
    if (svgContainerRef.current && typeof SvgComponent === 'string') {
      // Create a new XMLHttpRequest to fetch the SVG content
      const xhr = new XMLHttpRequest();
      xhr.open('GET', SvgComponent, true);
      
      xhr.onload = function() {
        if (xhr.status === 200) {
          // Get the SVG content
          const container = svgContainerRef.current;
          container.innerHTML = xhr.responseText;
          
          // Get the SVG element we just added
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            // Apply styling to make it much larger
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            
            // Use a more balanced aspect ratio preservation
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // Apply standard scaling for shapes
            svgElement.style.transform = 'scale(0.95)';
              
            // Make sure shapes have consistent stroke width
            const paths = svgElement.querySelectorAll('path');
            paths.forEach(path => {
              path.setAttribute('stroke-width', '4'); // Consistent thickness
              path.setAttribute('stroke', 'currentColor');
            });
          }
        }
      };
      
      xhr.send();
    }
  }, [SvgComponent]);

  if (!SvgComponent) {
    return <div>No shape to display</div>;
  }

  // Handle string path (URL) for SVG
  if (typeof SvgComponent === 'string') {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Container that will hold our dynamically loaded SVG */}
        <div 
          ref={svgContainerRef}
          className={`w-[400px] h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center text-black ${guideColor}`}
          style={{ 
            maxWidth: '95%', 
            maxHeight: '95%',
          }}
        ></div>
      </div>
    );
  }
  
  // If it's a component, use it directly with enhanced styling
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* The SVG itself will be styled to act as the guide */}
      <div className="w-[400px] h-[400px] md:w-[450px] md:h-[450px]">
        <SvgComponent className={`w-full h-full ${guideColor} fill-none [&_path]:stroke-[4]`} />
      </div>
    </div>
  );
}

export default ShapeDisplay;
