import { ThreeElements, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useAtomValue } from "jotai";
import * as THREE from "three";

import { windowCordsToCanvasVector3 } from "../windowToCanvas";
import useAnimation from "./hooks/useAnimation";
import { laserEyesEnabledAtom } from "../../../state/sound.atoms";
import { EYE_COLOR, EYE_SPHERE_RADIUS } from "./eye.constants";
import Cross from "./Cross";
import Pupil from "./Pupil";

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);
    const laserEyesEnabled = useAtomValue(laserEyesEnabledAtom);

    const pupilRef = useRef<THREE.Mesh>();
    const crossRef = useRef<THREE.Mesh>();

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

    // Pupil Animation
    const { play: playPupil, reverse: reversePupil } = useAnimation(pupilRef, [
      useMemo(
        () =>
          new THREE.VectorKeyframeTrack(
            ".scale",
            [0, 0.15],
            [1, 1, 1, 0, 0, 0]
          ),
        []
      ),
    ]);
    const { play: playCross, reverse: reverseCross } = useAnimation(crossRef, [
      useMemo(
        () =>
          new THREE.VectorKeyframeTrack(
            ".scale",
            [0, 0.15],
            [0, 0, 0, 1, 1, 1]
          ),
        []
      ),
    ]);

    useEffect(() => {
      if (laserEyesEnabled) {
        playPupil();
        playCross();
      } else {
        reversePupil();
        reverseCross();
      }
    }, [laserEyesEnabled]);

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[EYE_SPHERE_RADIUS, 32, 32]} />
        <meshBasicMaterial color={EYE_COLOR} />
        <Cross ref={crossRef} />
        <Pupil ref={pupilRef} />
      </mesh>
    );
  }
);

export default Eye;
