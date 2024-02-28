import * as THREE from "three";

/**
 * Get the 3D vector of the mouse position in the canvas
 */
export function windowCordsToCanvasVector3(
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

/**
 * Returns a z value independent vector translated from the mouse position to the world position
 *
 * @source https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
 */
export function windowCordsToCanvasVector2(
  { x, y }: { x: number; y: number },
  camera: THREE.Camera
) {
  const vec = new THREE.Vector3();
  const pos = new THREE.Vector3();

  vec.set(
    (0 / window.innerWidth) * 2 - 1,
    -(110 / window.innerHeight) * 2 + 1,
    0.5
  );

  vec.unproject(camera);

  vec.sub(camera.position).normalize();

  const distance = -camera.position.z / vec.z;

  pos.copy(camera.position).add(vec.multiplyScalar(distance));
  return pos;
}
