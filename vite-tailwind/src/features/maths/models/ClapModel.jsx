import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const ClapModel = () => {
  const ref = useRef();
  const { scene, animations } = useGLTF("/models/clap.glb");
  const mixer = useRef();
  const parts = useRef({ leftArm: null, rightArm: null });

  // Handle built-in animations
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    // Log scene structure to identify arm/hand names (for debugging)
    scene.traverse((child) => {
      if (child.isMesh || child.isBone) {
        console.log(child.name);
        if (child.name.toLowerCase().includes("arm") && child.name.toLowerCase().includes("left")) {
          parts.current.leftArm = child;
        } else if (child.name.toLowerCase().includes("arm") && child.name.toLowerCase().includes("right")) {
          parts.current.rightArm = child;
        }
      }
    });

    // Play built-in clapping animation if available
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const clapAnimation = actions[Object.keys(actions)[0]]; // Play first animation (e.g., "Clap")
      if (clapAnimation) {
        clapAnimation.play();
      }
    }

    // Animate movement along x and y slowly using GSAP loop
    gsap.to(ref.current.position, {
      x: "+=0.2",
      y: "+=0.2",
      repeat: -1,
      yoyo: true,
      duration: 20,
      ease: "sine.inOut",
    });
  }, [scene, animations, actions]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Update animation mixer
      if (mixer.current) {
        mixer.current.update(delta);
      }

      // Subtle body rotation
      ref.current.rotation.y += 0.001;

      // Fallback manual arm animation if built-in animations don't cover clapping
      if (!animations.length) {
        const time = state.clock.elapsedTime;
        if (parts.current.leftArm) {
          parts.current.leftArm.rotation.x = Math.sin(time * 4) * 0.3;
        }
        if (parts.current.rightArm) {
          parts.current.rightArm.rotation.x = -Math.sin(time * 4) * 0.3;
        }
      }
    }
  });

  return <primitive ref={ref} object={scene} scale={0.02} />;
};

export default ClapModel;