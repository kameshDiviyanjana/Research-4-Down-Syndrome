// src/features/writing/src/components/LetterAnimator.jsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

// This component will animate an SVG letter by drawing its paths
const LetterAnimator = forwardRef(({ 
  SvgComponent, 
  animationDelay = 0.5, 
  duration = 8,
  tracerColor = "#FF5733",
  tracerSize = 8,
  onAnimationComplete,
  guideColor = "stroke-guide-stroke" 
}, ref) => {
  const svgContainerRef = useRef(null);
  const timeline = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Expose methods to control the animation
  useImperativeHandle(ref, () => ({
    play: () => {
      if (timeline.current) {
        timeline.current.restart();
        setIsAnimating(true);
      }
    },
    pause: () => {
      if (timeline.current) {
        timeline.current.pause();
        setIsAnimating(false);
      }
    },
    reset: () => {
      if (timeline.current) {
        timeline.current.pause(0);
        setIsAnimating(false);
      }
    }
  }));

  useEffect(() => {
    // This will run when the component mounts or when SvgComponent changes
    if (!svgContainerRef.current || !SvgComponent) return;

    // Get the DOM elements from the container
    const svgContainer = svgContainerRef.current;
    
    // Clear previous content
    while (svgContainer.firstChild) {
      svgContainer.removeChild(svgContainer.firstChild);
    }

    // Load SVG content
    const xhr = new XMLHttpRequest();
    xhr.open('GET', SvgComponent, true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Get the SVG content
        svgContainer.innerHTML = xhr.responseText;
        
        // Get the SVG element we just added
        const svgElement = svgContainer.querySelector('svg');
        if (!svgElement) return;
        
        // Apply appropriate styling (similar to LetterDisplay.jsx)
        svgElement.style.width = '100%';
        svgElement.style.height = '70%';
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        // Apply letter-specific scaling if needed
        const fileName = SvgComponent.split('/').pop();
        if (fileName.match(/^\\d+-.-min\\.svg$/)) {
          const letterNumber = parseInt(fileName.split('-')[0]);
          
          if (letterNumber > 20) {
            // Consonants
            svgElement.style.transform = 'scale(0.7) translateY(-35px)';
          } else if (letterNumber >= 9 && letterNumber <= 11) {
            // Taller vowels
            svgElement.style.transform = 'scale(0.65) translateY(-45px)';
          } else {
            // Regular vowels
            svgElement.style.transform = 'scale(0.75) translateY(-40px)';
          }
        }
        
        // Get all paths in the SVG
        const paths = svgElement.querySelectorAll('path');
        if (!paths.length) return;
        
        // Set up proper stroke attributes
        paths.forEach(path => {
          path.setAttribute('stroke-width', '3');
          path.setAttribute('stroke', 'currentColor');
          path.setAttribute('fill', 'none');
          
          // Set initial state for animation - path is invisible
          gsap.set(path, { 
            strokeDasharray: path.getTotalLength(),
            strokeDashoffset: path.getTotalLength() 
          });
        });
        
        // Create a tracer dot
        const tracerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        tracerSvg.setAttribute('width', tracerSize * 2);
        tracerSvg.setAttribute('height', tracerSize * 2);
        tracerSvg.style.position = 'absolute';
        tracerSvg.style.top = '0';
        tracerSvg.style.left = '0';
        tracerSvg.style.overflow = 'visible';
        tracerSvg.style.pointerEvents = 'none';
        tracerSvg.style.zIndex = '10';
        
        const tracerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        tracerDot.setAttribute('cx', tracerSize);
        tracerDot.setAttribute('cy', tracerSize);
        tracerDot.setAttribute('r', tracerSize);
        tracerDot.setAttribute('fill', tracerColor);
        
        tracerSvg.appendChild(tracerDot);
        svgContainer.appendChild(tracerSvg);
        
        // Create a timeline for animation
        timeline.current = gsap.timeline({
          paused: true, 
          delay: animationDelay,
          onComplete: () => {
            setIsAnimating(false);
            if (onAnimationComplete) onAnimationComplete();
          }
        });
        
        // Add animations for each path
        paths.forEach((path, index) => {
          // Add sequence for each path
          const pathLength = path.getTotalLength();
          const duration = Math.min(Math.max(pathLength / 100, 1), 4); // Duration based on path length
          
          // Calculate path position in SVG space
          const pathBBox = path.getBBox();
          
          // Add a start delay for staggered effect after the first path
          const startDelay = index > 0 ? 0.5 : 0;
          
          // Move tracer to start of path
          timeline.current.set(tracerDot, {
            attr: {
              cx: tracerSize,
              cy: tracerSize
            }
          }, `pathStart${index}`);
          
          // First position the tracer at the start point of the path
          timeline.current.set(tracerSvg, {
            x: pathBBox.x - tracerSize,
            y: pathBBox.y - tracerSize,
            opacity: 1
          }, `pathStart${index}`);
          
          // Then animate the path and tracer together
          timeline.current
            .to(path, {
              strokeDashoffset: 0,
              duration: duration,
              ease: "none"
            }, `path${index}+=${startDelay}`)
            .to(tracerSvg, {
              motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
              },
              duration: duration,
              ease: "none",
              onUpdate: function() {
                // Maybe add additional visual feedback here
              }
            }, `path${index}+=${startDelay}`);
        });
      }
    };
    
    xhr.send();
    
    return () => {
      // Cleanup animation when component unmounts
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, [SvgComponent, animationDelay, duration, tracerColor, tracerSize, onAnimationComplete]);

  if (!SvgComponent) {
    return <div>No letter to animate</div>;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div 
        ref={svgContainerRef}
        className={`w-[400px] h-[450px] md:w-[450px] md:h-[500px] flex items-center justify-center text-black ${guideColor}`}
        style={{ 
          maxWidth: '95%', 
          maxHeight: '95%',
          position: 'relative'
        }}
      />
    </div>
  );
});

LetterAnimator.displayName = 'LetterAnimator';

LetterAnimator.propTypes = {
  SvgComponent: PropTypes.string.isRequired,
  animationDelay: PropTypes.number,
  duration: PropTypes.number,
  tracerColor: PropTypes.string,
  tracerSize: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  guideColor: PropTypes.string
};

export default LetterAnimator;
