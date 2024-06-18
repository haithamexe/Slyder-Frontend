import React from "react";
import { useEffect, useRef } from "react";

const PicDisplay = ({ picDisplay, setPicDisplay }) => {
  const toggleRef = useRef();

  const handleClick = (e) => {
    console.log(toggleRef.current, e.target);
    if (toggleRef.current && !toggleRef.current.contains(e.target)) {
      setPicDisplay("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="pic-display">
      <div
        className="pic-display-container"
        style={{
          width: toggleRef.current?.width,
          height: toggleRef.current?.height,
        }}
      >
        <img src={picDisplay} alt="pic" ref={toggleRef} />
      </div>
    </div>
  );
};

export default PicDisplay;
