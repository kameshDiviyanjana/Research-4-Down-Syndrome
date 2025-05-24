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

export const showSuccessAlert = (translations, language) => {
  console.log("[showSuccessAlert] Displaying success alert");

  const container = document.createElement('div');
  container.style.width = '200px';
  container.style.height = '200px';
  container.style.margin = 'auto';
  container.style.pointerEvents = 'none';

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

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF4500', '#00FF00', '#1E90FF'],
    zIndex: 9999,
  });

  Swal.fire({
    title: translations[language].successTitle,
    text: translations[language].successText,
    icon: "success",
    html: container,
    showConfirmButton: false,
    timer: 2000,
    didOpen: () => {
      const duration = 10 * 1000;
      const end = Date.now() + duration;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FF4500', '#00FF00', '#1E90FF'],
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
    showConfirmButton: false,
    timer: 2000,
  });
};