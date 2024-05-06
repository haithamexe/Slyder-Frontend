// import "../styles/public.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Blob from "./Blob";

const Public = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 150, y: e.clientY - 150 });
    }, 100);
  };

  return (
    <div className="public" onMouseMove={handleMouseMove}>
      <Blob x={pos.x} y={pos.y} />
      <Outlet />
    </div>
  );
};

export default Public;
