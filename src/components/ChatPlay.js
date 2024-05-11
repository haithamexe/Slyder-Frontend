import { useState } from "react";
import CanvasChat from "../components/CanvasChat";

const ChatPlay = () => {
  const [numberOfParticlesChanged, setNumberOfParticles] = useState(200);
  const [colorsChangedPri, setColorsChangedPri] = useState("#5976ff");
  const [colorChangedSec, setColorChangedSec] = useState("#a7c750");
  const [radiusChanged, setRadiusChanged] = useState(25);

  const priColors = [
    "#5976ff",
    "#ff5959",
    "#59ff59",
    "#ff59ff",
    "#59ffff",
    "#ff5959",
    "#59ff59",
    "#ff59ff",
    "#59ffff",
    "#ff5959",
  ];

  const secColors = [
    "#5976ff",
    "#ff5959",
    "#59ff59",
    "#ff59ff",
    "#59ffff",
    "#ff5959",
    "#59ff59",
    "#ff59ff",
    "#59ffff",
    "#ff5959",
  ];

  return (
    <div className="chat-play">
      <CanvasChat
        numberOfParticlesChanged={numberOfParticlesChanged}
        colorsChangedPri={colorsChangedPri}
        colorChangedSec={colorChangedSec}
        radiusChanged={radiusChanged}
      />
      <div className="chat-play-container">
        <div className="chat-play-box">
          <div className="chat-play-buttons">
            <h1> Number of Particles </h1>
            <input
              type="range"
              value={numberOfParticlesChanged}
              min={1}
              max={310}
              step={1}
              onChange={(e) => setNumberOfParticles(e.target.value)}
            />
            <span>{numberOfParticlesChanged}</span>
          </div>
          <div className="chat-play-buttons">
            <h1> Primary Colors </h1>
            <input
              type="range"
              value={priColors[colorsChangedPri]}
              min={0}
              max={9}
              step={1}
              onChange={(e) => setColorsChangedPri(priColors[e.target.value])}
            />
            <span>{colorsChangedPri}</span>
          </div>
          <div className="chat-play-buttons">
            <h1> Secondary Colors </h1>
            <input
              type="range"
              value={secColors[colorChangedSec]}
              min={0}
              max={9}
              step={1}
              onChange={(e) => setColorChangedSec(secColors[e.target.value])}
            />
            <span>{colorChangedSec}</span>
          </div>
          <div className="chat-play-buttons">
            <h1> Radius </h1>
            <input
              type="range"
              value={radiusChanged}
              min={15}
              max={50}
              step={1}
              onChange={(e) => setRadiusChanged(e.target.value)}
            />
            <span>{radiusChanged}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPlay;
