import "../index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Blob from "../components/Blob";

const NotFound404 = () => {
  const navigate = useNavigate();

  const [pos, setPos] = useState({ x: 650, y: 200 });

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 275, y: e.clientY - 275 });
    }, 100);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Blob x={pos.x} y={pos.y} />
      <div className="notFound404">
        <h1>404</h1>
        <h2>Opps you are out of the simulation</h2>
        <button
          type="button"
          className="btn404"
          style={{
            zIndex: 3,
          }}
          onClick={() => navigate("/login")}
        >
          Go back to the matrix
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
