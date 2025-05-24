import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const FishModel = () => {
    const ref = useRef();
    const { scene, animations } = useGLTF("/models/fish1.glb");
    const mixer = useRef();
    const fins = useRef({ tail: null, leftPectoral: null, rightPectoral: null });

    // Handle built-in animations
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
        // Log scene structure to identify fin names 
        scene.traverse((child) => {
            if (child.isMesh || child.isBone) {
               // console.log(child.name);
                if (child.name.toLowerCase().includes("tail")) {
                    fins.current.tail = child;
                } else if (child.name.toLowerCase().includes("pectoral") && child.name.toLowerCase().includes("left")) {
                    fins.current.leftPectoral = child;
                } else if (child.name.toLowerCase().includes("pectoral") && child.name.toLowerCase().includes("right")) {
                    fins.current.rightPectoral = child;
                }
            }
        });

        // Play built-in animations if available
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const swimAnimation = actions[Object.keys(actions)[0]]; 
            if (swimAnimation) {
                swimAnimation.play();
            }
        }

        // Animate movement along x and y slowly using GSAP loop
        gsap.to(ref.current.position, {
            x: "+=0.3",
            y: "+=0.3",
            repeat: -1,
            yoyo: true,
            duration: 25,
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

            // Fallback manual fin animation if built-in animations don't cover fins
            if (!animations.length) {
                const time = state.clock.elapsedTime;
                if (fins.current.tail) {
                    fins.current.tail.rotation.y = Math.sin(time * 4) * 0.3;
                }
                if (fins.current.leftPectoral) {
                    fins.current.leftPectoral.rotation.z = Math.sin(time * 3) * 0.2;
                }
                if (fins.current.rightPectoral) {
                    fins.current.rightPectoral.rotation.z = -Math.sin(time * 3) * 0.2;
                }
            }
        }
    });

    return <primitive ref={ref} object={scene} scale={0.4} />;
};

export default FishModel;