import React from "react";
import Blob from "../components/Blob";
import { useState } from "react";

const Trending = () => {
  const [pos, setPos] = useState({ x: 650, y: 200 });

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 275, y: e.clientY - 275 });
    }, 150);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Blob x={pos.x} y={pos.y} />
    </div>
  );
};

export default Trending;
