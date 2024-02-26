import { ThreeElements, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import windowCordsToCanvasVector from "./windowToCanvasVector";

function Pupil() {
  return (
    <mesh position={[0, 0, 0.25]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshToonMaterial color="black" />
      <mesh position={[0.05, 0.05, 0.15]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshToonMaterial />
      </mesh>
    </mesh>
  );
}

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);

    useEffect(() => {
      if (!props.coords || !ref.current) return;

      const pointOfIntersection = windowCordsToCanvasVector(
        props.coords,
        camera
      );
      // Make the eye look at the point of intersection
      // @ts-expect-error
      ref.current.lookAt(pointOfIntersection);
    }, [ref?.current, props.coords]);

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#e8e8e8" />
        <Pupil />
      </mesh>
    );
  }
);

export default Eye;
