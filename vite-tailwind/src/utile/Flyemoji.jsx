// ConfettiEmoji.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getRandomPosition = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
});

export default function ConfettiEmoji(props) {
  const [position, setPosition] = useState(getRandomPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed text-2xl z-50 pointer-events-none"
      animate={{ top: position.top, left: position.left }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{ position: "fixed", top: position.top, left: position.left }}
    >
      {props.image}
    </motion.div>
  );
}
