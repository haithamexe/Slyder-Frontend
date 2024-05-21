import React from "react";
import Blob from "../components/Blob";
import { useState, useEffect } from "react";
import TrendingList from "../components/TrendingList";
import TrendNotes from "../components/TrendNotes";
import TrendChat from "../components/TrendChat";
import "../styles/trending.css";

const Trending = () => {
  const [elementShow, setElementShow] = useState("notes");
  const [width, setWidth] = useState(window.innerWidth);
  const [pos, setPos] = useState({ x: 650, y: 200 });
  const [currentTime, setCurrentTime] = useState(0);

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 275, y: e.clientY - 275 });
    }, 180);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setCurrentTime(new Date());
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div onMouseMove={handleMouseMove} className="trending">
      {/* <Blob x={pos.x} y={pos.y} /> */}
      <TrendingList />

      <div className="trend-windows">
        {/* {width > 950 ? (
          <TrendNotes
            currentTime={currentTime}
            setElementShow={setElementShow}
          />
        ) : null} */}
        {width > 580 ? <TrendChat /> : null}
      </div>
    </div>
  );
};

export default Trending;
