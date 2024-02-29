import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { soundEnabledAtom } from "../../../../state/sound.atoms";

/**
 * Mostly split up for readability.
 */
export default function useLaserSound() {
  const camera = useThree((t) => t.camera);
  const [soundEnabled] = useAtom(soundEnabledAtom);

  const listener = useMemo(() => new THREE.AudioListener(), []);
  camera.add(listener);

  // create a audio source
  const laserSound = useMemo(() => new THREE.Audio(listener), [listener]);

  useEffect(() => {
    const audioLoader = new THREE.AudioLoader();
    // Sound courtesy of https://pixabay.com/users/pixabay-1/
    audioLoader.load("./blaster.mp3", (buffer) => {
      laserSound.setBuffer(buffer);
      laserSound.duration = 0.4;
      laserSound.setVolume(0.2);
    });
  }, []);

  // Toggle the sound off if the user has disabled it
  useEffect(() => {
    laserSound.setVolume(soundEnabled ? 0.2 : 0);
  }, [soundEnabled]);

  return laserSound;
}
