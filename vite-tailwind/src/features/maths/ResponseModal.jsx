// src/components/ResponseModal.js
import Swal from "sweetalert2";
import SmileImage from "../../../src/assets/smile.jpg"; // Adjust path if necessary

export const showSuccessAlert = (translations, language) => {
  console.log("[showSuccessAlert] Displaying success alert");
  Swal.fire({
    title: translations[language].successTitle,
    text: translations[language].successText,
    icon: "success",
    imageUrl: SmileImage,
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Smile image',
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
