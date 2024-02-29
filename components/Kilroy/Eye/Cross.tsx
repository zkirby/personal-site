import { forwardRef, useMemo } from "react";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";

import { EYE_CROSS_BOX_DIMENSIONS, EYE_CROSS_COLOR } from "./eye.constants";

/**
 * The Cross version of the eyes.
 */
const Cross = forwardRef((_, ref) => {
  const crossGeo = useMemo(() => {
    const { width, height, depth } = EYE_CROSS_BOX_DIMENSIONS;
    const geometry1 = new THREE.BoxGeometry(width, height, depth);
    const geometry2 = new THREE.BoxGeometry(width, height, depth);

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

  return (
    <mesh
      position={[0, 0, 0.2]}
      // @ts-expect-error
      geometry={crossGeo}
      ref={ref}
      scale={[0, 0, 0]}
    >
      <meshToonMaterial color={EYE_CROSS_COLOR} />
    </mesh>
  );
});

export default Cross;
