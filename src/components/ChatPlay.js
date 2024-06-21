import { useState } from "react";
import CanvasChat from "../components/CanvasChat";

const ChatPlay = () => {
  const [numberOfParticlesChanged, setNumberOfParticles] = useState(200);
  const [colorsChangedPri, setColorsChangedPri] = useState("#5976ff");
  const [colorChangedSec, setColorChangedSec] = useState("#a7c750");
  const [radiusChanged, setRadiusChanged] = useState(25);

  const priColors = [
    "#FF6F61", // Red
    "#6B5B95", // Purple
    "#88B04B", // Green
    "#F7CAC9", // Pink
    "#92A8D1", // Blue
    "#F7786B", // Coral
    "#FFD700", // Gold
    "#FF7F50", // Salmon
    "#40E0D0", // Turquoise
    "#FFC0CB", // Light Pink
  ];

  const secColors = [
    "#6F61FF", // Complementary to Red
    "#5B956B", // Complementary to Purple
    "#B04B88", // Complementary to Green
    "#CAC9F7", // Complementary to Pink
    "#A8D192", // Complementary to Blue
    "#786BF7", // Complementary to Coral
    "#D700FF", // Complementary to Gold
    "#7F50FF", // Complementary to Salmon
    "#E0D040", // Complementary to Turquoise
    "#C0CBFF", // Complementary to Light Pink
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
