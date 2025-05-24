import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const TropicalFishSchoolModel = ({ scale = 4, moveDistanceX = 0.4, moveDistanceY = 0.1, moveDuration = 10, rotationSpeed = 0.001 }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF("/models/fishes.glb");
    const mixer = useRef();

    // Handle built-in animations
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
        // Log scene structure for debugging
        scene.traverse((child) => {
            if (child.isMesh || child.isBone) {
               // console.log(child.name);

                // If the child has a material, set its color
                if (child.material && child.material.color) {
                    // Here you can set different colors for each mesh if you want
                    if (child.name.includes("Object_156")) {
                        child.material.color.set(0xff6347); // Tomato red
                    } else if (child.name.includes("Object_159")) {
                        child.material.color.set(0x4682b4); // Steel blue
                    } else if (child.name.includes("Object_162")) {
                        child.material.color.set(0x32cd32); // Lime green
                    } else if (child.name.includes("Object_165")) {
                        child.material.color.set(0xffff00); // Yellow
                    }
                }
            }
        });

        // Play built-in swim animation if available
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            // Prioritize swim animation
            const swimAnimation = Object.values(actions).find(action => 
                action._clip.name.toLowerCase().includes("swim") || 
                action._clip.name.toLowerCase().includes("loop")
            );
            if (swimAnimation) {
                swimAnimation.play();
            } else {
                // Fallback to first animation
                const firstAnimation = actions[Object.keys(actions)[0]];
                if (firstAnimation) {
                    firstAnimation.play();
                }
            }
        }

        // Animate movement along x and y slowly using GSAP loop
        gsap.to(ref.current.position, {
            x: `+=${moveDistanceX}`,
            y: `+=${moveDistanceY}`,
            repeat: -1,
            yoyo: true,
            duration: moveDuration,
            ease: "sine.inOut",
        });
    }, [scene, animations, actions, moveDistanceX, moveDistanceY, moveDuration]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Update animation mixer
            if (mixer.current) {
                mixer.current.update(delta);
            }

            // Subtle body rotation
            ref.current.rotation.y += rotationSpeed;
        }
    });

    return <primitive ref={ref} object={scene} scale={scale} />;
};

export default TropicalFishSchoolModel;
