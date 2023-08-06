import { useMemo, useRef, useState } from 'react'
import { Mesh, Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import './App.css'

const CustomBox = (
  {
    position = [0, 0, 0],
    color = 'hotpink'
  }:
  {
    position?: [number, number, number] | Vector3,
    color?: string
  }
) => {
  const ref = useRef<Mesh>(null);
  // [number, number, number] => Vector3を変換
  const pos = useMemo(() => {
    if (Array.isArray(position)) {
      return new Vector3(...position)
    }
    return position
  }, [position])
  const [initPos, setInitPos] = useState<Vector3>(pos);

  useFrame((state, _) => {
    if (ref.current){
      const time = state.clock.getElapsedTime();
      ref.current.position.x = Math.sin(time);
    }
  })

  return (
    <mesh
      ref={ref}
      position={initPos}
      onClick={(e) => {
        setInitPos(
          // 現在座標にY方向に1を足して更新
          initPos.clone().add(new Vector3(0, 1, 0))
        )
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <color attach="background" args={['#c2c2c2']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} />
      <CustomBox position={[0, 1, 0]} />
      <CustomBox position={[0, -1, 0]} color="orange" />
      <OrbitControls />
      <GizmoHelper>
        <GizmoViewport 
          labelColor="white" 
        />
      </GizmoHelper>
    </Canvas>
  )
}

export default App
