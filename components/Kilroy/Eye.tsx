import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { shouldCloseEyesAtom } from "../../state/sound.atoms";
import { useAtom } from "jotai";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { windowCordsToCanvasVector3 } from "./windowToCanvas";

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);
    const [shouldCloseEyes] = useAtom(shouldCloseEyesAtom);

    const pupilRef = useRef<THREE.Mesh>();

    useEffect(() => {
      if (!props.coords || !ref.current) return;

      const pointOfIntersection = windowCordsToCanvasVector3(
        props.coords,
        camera
      );
      // Make the eye look at the point of intersection
      // @ts-expect-error
      ref.current.lookAt(pointOfIntersection);
    }, [ref?.current, props.coords]);

    const crossGeo = useMemo(() => {
      const boxW = 0.1;
      const boxH = 0.1;
      const boxD = 0.5;
      const geometry1 = new THREE.BoxGeometry(boxW, boxH, boxD, 100, 50);
      const geometry2 = new THREE.BoxGeometry(boxW, boxH, boxD, 100, 50);

      // Translate the second box to form the 'X' shape
      geometry2.rotateX(Math.PI / 2); // Rotate by 45 degrees

      const combinedGeometry = BufferGeometryUtils.mergeGeometries([
        geometry1,
        geometry2,
      ]);

      combinedGeometry.rotateX(Math.PI / 4);
      combinedGeometry.rotateY(Math.PI / 2);
      return combinedGeometry;
    }, []);

    useEffect(() => {
      if (!crossGeo) return;
      const geometry = crossGeo;
      const squareGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2, 1, 1);
      const sphereGeometry = new THREE.SphereGeometry(Math.sqrt(2) / 8, 64);

      // create an empty array to  hold targets for the attribute we want to morph
      // morphing positions and normals is supported
      geometry.morphAttributes.position = [];

      const positions = geometry.attributes.position;
      const newPost = [];

      const vertex = new THREE.Vector3();
      const direction = new THREE.Vector3(1, 0, 0);
      const twistPositions = [];

      console.log(sphereGeometry.attributes.position.count);
      for (var i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        newPost.push(
          x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
          y,
          z
          // y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
          // z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3)
        );
        // vertex.set(x * 2, y, z);

        // vertex
        //   .applyAxisAngle(direction, (Math.PI * x) / 2)
        //   .toArray(twistPositions, twistPositions.length);
      }

      geometry.morphAttributes.position = [
        new THREE.Float32BufferAttribute(
          sphereGeometry.attributes.position.array,
          3
        ),
      ];

      pupilRef.current.updateMorphTargets();
    }, [pupilRef.current, crossGeo]);

    useFrame(({ clock }) => {
      if (!pupilRef.current) return;
      pupilRef.current.morphTargetInfluences[0] =
        Math.sin(clock.getElapsedTime()) * 0.5 + 0.5;
    });

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[0, 32, 32]} />
        <meshBasicMaterial color="#e8e8e8" />

        {/* Pupil */}
        <mesh
          position={[0, 0, 0.2]}
          morphTargetInfluences={[0]}
          geometry={crossGeo}
          ref={pupilRef}
        >
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
