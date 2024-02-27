import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import windowCordsToCanvasVector from "./windowToCanvasVector";
import * as THREE from "three";
import { shouldCloseEyesAtom } from "../../state/sound.atoms";
import { useAtom } from "jotai";

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

function useLidAnimation(
  lidRef: React.RefObject<ThreeElements["mesh"]>,
  positionEnd: [number, number, number]
) {
  const mixer = useMemo(() => {
    if (!lidRef.current) return;
    return new THREE.AnimationMixer(lidRef.current);
  }, [lidRef.current]);

  const positionStart = [0, 0, 0];
  const positionKF = useMemo(() => {
    return new THREE.VectorKeyframeTrack(
      ".position",
      [0, 0.02],
      positionStart.concat(positionEnd)
    );
  }, []);
  const scaleKF = useMemo(() => {
    return new THREE.VectorKeyframeTrack(
      ".scale",
      [0, 0.001],
      [1, 1, 1, 1.05, 1.05, 1.05]
    );
  }, []);

  const clip = useMemo(() => {
    return new THREE.AnimationClip("Action", 0.1, [positionKF, scaleKF]);
  }, [positionKF]);

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
      action.timeScale = 0.5;
      action.play();
    }, [action]),
    reverse: useCallback(() => {
      if (!action) return;
      action.paused = false;
      action.timeScale = -0.5;
      action.play();
    }, [action]),
  };
}

interface EyeProps {
  position: [number, number, number];
  coords: { x: number; y: number };
}

const Eye = forwardRef(
  (props: EyeProps, ref: React.RefObject<ThreeElements["mesh"]>) => {
    const camera = useThree((p) => p.camera);
    const [shouldCloseEyes] = useAtom(shouldCloseEyesAtom);

    const topEyeLid = useRef();
    const bottomEyeLid = useRef();

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

    const { play: playTop, reverse: reverseTop } = useLidAnimation(
      topEyeLid,
      [0, 0.05, 0.06]
    );
    const { play: playBottom, reverse: reverseBottom } = useLidAnimation(
      bottomEyeLid,
      [0, 0, 0.06]
    );

    useEffect(() => {
      if (!topEyeLid.current || !bottomEyeLid.current) return;
      if (shouldCloseEyes) {
        playTop();
        playBottom();
      }
      if (!shouldCloseEyes) {
        reverseTop();
        reverseBottom();
      }
    }, [shouldCloseEyes, topEyeLid.current, bottomEyeLid.current]);

    return (
      <mesh position={props.position} ref={ref}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#e8e8e8" />
        <Pupil />
        <mesh position={[0, 0, 0]} ref={topEyeLid}>
          <sphereGeometry args={[0.39, 32, 32]} />
          <meshBasicMaterial color="#B4B4B8" />
        </mesh>
        <mesh position={[0, 0, 0]} ref={bottomEyeLid}>
          <sphereGeometry args={[0.39, 32, 32]} />
          <meshBasicMaterial color="#C7C8CC" />
        </mesh>
      </mesh>
    );
  }
);

export default Eye;
