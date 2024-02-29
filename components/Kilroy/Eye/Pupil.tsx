import { forwardRef } from "react";

import { PUPIL_DETAIL_RADIUS, PUPIL_RADIUS } from "./eye.constants";

const Pupil = forwardRef((_, ref) => {
  return (
    <mesh position={[0, 0, 0.125]} ref={ref} scale={[1, 1, 1]}>
      <sphereGeometry args={[PUPIL_RADIUS, 32, 32]} />
      <meshToonMaterial color="black" />
      <mesh position={[0.025, 0.025, 0.075]}>
        <sphereGeometry args={[PUPIL_DETAIL_RADIUS, 32, 32]} />
        <meshToonMaterial />
      </mesh>
    </mesh>
  );
});

export default Pupil;
