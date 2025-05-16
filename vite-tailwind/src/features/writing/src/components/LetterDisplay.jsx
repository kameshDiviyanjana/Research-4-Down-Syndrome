// src/components/LetterDisplay.jsx

// We need to import 'React' if we are using Vite with the ?react suffix for SVGs in some setups,
// or if this component might have its own logic/state later.
// For just passing through an SVG component as a prop, it might not be strictly necessary
// for the component's own functionality, but it's good practice.
import React, { useEffect, useRef } from 'react';

function LetterDisplay({ SvgComponent, guideColor = "stroke-guide-stroke" }) {
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
          if (svgElement) {            // Apply styling to make it much larger
            svgElement.style.width = '100%';
            svgElement.style.height = '70%';
            
            // Use a more balanced aspect ratio preservation
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
              // Determine which file we have and apply appropriate transforms
            const fileName = SvgComponent.split('/').pop();            // Check if this is a letter or a stroke
            if (fileName.match(/^\d+-.-min\.svg$/)) {
              // This is a letter SVG file (e.g. "01-අ-min.svg")
              
              // Extract the letter number to give special treatment to certain letters
              const letterNumber = parseInt(fileName.split('-')[0]);
              
              if (letterNumber > 20) {
                // Consonants (ක, ච, etc.) might need different scaling
                svgElement.style.transform = 'scale(0.7) translateY(-35px)';
              } else if (letterNumber >= 9 && letterNumber <= 11) {
                // Letters like ඍ, ඎ, and ඏ are typically taller
                svgElement.style.transform = 'scale(0.65) translateY(-45px)';
              } else {
                // Default for vowels
                svgElement.style.transform = 'scale(0.75) translateY(-40px)';
              }
              
              // Make sure letters have consistent stroke width
              const paths = svgElement.querySelectorAll('path');
              paths.forEach(path => {
                path.setAttribute('stroke-width', '3'); // Slightly thinner for letters
              });
            }
            // Special handling for specific strokes
            else if (fileName.includes('ispilla')) {
              // Ispillas need special handling to center them in the viewport
              svgElement.style.transform = 'scale(0.9) translateY(20px)';
            } else if (fileName.includes('kombu')) {
              // Kombuwa series might need different handling
              svgElement.style.transform = 'scale(0.9)';
            } else {
              // Default vertical stretch for most strokes
              svgElement.style.transform = 'scaleY(1.2)';
            }
              
            // Adjust stroke thickness to be more appropriate
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
    return <div>No letter to display</div>;
  }

  // Check if the SVG is a string path or a React component
  if (typeof SvgComponent === 'string') {    // If it's a string (URL/path), we'll manually load and scale the SVG
    // Check if this is a letter SVG (has pattern like 01-අ-min.svg)
    const isLetter = SvgComponent.split('/').pop().match(/^\d+-.-min\.svg$/);
    
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Container that will hold our dynamically loaded SVG */}        <div 
          ref={svgContainerRef}
          className={`w-[400px] h-[450px] md:w-[450px] md:h-[500px] flex items-center justify-center text-black ${guideColor}`}
          style={{ 
            maxWidth: '95%', 
            maxHeight: '95%',
            transform: isLetter 
              ? 'scale(0.9)' // Less scaling for letters
              : 'scale(1.2) scaleY(1.2)' // Original scaling for strokes
          }}
        ></div>
      </div>
    );
  }
  // If it's a component, use it directly with enhanced styling
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* The SVG itself will be styled to act as the guide */}      <div className="w-[400px] h-[450px] md:w-[450px] md:h-[500px]" style={{ transform: 'scale(1.2) scaleY(1.2)' }}>
        <SvgComponent className={`w-full h-full ${guideColor} fill-none [&_path]:stroke-[4]`} />
      </div>
    </div>
  );
}

export default LetterDisplay;