import Swal from "sweetalert2";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ClapModel from "../models/ClapModel";
import correctSinhala from '../../maths/sounds/S-Correct.m4a';
import correctEng from '../../maths/sounds/Correct.m4a';
import failSinhala from '../../maths/sounds/failMsgSinhala.mp3';
import failEng from '../../maths/sounds/failMsgEng.mp3';
import confetti from 'canvas-confetti';
import { createRoot } from 'react-dom/client';

// Inject responsive Swal popup CSS only once
const injectResponsiveSwalStyles = () => {
  if (document.getElementById('responsive-swal-styles')) return; // already injected

  const style = document.createElement('style');
  style.id = 'responsive-swal-styles';
  style.innerHTML = `
    .my-swal-popup {
      width: 400px !important;
      padding: 20px 30px !important;
      font-size: 1.1rem !important;
    }
    @media (max-width: 480px) {
      .my-swal-popup {
        width: 90vw !important;
        max-width: 320px !important;
        padding: 12px 15px !important;
        font-size: 0.9rem !important;
      }
      .my-swal-popup .swal2-title {
        font-size: 1.2rem !important;
      }
      .my-swal-popup .swal2-html-container {
        font-size: 0.85rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const playSuccessSound = (language) => {
  const audioFile = language === 'si' ? correctSinhala : correctEng;
  const audio = new Audio(audioFile);
  audio.play().catch((error) => {
    console.error(`[playSuccessSound] Error playing sound:`, error);
  });
};

const playFailureSound = (language) => {
  const audioFile = language === 'si' ? failSinhala : failEng;
  const audio = new Audio(audioFile);
  audio.play().catch((error) => {
    console.error(`[playFailureSound] Error playing sound:`, error);
  });
};

const happyFaceHTML = `
  <style>
    .happy-face {
      width: 200px;
      height: 200px;
      margin: auto;
      margin-bottom: 12px;
      animation: pop 1s ease-out;
    }
    @keyframes pop {
      0% { transform: scale(0.6); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .happy-eyes circle {
      animation: blink 2s infinite;
      transform-origin: center;
    }
    @keyframes blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(0.2); }
    }
  </style>
  <div style="text-align: center;">
    <svg class="happy-face" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke="#4ade80" stroke-width="4" fill="#fefce8"/>
      <g class="happy-eyes" fill="#1f2937">
        <circle cx="35" cy="40" r="5"/>
        <circle cx="65" cy="40" r="5"/>
      </g>
      <path d="M35 65 Q50 80 65 65" stroke="#1f2937" stroke-width="4" fill="transparent" stroke-linecap="round"/>
    </svg>
    <div id="three-container"></div>
  </div>
`;

export const showSuccessAlert = (translations, language) => {
  injectResponsiveSwalStyles();

  console.log("[showSuccessAlert] Displaying success alert");

  const container = document.createElement("div");
  container.id = "three-container";
  container.style.width = "200px";
  container.style.height = "50px";
  container.style.margin = "auto";

  const root = createRoot(container);

  root.render(
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ClapModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );

  playSuccessSound(language);

  // Initial star confetti burst
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFFF99', '#FFEA00'], 
    shapes: ['star'], 
    scalar: 1,
    gravity: 0.5, 
    zIndex: 9999,
  });

  Swal.fire({
    title: translations[language].successTitle,
    text: translations[language].successText,
    icon: "success",
    html: happyFaceHTML,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      popup: 'my-swal-popup',
    },
    didOpen: () => {
      const target = document.getElementById("three-container");
      if (target) {
        target.appendChild(container);
      }

      const duration = 10 * 1000;
      const end = Date.now() + duration;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFFF99', '#FFEA00'],
          shapes: ['star'], 
          scalar: 2, 
          gravity: 0.5, 
          zIndex: 9999,
        });
      }, 500);
    },
    willClose: () => {
      root.unmount();
    },
  });
};

export const showFailureAlert = (translations, language, confidence, targetNumber, userPrediction) => {
  injectResponsiveSwalStyles();

  console.log("[showFailureAlert] Displaying failure alert");

  let message = translations[language].failureText;
  if (confidence < 0.8) {
    message = translations[language].failureLowConfidence;
  } else if (userPrediction !== targetNumber) {
    message = translations[language].failureWrongNumber
      .replace("{userPrediction}", userPrediction)
      .replace("{targetNumber}", targetNumber);
  }

  playFailureSound(language);

  Swal.fire({
    title: translations[language].failureTitle,
    text: message,
    icon: "error",
    html: happyFaceHTML,
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      popup: 'my-swal-popup',
    },
  });
};