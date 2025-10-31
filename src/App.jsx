import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
  Html,
  Edges,
} from "@react-three/drei";
import Sanjeev from "./assets/rs.png"
import ProjectCarouselTailwind from "./ProjectCarouselTailwind";
import agrisensor from "./assets/agrisense.jpeg"
import rover from"./assets/mrover.png"
import kicad from"./assets/kicad.png"
import rob from "./assets/rob.jpeg"
import mrob from './assets/mrob.png'


const slides = [
  {
    image: { src: rover, alt: "5V LDO PCB layout" },
    title: "MRover — Embedded Hardware",
    subtitle: "5V LDO in Altium, modular power panel",
    content:
      "Designed a 5V LDO PCB in Altium which can be modularly connected to a larger power distribution board; completed Altium onboarding and earned U‑M machine shop certification.",
    tags: ["Altium", "Power", "PCB", "GitHub"],
  },
  {
    image: { src: kicad, alt: "Custom Arduino UNO schematic" },
    title: "Custom Arduino Board Schematic",
    subtitle: "USB‑C serial, AVR128 upgrade",
    content:
      "Created an Arduino UNO‑style schematic from scratch, explored USB‑C serial input, upgraded to an AVR128, and began placement and routing.",
    tags: ["Schematic", "USB‑C", "AVR128", "PCB"],
  },
  {
    image: { src: agrisensor, alt: "ESP32 agricultural sensor PCB" },
    title: "Low‑Cost Agricultural Sensor",
    subtitle: "ESP32 + conductance sensing + AI",
    content:
      "Built an ESP32‑based sensor PCB and an Arduino conductance probe that streamed data into an AI crop‑recommendation pipeline; also developed an education website for the project.",
    tags: ["ESP32", "Sensors", "AI", "Web"],
  },
  {
    image: { src: rob, alt: "FRC electrical harness and CAN wiring" },
    title: "Electrical Team Captain — FRC 4384",
    subtitle: "Harness design, CAN topology, training",
    content:
      "Led full‑scale robot electrical harness design (power and CAN), taught electrical safety and fabrication, and trained 60+ students in soldering, crimping, and PCB skills while building weekly.",
    tags: ["FRC", "CAN", "Harness", "Leadership"],
  },
  {
    image: { src: mrob, alt: "Mentoring students in robotics" },
    title: "Robotics Mentoring",
    subtitle: "Platinum Panthers & Silver Hornets",
    content:
      "Mentored 20 students in mechanical design and fabrication, volunteering 4–8 hours per week and coaching brainstorming and critical thinking.",
    tags: ["Mentoring", "Education", "Mechanical"],
  },
];

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
      <Edges linewidth={4} scale={1.1} threshold={15} color="white" />
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
        <Cube position={[0,0,0]} size={[1,1,1]} color="blue" />
        <Sphere position={[0,0,0]} args={[1]} />
        <OrbitControls enableZoom={false} enablePan={false}/>
      </Canvas>
      <h1 className=" absolute z-20 text-xl sm:text-3xl bottom-1/6  sm:bg-transparent bg-white m-5  bg-opacity-75 p-3 sm:p-0.5 rounded-3xl font-light">Electrical Engineering undergrad at the University of Michigan</h1>
      
    </div>
  <div className="pl-5 pb-10 space-x-10 place-items-center">
          <div className="w-full h-full place-items-center pb-56"><h1 className="text-6xl p-5 place-content-start" id="about">
          About
          </h1>
          <img src={Sanjeev} className="rounded-xl drop-shadow-2xl"/>
          <p className="text-l p-10 m-5 sm:text-3xl sm:p-5 sm:px-64">
            I am an EE undergrad at the University of Michigan. I am currently interested in locally-deployed AI (Edge AI) and FPGA design to create ultra-low latency AI servers.
            I am experimenting with PCB design (Altium and kicad), ML Libraries (Pytorch), and . Currently, I am on the haptics and sensors team in Michigan Neuroprosthetics, where I am researching sensor inputs for long-term prosthetic users.
            I am also on the Embedded Hardware for the Michigan Mars Rover team, where I designed a 5V LDO circuit and learned to use Altium. 
            Beyond hardware, I am currently learning C++ and Rust, and working on projects with PyTorch and other ML platforms. 
          </p>
          </div>
          <div className="w-full h-full place-items-center pb-56">
            <h1 className="text-6xl" id="about">
            Projects
          </h1>
                <ProjectCarouselTailwind slides={slides} ariaLabel="Personal project highlights" />
          </div>
          <div className="w-full h-full place-items-center pb-56">
          <h1 className="text-6xl" id="about">
            Contact
          </h1> 
          <h1 className="text-3xl">I'm always looking to work on interesting projects with people. Please don't hesistate to reach out!</h1>
          <p className="p-3 text-2xl">email: <a className="text-blue-600" href="mailto:sanjeevkumarvijayakumar@gmail.com">sanjeevkumarvijayakumar [at] gmail [dot] com</a></p>
          <p className="p-3 text-2xl"><a className="text-blue-600" href="https://www.linkedin.com/in/sanjeevkumarvijayakumar/">linkedin</a></p>
          <p className="p-3 text-2xl"><a className="text-blue-600" href="https://github.com/jeevsanp1">github</a></p> 
          </div>
          
        </div>

  </>
  )
}

export default App
