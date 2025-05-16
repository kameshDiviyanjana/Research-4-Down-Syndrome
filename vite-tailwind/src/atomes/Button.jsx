import React, { useEffect } from "react";

function Button(props) {
  const handleKeyPress = (event) => {
    // Check if the "Enter" key is pressed
    if (event.key === "Enter") {
      props.Onclick();
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    if (props.enterallow) {
      window.addEventListener("keydown", handleKeyPress);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, []);

  return (
    <div>
      <button
        className={props.styles}
        onClick={props.Onclicks}
      >
        {props.buttonname}
      </button>
    </div>
  );
}

export default Button;
