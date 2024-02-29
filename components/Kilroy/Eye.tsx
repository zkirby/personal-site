import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { shouldCloseEyesAtom } from "../../state/sound.atoms";
import { useAtom } from "jotai";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { windowCordsToCanvasVector3 } from "./windowToCanvas";

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

function useAnimation(ref, keyframes) {
  const mixer = useMemo(() => {
    if (!ref.current) return;
    return new THREE.AnimationMixer(ref.current);
  }, [ref.current]);

  const clip = useMemo(() => {
    return new THREE.AnimationClip("Action", 1, keyframes);
  }, keyframes);

  const action = useMemo(() => {
    if (!mixer || !clip) return;
    const animationAction = new THREE.AnimationAction(mixer, clip);
    animationAction.setLoop(THREE.LoopOnce);
    animationAction.clampWhenFinished = true;
    return animationAction;
  }, [clip, mixer]);

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta);
  });

  return {
    play: useCallback(() => {
      if (!action) return;
      action.reset();
      action.timeScale = 0.8;
      action.play();
    }, [action]),
    reverse: useCallback(() => {
      if (!action) return;
      action.paused = false;
      action.timeScale = -1.8;
      action.play();
    }, [action]),
  };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);
    const [shouldCloseEyes] = useAtom(shouldCloseEyesAtom);

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

    const crossGeo = useMemo(() => {
      const boxW = 0.05;
      const boxH = 0.1;
      const boxD = 0.4;
      const geometry1 = new THREE.BoxGeometry(boxW, boxH, boxD);
      const geometry2 = new THREE.BoxGeometry(boxW, boxH, boxD);

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
      if (shouldCloseEyes) {
        playPupil();
        playCross();
      }
      if (!shouldCloseEyes) {
        reversePupil();
        reverseCross();
      }
    }, [shouldCloseEyes]);

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#e8e8e8" />

        {/* Pupil */}
        <mesh
          position={[0, 0, 0.2]}
          geometry={crossGeo}
          ref={crossRef}
          scale={[0, 0, 0]}
        >
          <meshToonMaterial color="#b91c1b" opacity={0} />
        </mesh>
        <mesh position={[0, 0, 0.125]} ref={pupilRef} scale={[1, 1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshToonMaterial color="black" />
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
