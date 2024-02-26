import * as THREE from "three";

/**
 * Get the 3D vector of the mouse position in the canvas
 */
export default function windowCordsToCanvasVector(
  { x, y }: { x: number; y: number },
  camera: THREE.Camera
) {
  // Create parallel plain to the canvas, this will allow
  // for easy intersection calculation
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const pointOfIntersection = new THREE.Vector3();

  // Convert mouse coords to three.js 3D space
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  // Cast a ray from the camera to the mouse position
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);

  return pointOfIntersection;
}
