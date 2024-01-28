// App.js
import React, { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import G from "./G";
import A from "./A";
import P from "./P";
import '../../styles/ThreeD.css'
import { CardG, CardA, CardP } from "./Card";
import { Suspense } from "react";

const ThreeD = () => {
  const [gIsHovered, setGIsHovered] = useState(false);
  const [aIsHovered, setAIsHovered] = useState(false);
  const [pIsHovered, setPIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleGHover = (hovered) => {
    setGIsHovered(hovered);
  };

  const handleAHover = (hovered) => {
    setAIsHovered(hovered);
  };

  const handlePHover = (hovered) => {
    setPIsHovered(hovered);
  };

  return (
    <div className="ThreeD" onMouseMove={handleMouseMove}>
      <div className="trois-d">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={false} />
            <G
              className={`g-letter ${gIsHovered ? "hovered" : "normal"}`}
              onPointerOver={() => handleGHover(true)}
              onPointerOut={() => handleGHover(false)}
            />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>

        <Canvas className="canva-2">
          <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={false} />
            <A
              className={`a-letter ${aIsHovered ? "hovered" : "normal"}`}
              onPointerOver={() => handleAHover(true)}
              onPointerOut={() => handleAHover(false)}
            />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>

        <Canvas className="canva-3">
          <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={false} />
            <P
              className={`p-letter ${pIsHovered ? "hovered" : "normal"}`}
              onPointerOver={() => handlePHover(true)}
              onPointerOut={() => handlePHover(false)}
            />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>

      <div className="cards-container">
        {gIsHovered && (
          <CardG
            cardPosition={mousePosition}
            onClose={() => setGIsHovered(false)}
          />
        )}
        {aIsHovered && (
          <CardA
            cardPosition={mousePosition}
            onClose={() => setAIsHovered(false)}
          />
        )}
        {pIsHovered && (
          <CardP
            cardPosition={mousePosition}
            onClose={() => setPIsHovered(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeD;
