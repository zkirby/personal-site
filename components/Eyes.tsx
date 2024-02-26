import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useMousePosition from '../hooks/useMousePosition'

function Pupil() {
    return (
        <mesh position={[0, 0, 0.25]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshToonMaterial color="black" />
            <mesh position={[0.05, 0.05, 0.15]}>
                <sphereGeometry args={[0.05, 32, 32]} />
                <meshToonMaterial color="white" />
            </mesh>
        </mesh>
    )
}

function Eye(props) {
    const eyeRef = useRef()
    const camera = useThree(p => p.camera)

    useEffect(() => {
        if (!props.coords) return

        // Create parallel plain to the canvas, this will allow 
        // for easy intersection calculation
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const pointOfIntersection = new THREE.Vector3();

        // Convert mouse coords to three.js 3D space
        mouse.x = (props.coords.x / window.innerWidth) * 2 - 1;
        mouse.y = - (props.coords.y / window.innerHeight) * 2 + 1;

        // Cast a ray from the camera to the mouse position
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);

        // Make the eye look at the point of intersection
        eyeRef.current.lookAt(pointOfIntersection)
    }, [eyeRef.current, props.coords])

    return (
        <mesh position={props.position} ref={eyeRef}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshToonMaterial />
            <Pupil />
        </mesh>
    )
}




export default function Eyes() {
    // We have to use a global event handler rather than 
    // the one supplied by the canvas or the eyes won't
    // track when we mouse over the text body (which sits
    // on top of the canvas).
    const coords = useMousePosition()

    return (
        <Canvas className='three-scene' camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Eye coords={coords} position={[-0.9, 6.3, 0]} />
            <Eye coords={coords} position={[0.2, 6.3, 0]} />
        </Canvas >
    )
}
