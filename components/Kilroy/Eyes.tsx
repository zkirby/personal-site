import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import useGlobalMousePosition from '../../hooks/useGlobalMousePosition'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import useGlobalMouseDown from '../../hooks/useGlobalMouseDown'
import { useAtom } from 'jotai'
import { soundEnabledAtom } from '../../state/sound.atoms'


function windowToCanvasVector({ x, y }: { x: number, y: number }, camera: THREE.Camera) {
    // Create parallel plain to the canvas, this will allow 
    // for easy intersection calculation
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointOfIntersection = new THREE.Vector3();

    // Convert mouse coords to three.js 3D space
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = - (y / window.innerHeight) * 2 + 1;

    // Cast a ray from the camera to the mouse position
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, pointOfIntersection);

    return pointOfIntersection
}

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

const Eye = forwardRef((props, ref) => {
    const camera = useThree(p => p.camera)

    useEffect(() => {
        if (!props.coords || !ref.current) return
        const pointOfIntersection = windowToCanvasVector(props.coords, camera)
        // Make the eye look at the point of intersection
        ref.current.lookAt(pointOfIntersection)
    }, [ref?.current, props.coords])

    return (
        <mesh position={props.position} ref={ref}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshBasicMaterial color="#e8e8e8" />
            <Pupil />
        </mesh>
    )
})

const LaserBeam = forwardRef((props, ref) => {
    return (
        <mesh ref={ref}>
            <planeGeometry />
            <meshStandardMaterial color="red" />
        </mesh>
    )
})

function Scene() {
    // The beams are handled completely in THREE because doing it in 
    // react was getting really funky with the ref passing and everything.
    // TODO: See if there's a better way to incorporate this into react-three
    // or change everything over to native threejs.
    const [beams, setBeams] = useState([])
    const { camera, scene } = useThree()
    const [soundEnabled] = useAtom(soundEnabledAtom)

    const listener = useMemo(() => new THREE.AudioListener(), []);
    camera.add(listener);

    // create a global audio source
    const laserSound = useMemo(() => new THREE.Audio(listener), [listener]);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = useMemo(() => new THREE.AudioLoader(), []);
    // Sound courtesy of https://pixabay.com/users/pixabay-1/
    useEffect(() => audioLoader.load('./blaster.mp3', (buffer) => {
        laserSound.setBuffer(buffer)
        laserSound.duration = 0.4
        console.log(soundEnabled)
        laserSound.setVolume(soundEnabled ? 0.2 : 0.2)
    }), []);

    useEffect(() => {
        laserSound.setVolume(soundEnabled ? 0.2 : 0)
        console.log('sound enabled', soundEnabled)
    }, [soundEnabled])


    // Eyes
    const leftEyeRef = useRef()
    const rightEyeRef = useRef()

    // We have to use global event handlers rather than 
    // the ones supplied by the canvas or the eyes won't
    // track when we mouse over the text body (which sits
    // on top of the canvas).
    const coords = useGlobalMousePosition()
    useGlobalMouseDown((e) => {
        if (!leftEyeRef.current || !rightEyeRef.current) return

        const destination = windowToCanvasVector({ x: e.clientX, y: e.clientY }, camera)
        const laserGeo = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8);
        const laserMaterial = new THREE.MeshStandardMaterial({ color: "#b91c1b" });

        // Left beam
        const leftBeam = new THREE.Mesh(laserGeo, laserMaterial);
        const leftBeamPosition = new THREE.Vector3()
        leftEyeRef.current.getWorldPosition(leftBeamPosition)
        leftBeam.position.copy(leftBeamPosition)
        leftBeam.lookAt(destination)
        leftBeam.rotateX(Math.PI / 2)

        // Right beam
        const rightBeam = new THREE.Mesh(laserGeo, laserMaterial);
        const rightBeamPosition = new THREE.Vector3()
        rightEyeRef.current.getWorldPosition(rightBeamPosition)
        rightBeam.position.copy(rightBeamPosition)
        rightBeam.lookAt(destination)
        rightBeam.rotateX(Math.PI / 2)

        scene.add(leftBeam)
        scene.add(rightBeam)
        laserSound.stop();
        laserSound.play();

        setBeams(beams => {
            return [...beams, {
                id: `${leftBeam.id}-${rightBeam.id}`,
                destination,
                beams: [leftBeam, rightBeam]
            }]
        })
    })

    // Load the kilroy background.
    const kilroy = useLoader(TextureLoader, './kt.png')


    useFrame((_, d) => {
        // Advance the laser beams towards their destinations.
        beams.forEach(b => {

            // Move the beams towards their destinations
            b.beams.forEach(beam => {
                const direction = new THREE.Vector3()
                direction.subVectors(b.destination, beam.position)
                direction.normalize()
                beam.position.addScaledVector(direction, d * 20)
            })

            // Remove the beams once they reach their destination
            const [leftBeam, rightBeam] = b.beams
            const leftBeamDistance = leftBeam.position.distanceTo(b.destination)
            const rightBeamDistance = rightBeam.position.distanceTo(b.destination)

            if (leftBeamDistance < 0.2 || rightBeamDistance < 0.2) {
                scene.remove(leftBeam)
                scene.remove(rightBeam)

                setBeams(beams => {
                    return beams.filter(laser => laser.id !== b.id)
                })

                // Add a black square to the scene where the beams hit
                const squareGeo = new THREE.PlaneGeometry(0.5, 0.5)
                const squareMat = new THREE.MeshBasicMaterial({ color: "black" })
                const square = new THREE.Mesh(squareGeo, squareMat)
                square.position.copy(b.destination)
                scene.add(square)

            }
        })
    })

    return (
        <>
            <ambientLight intensity={Math.PI} />

            {/* Eyes */}
            <mesh position={[0, 5.5, 0]} >
                <planeGeometry args={[7.92, 3.48]} />
                <meshStandardMaterial map={kilroy} transparent={true} />
                <Eye coords={coords} position={[-0.75, 0.75, 0]} ref={leftEyeRef} />
                <Eye coords={coords} position={[0.15, 0.75, 0]} ref={rightEyeRef} />
            </mesh>
        </>
    )
}


/**
 * 
 * TODO: Add eye close animation over the bounding boxes of the non-black text.
 * TODO: Finish adding sound toggle (will need global state)
 * TODO: General code clean up and launch
 * 
 * IDEA: Change the black cutouts to not just be squares
 * IDEA: Add explosion animation when the lasers hit their target
 */
export default function Kilroy() {
    return (
        <Canvas flat className='three-scene' camera={{ position: [0, 0, 10] }}>
            <Scene />
        </Canvas >
    )
}
