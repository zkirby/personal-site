import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import useMousePosition from '../hooks/useMousePosition'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


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
            <meshBasicMaterial color="#e8e8e8" />
            <Pupil />
        </mesh>
    )
}

function Scene() {
    // We have to use a global event handler rather than 
    // the one supplied by the canvas or the eyes won't
    // track when we mouse over the text body (which sits
    // on top of the canvas).
    const coords = useMousePosition()

    const kilroy = useLoader(TextureLoader, './kilroy.png')

    return <>
        <ambientLight intensity={Math.PI} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <mesh position={[0, 5.85, 0]} >
            <planeGeometry args={[6.6, 2.9]} />
            <meshStandardMaterial map={kilroy} transparent={true} />
            <Eye coords={coords} position={[-0.7, 0.7, 0]} />
            <Eye coords={coords} position={[0.2, 0.7, 0]} />
        </mesh>
    </>
}



export default function Kilroy() {
    return (
        <Canvas flat className='three-scene' camera={{ position: [0, 0, 10] }}>
            <Scene />
        </Canvas >
    )
}
