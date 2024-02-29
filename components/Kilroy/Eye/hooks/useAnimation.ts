import * as THREE from "three";

import React, { useCallback, useMemo } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

/**
 * Convenience hook for playing and reversing animations.
 */
export default function useAnimation(
  ref: React.RefObject<ThreeElements["mesh"]>,
  keyframes: THREE.VectorKeyframeTrack[]
) {
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
