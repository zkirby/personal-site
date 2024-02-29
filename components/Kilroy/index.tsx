import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  ThreeElements,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";

import Eye from "./Eye/Index";
import useLaserSound from "./Eye/hooks/useLaserSound";
import useGlobalMousePosition from "../../hooks/useGlobalMousePosition";
import useGlobalMouseDown from "../../hooks/useGlobalMouseDown";
import {
  windowCordsToCanvasVector2,
  windowCordsToCanvasVector3,
} from "./windowToCanvas";

/**
 * I've effectively wedged myself between a rock and a hard place. I want the eyes
 * of kilroy to be drawn with a perspective camera, but I want the entire object (with the kilroy image)
 * to appear '2D' and stay in one position and size no matter what the viewport dimensions are.
 *
 * To achieve that, I've built the scene with a specific viewport height in mind (width won't change the kilroy dimensions).
 * I then calculate the scale ratio based on the current viewport height and use that to scale everything.
 *
 * TODO: Figure out a less hacky way to keep the kilroy graphic a consistent size and position.
 */
const VIEW_PORT_RATIO_NOMINATOR = 779;
const KILROY_TOP_IN_PX = 110; // The 'AboutMe' is hard coded to be 140px from the top so keeping kilroy at 110 is about right.

// Laser Constants
const LASER_SPEED = 15;
const IMPACT_SQUARE_SIZE = 0.2; // The black squares that appear when the lasers hit their target.

function moveBeamTowardsDestination(beam, destination, d) {
  const direction = new THREE.Vector3();
  direction.subVectors(destination, beam.position);
  direction.normalize();
  beam.position.addScaledVector(direction, d * LASER_SPEED);
}

function Scene() {
  const { camera, scene, size } = useThree();
  const laserSound = useLaserSound();

  // The beams are handled completely in THREE because doing it in
  // react was getting really funky with the ref passing and everything.
  // TODO: See if there's a better way to incorporate this into react-three
  // or change everything over to native threejs.
  const [lasers, setLasers] = useState([]);

  // Eye Refs
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const kilroyRef = useRef<ThreeElements["mesh"]>();

  const scaleRatio = useMemo(() => {
    return VIEW_PORT_RATIO_NOMINATOR / size.height;
  }, [size.height]);

  useEffect(() => {
    if (!kilroyRef.current) return;
    const pos = windowCordsToCanvasVector2(
      { x: 0, y: KILROY_TOP_IN_PX },
      camera
    );

    kilroyRef.current.scale.set(scaleRatio, scaleRatio, scaleRatio);
    kilroyRef.current.position.y = pos.y;
  }, [size.height, window.innerHeight, kilroyRef.current]);

  // We have to use global event handlers rather than
  // the ones supplied by the canvas or the eyes won't
  // track when we mouse over the text body (which sits
  // on top of the canvas).
  const coords = useGlobalMousePosition();

  const laserGeo = useMemo(
    () => new THREE.CapsuleGeometry(0.075 * scaleRatio, 0.4 * scaleRatio, 4, 8),
    [scaleRatio]
  );
  const laserMaterial = new THREE.MeshStandardMaterial({ color: "#b91c1b" });
  useGlobalMouseDown((e) => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const destination = windowCordsToCanvasVector3(
      { x: e.clientX, y: e.clientY },
      camera
    );

    // Left Beam
    const leftBeam = new THREE.Mesh(laserGeo, laserMaterial);
    const leftBeamPosition = new THREE.Vector3();
    // @ts-expect-error
    leftEyeRef.current.getWorldPosition(leftBeamPosition);
    leftBeam.position.copy(leftBeamPosition);
    leftBeam.lookAt(destination);
    leftBeam.rotateX(Math.PI / 2);

    // HACK: Move the beam forward one unit so it doesn't peak out from behind the eye.
    moveBeamTowardsDestination(leftBeam, destination, 0.01);

    // Right Beam
    const rightBeam = new THREE.Mesh(laserGeo, laserMaterial);
    const rightBeamPosition = new THREE.Vector3();
    // @ts-expect-error
    rightEyeRef.current.getWorldPosition(rightBeamPosition);
    rightBeam.position.copy(rightBeamPosition);
    rightBeam.lookAt(destination);
    rightBeam.rotateX(Math.PI / 2);

    // HACK: Move the beam forward one unit so it doesn't peak out from behind the eye.
    moveBeamTowardsDestination(rightBeam, destination, 0.01);

    scene.add(leftBeam);
    scene.add(rightBeam);

    // Restart the laser sound.
    laserSound.stop();
    laserSound.play();

    setLasers((lasers) => {
      return [
        ...lasers,
        {
          id: `${leftBeam.id}-${rightBeam.id}`,
          destination,
          beams: [leftBeam, rightBeam],
        },
      ];
    });
  });

  // Load the kilroy background.
  const kilroy = useLoader(THREE.TextureLoader, "./kilroy.png");

  useFrame((_, d) => {
    // Advance the laser beams towards their destinations.
    lasers.forEach((laser) => {
      // Move the beams towards their destinations
      laser.beams.forEach((beam) => {
        moveBeamTowardsDestination(beam, laser.destination, d);
      });

      // Remove the beams once they reach their destination
      const [leftBeam, rightBeam] = laser.beams;
      const leftBeamDistanceToDest = leftBeam.position.distanceTo(
        laser.destination
      );
      const rightBeamDistanceToDest = rightBeam.position.distanceTo(
        laser.destination
      );

      if (leftBeamDistanceToDest < 0.25 || rightBeamDistanceToDest < 0.25) {
        scene.remove(leftBeam);
        scene.remove(rightBeam);

        setLasers((lasers) => {
          return lasers.filter((l) => l.id !== laser.id);
        });

        // Add a black square to the scene where the beams hit
        const squareGeo = new THREE.PlaneGeometry(
          IMPACT_SQUARE_SIZE * scaleRatio,
          IMPACT_SQUARE_SIZE * scaleRatio
        );
        const squareMat = new THREE.MeshBasicMaterial({ color: "black" });
        const square = new THREE.Mesh(squareGeo, squareMat);
        square.position.copy(laser.destination);
        scene.add(square);
      }
    });
  });

  return (
    <>
      {/* @ts-expect-error */}
      <ambientLight intensity={Math.PI} />

      <mesh position={[0, 0, 0]} ref={kilroyRef}>
        <planeGeometry args={[3.96, 1.74]} />
        <meshStandardMaterial map={kilroy} transparent={true} />
        <Eye coords={coords} position={[-0.375, 0.375, 0]} ref={leftEyeRef} />
        <Eye coords={coords} position={[0.075, 0.375, 0]} ref={rightEyeRef} />
      </mesh>
    </>
  );
}

/**
 * TODO: General polish and launch
 *
 * IDEA: Change the black cutouts to not just be squares
 * IDEA: Add explosion animation when the lasers hit their target
 */
export default function Kilroy() {
  return (
    <Canvas flat className="three-scene">
      <Scene />
    </Canvas>
  );
}
