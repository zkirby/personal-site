import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect, useRef } from "react";
import windowCordsToCanvasVector from "./windowToCanvasVector";
import { shouldCloseEyesAtom } from "../../state/sound.atoms";
import { useAtom } from "jotai";
import * as THREE from "three";

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);
    const [shouldCloseEyes] = useAtom(shouldCloseEyesAtom);

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

    const pupilRef = useRef();

    const vec = new THREE.Vector3();

    // useEffect(() => {
    //   if (!pupilRef.current) return;
    //   const geometry = pupilRef.current.geometry;

    //   // create an empty array to  hold targets for the attribute we want to morph
    //   // morphing positions and normals is supported
    //   geometry.morphAttributes.position = [];

    //   const positions = geometry.attributes.position;
    //   const newPost = [];

    //   const a = Array(16).fill(0);
    //   const b = Array(16).fill(0);

    //   const VERT1 = 0.4;
    //   const VERT2 = 0.2;

    //   let ab = [0, 0];
    //   console.log(positions.count);
    //   for (var i = 0; i < positions.count; i++) {
    //     // tile
    //     vec.fromBufferAttribute(positions, i);
    //     let x = vec.x;
    //     let y = vec.y;
    //     let z = vec.z;

    //     if (x > 0 && y > 0) {
    //       y += VERT2;
    //       x += VERT2;
    //     } else if (x > 0 && y < 0) {
    //       y -= VERT2;
    //       x += VERT2;
    //     } else if (x < 0 && y > 0) {
    //       y += VERT2;
    //       x -= VERT2;
    //     } else if (x < 0 && y < 0) {
    //       y -= VERT2;
    //       x -= VERT2;
    //     }

    //     const sliceIndex = getSliceIndex(x, y, z);
    //     a[sliceIndex]++;

    //     // if (sliceIndex === 0) {
    //     //   x = VERT2;
    //     //   y = -VERT1;
    //     // } else if (sliceIndex === 1) {
    //     //   x = VERT2;
    //     // //   y = -VERT1;
    //     // if (sliceIndex === 0 || sliceIndex === 15) {
    //     //   // x = VERT1;
    //     //   // x = -VERT1;
    //     // } else if (sliceIndex === 12 || sliceIndex === 11) {
    //     //   y = VERT1;
    //     // } else if (sliceIndex === 4 || sliceIndex === 3) {
    //     //   y = -VERT1;
    //     // } else if (sliceIndex === 7 || sliceIndex === 8) {
    //     //   x = VERT1;
    //     // } else {
    //     //   // x = 0;
    //     //   // y = 0;
    //     // }

    //     newPost.push(x, y, z);
    //   }
    //   console.log(b);

    //   geometry.morphAttributes.position = [
    //     new THREE.Float32BufferAttribute(newPost, 3),
    //   ];

    //   pupilRef.current.updateMorphTargets();
    // }, [pupilRef.current]);

    // useFrame((_, d) => {
    //   if (!pupilRef.current) return;

    //   // Open the eyes

    //   // pupilRef.current.morphTargetInfluences["x"] += d / 2;
    // });

    // useFrame(({ clock }) => {
    //   if (!pupilRef.current) return;
    //   pupilRef.current.morphTargetInfluences[0] =
    //     Math.sin(clock.getElapsedTime() * 3) * 0.5 + 0.5;
    // });

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#e8e8e8" />

        {/* Pupil */}
        <mesh
          position={[0, 0, 0.125]}
          ref={pupilRef}
          // morphTargetInfluences={[0]}
        >
          <sphereGeometry args={[0.1, 100, 100]} />
          <meshToonMaterial color="black" morphTargets />
          <mesh position={[0.025, 0.025, 0.075]}>
            <sphereGeometry args={[0.025, 32, 32]} />
            <meshToonMaterial />
          </mesh>
        </mesh>
      </mesh>
    );
  }
);

export default Eye;
