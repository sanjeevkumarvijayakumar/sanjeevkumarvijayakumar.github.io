import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
  Html,
} from "@react-three/drei";
const Cube = ({position, size, color}) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2  
  })
  return (<mesh ref = { ref } position={position}>
        <boxGeometry args={size}/>
        <meshStandardMaterial color={color}/>
        <Html distanceFactor={8}>
  </Html>
      </mesh>) 
}

const Sphere = ({ position, args, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta, frame) => {
    const speed = isHovered ? 1 : 0.2;
    //ref.current.rotation.y += delta * speed;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 4);
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={1.5}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? "lightblue" : "orange"}
        wireframe
      />
    </mesh>
  );
};

function App() {

  return (
  <>
 <div className="relative w-screen h-screen overflow-hidden grid place-items-center">
      <h1 className=" absolute z-20 text-4xl top-1/2 text-center sm:text-left sm:bg-transparent bg-white m-5  bg-opacity-75 p-0.5 rounded-3xl [word-spacing:50vw] font-light">Sanjeevkumar Vijayakumar</h1>
      <Canvas className="absolute inset-0 z-10 " camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <Cube position={[0,0,0]} size={[1,1,1]} color="green" />
        <Sphere position={[0,0,0]} args={[1]} />
        <OrbitControls enableZoom={false} enablePan={false}/>
      </Canvas>
      <h1 className=" absolute z-20 text-xl sm:text-3xl bottom-1/6  sm:bg-transparent bg-white m-5  bg-opacity-75 p-3 sm:p-0.5 rounded-3xl font-light">Electrical Engineering at the University of Michigan</h1>
      
    </div>
  <div className="pl-5 pb-10 space-x-10">
          <h1 className="text-6xl w-1/4 pt-2" id="about">
            About Me
          </h1>
          <p className="text-xl p-5 px-10 sm:text-3xl sm:p-32 sm:px-64">
            I was born in Vellore, TN, India. I moved to the US (metro Detroit)
            when I was 3, and my fascination with computers started then. 
            I am an EE undergrad at the University of Michigan. <br /> 
            I have developed PCBs and other Electrical systems. Currently, I am on the haptics and sensors team in Michigan Neuroprosthetics, where I am researching sensor inputs for long-term prosthetic users. <br /> 
            I am also on the Embedded Hardware for the Michigan Mars Rover team, where I designed a 5V LDO circuit. <br />
            Beyond hardware, I am currently learning C++ and Rust, and working on projects with PyTorch and other ML platforms. <br />
          </p>
        </div>
  <div className="pl-5 pb-10 space-x-10">
          <h1 className="text-6xl w-1/4 pt-2" id="about">
            Projects
          </h1>
          
        </div>
  </>
  )
}

export default App
