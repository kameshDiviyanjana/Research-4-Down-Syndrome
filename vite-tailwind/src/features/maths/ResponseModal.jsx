import Swal from "sweetalert2";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ClapModel from "./models/ClapModel";
import substractSinhala from '../maths/sounds/S-Correct.m4a';
import substractSe from '../maths/sounds/Correct.m4a';
import confetti from 'canvas-confetti';
import { createRoot } from 'react-dom/client'; // For React 18
// For React 17 or earlier, use: import ReactDOM from 'react-dom';

const playSuccessSound = (language) => {
  const audioFile = language === 'si' ? substractSinhala : substractSe;
  const audio = new Audio(audioFile);
  audio.play().catch((error) => {
    console.error(`[playSuccessSound] Error playing sound:`, error);
  });
};

export const showSuccessAlert = (translations, language) => {
  console.log("[showSuccessAlert] Displaying success alert");

  // Create a container div for the Canvas
  const container = document.createElement('div');
  container.style.width = '200px';
  container.style.height = '200px';
  container.style.margin = 'auto';
  container.style.pointerEvents = 'none';

  // Render the Canvas component into the container
  const root = createRoot(container); // For React 18
  // For React 17 or earlier, use: const root = ReactDOM.render
  root.render(
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ClapModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );

  // Play success sound
  playSuccessSound(language);

  // Trigger full-page confetti animation
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
    html: container, // Pass the container div
    showConfirmButton: false,
    timer: 2000,
    didOpen: () => {
      // Continuous confetti bursts
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
      // Clean up the React root to prevent memory leaks
      root.unmount(); // For React 18
      // For React 17 or earlier, no unmount is needed if using ReactDOM.render
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

  Swal.fire({
    title: translations[language].failureTitle,
    text: message,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
  });
};