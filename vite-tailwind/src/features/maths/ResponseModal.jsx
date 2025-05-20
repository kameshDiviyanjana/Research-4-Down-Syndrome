import Swal from "sweetalert2";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ClapModel from "./models/ClapModel";
import substractSinhala from '../maths/sounds/S-Correct.m4a';
import substractSe from '../maths/sounds/Correct.m4a';

const playSuccessSound = (language) => {
  const audioFile = language === 'si' ? substractSinhala : substractSe;
  const audio = new Audio(audioFile);
  audio.play().catch((error) => {
    console.error(`[playSuccessSound] Error playing sound:`, error);
  });
};

export const showSuccessAlert = (translations, language) => {
  console.log("[showSuccessAlert] Displaying success alert");

  // Play success sound
  playSuccessSound(language);

  Swal.fire({
    title: translations[language].successTitle,
    text: translations[language].successText,
    icon: "success",
    html: (
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          margin: 'auto',
          pointerEvents: 'none',
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ClapModel />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    ),
    showConfirmButton: false,
    timer: 2000,
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