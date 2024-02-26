

// Saving the orthographic camera for later
/**
 * import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RectAreaLightHelper, RectAreaLightUniformsLib } from 'three-stdlib'

function Ball(props) {

    const ballRef = useRef()
    const camera = useThree(p => p.camera)


    useEffect(() => {
        if (!props.coords) return


        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const pointOfIntersection = new THREE.Vector3();

        mouse.x = (props.coords[0] / window.innerWidth) * 2 - 1;
        mouse.y = - (props.coords[1] / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);

        ballRef.current.lookAt(pointOfIntersection)
    }, [ballRef.current, props.coords])

    // useFrame((_, d) => {
    //     ballRef.current.lookAt({ x: props.coords?.[0] ?? 0, y: props.coords?.[1] ?? 0, z: 0 })
    // })

    return (
        <mesh position={props.position} ref={ballRef}>
            <sphereGeometry args={[8, 32, 32]} />
            <meshToonMaterial />
            <mesh position={[0, 0, 5.5]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshToonMaterial color="black" />
            </mesh>
        </mesh>
    )
}


function Lazer() {

    const lazerRef = useRef()

    // useFrame((_, d) => {
    //     lazerRef.current.position.y -= d
    // })

    return (
        <mesh ref={lazerRef}>
            <capsuleGeometry args={[0.2, 1, 10, 32]} />
            <meshPhysicalMaterial iridescence={1.0} color="red" transparent={true} opacity={0.3} />
        </mesh>
    )
}



export default function Kilroy() {

    const [coords, setCoords] = useState()

    return (
        <Canvas className='three-scene'
            orthographic={true}
            camera={{ position: [0, 0, 10], zoom: 8 }}
            onMouseMove={(a) => {
                console.log(a)
                setCoords([a.clientX, a.clientY, a])
            }}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Ball coords={coords} position={[10, 20, 0]} />
            <Ball coords={coords} position={[-10, 20, 0]} />
        </Canvas >
    )
}
*/
import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useMousePosition from '../hooks/useMousePosition'

function Ball(props) {

    const ballRef = useRef()
    const camera = useThree(p => p.camera)


    useEffect(() => {
        if (!props.coords) return


        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const pointOfIntersection = new THREE.Vector3();

        mouse.x = (props.coords.x / window.innerWidth) * 2 - 1;
        mouse.y = - (props.coords.y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);

        ballRef.current.lookAt(pointOfIntersection)
    }, [ballRef.current, props.coords])

    // useFrame((_, d) => {
    //     ballRef.current.lookAt({ x: props.coords?.[0] ?? 0, y: props.coords?.[1] ?? 0, z: 0 })
    // })

    return (
        <mesh position={props.position} ref={ballRef}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshToonMaterial />
            <mesh position={[0, 0, 0.25]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshToonMaterial color="black" />
                <mesh position={[0.05, 0.05, 0.15]}>
                    <sphereGeometry args={[0.05, 32, 32]} />
                    <meshToonMaterial color="white" />
                </mesh>
            </mesh>
        </mesh>
    )
}




export default function Kilroy() {

    const coords = useMousePosition()

    return (
        <Canvas className='three-scene'
            camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Ball coords={coords} position={[-0.9, 5.7, 0]} />
            <Ball coords={coords} position={[0, 5.7, 0]} />
        </Canvas >
    )
}
