import { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ open, children, onClose }) => {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "100%", // Adjusted to full width on small screens
    maxWidth: "1000px", // Max width to 1000px
    transform: "translate(-50%, -50%)",

    padding: "20px", // Reduced padding for smaller screens
    zIndex: 1000,
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  };

  useEffect(() => {
    if (open) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scroll when component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;
  //   if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div
        style={MODAL_STYLES}
        className="mt-6   rounded-lg shadow-lg p-4 sm:p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2  text-white hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal-container")
  );
};

export default Modal;
