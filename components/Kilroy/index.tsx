import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import Eye from "./Eye";
import useLaserSound from "./hooks/useLaserSound";
import { useRef, useState } from "react";
import useGlobalMousePosition from "../../hooks/useGlobalMousePosition";
import useGlobalMouseDown from "../../hooks/useGlobalMouseDown";
import * as THREE from "three";
import windowCordsToCanvasVector from "./windowToCanvasVector";

const LASER_SPEED = 25;

function moveBeamTowardsDestination(beam, destination, d) {
  const direction = new THREE.Vector3();
  direction.subVectors(destination, beam.position);
  direction.normalize();
  beam.position.addScaledVector(direction, d * LASER_SPEED);
}

function Scene() {
  const { camera, scene } = useThree();
  const laserSound = useLaserSound();

  // The beams are handled completely in THREE because doing it in
  // react was getting really funky with the ref passing and everything.
  // TODO: See if there's a better way to incorporate this into react-three
  // or change everything over to native threejs.
  const [lasers, setLasers] = useState([]);

  // Eye Refs
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();

  // We have to use global event handlers rather than
  // the ones supplied by the canvas or the eyes won't
  // track when we mouse over the text body (which sits
  // on top of the canvas).
  const coords = useGlobalMousePosition();

  const laserGeo = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8);
  const laserMaterial = new THREE.MeshStandardMaterial({ color: "#b91c1b" });
  useGlobalMouseDown((e) => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const destination = windowCordsToCanvasVector(
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

      if (leftBeamDistanceToDest < 0.2 || rightBeamDistanceToDest < 0.2) {
        scene.remove(leftBeam);
        scene.remove(rightBeam);

        setLasers((lasers) => {
          return lasers.filter((l) => l.id !== laser.id);
        });

        // Add a black square to the scene where the beams hit
        const squareGeo = new THREE.PlaneGeometry(0.5, 0.5);
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

      <mesh position={[0, 5.5, 0]}>
        <planeGeometry args={[7.92, 3.48]} />
        <meshStandardMaterial map={kilroy} transparent={true} />
        <Eye coords={coords} position={[-0.75, 0.75, 0]} ref={leftEyeRef} />
        <Eye coords={coords} position={[0.15, 0.75, 0]} ref={rightEyeRef} />
      </mesh>
    </>
  );
}

/**
 * TODO: Prevent the canvas from shrinking when the height changes.
 * TODO: Add eye close animation over the bounding boxes of the non-black text.
 * TODO: General polish and launch
 *
 * IDEA: Change the black cutouts to not just be squares
 * IDEA: Add explosion animation when the lasers hit their target
 */
export default function Kilroy() {
  return (
    <Canvas flat className="three-scene" camera={{ position: [0, 0, 10] }}>
      <Scene />
    </Canvas>
  );
}
