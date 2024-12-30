import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const Slyders = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [slyders, setSlyders] = useState({
    sport: 100,
    news: 100,
    entertainment: 100,
    politics: 100,
    technology: 100,
    fashion: 100,
    travel: 100,
    food: 100,
  });

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slyders]);

  const handleSlyderChange = (e) => {
    setSlyders({ ...slyders, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="slyde">
        <img src="/images/slyder-text.png" alt="slyde" />
        <h2 className="ai-text">.Ai</h2>
      </div>
      <div className="slyder-container-main slyder-show">
        <div className="slide-box-container slyder-show">
          {Object.keys(slyders).map((slyder, index) => {
            return (
              <div key={index} className="slide-box slyder-show">
                <h1>{slyder}</h1>
                <input
                  type="range"
                  name={slyder}
                  value={slyders[slyder]}
                  step={10}
                  onChange={handleSlyderChange}
                />
                <span>{slyders[slyder]}</span>
              </div>
            );
          })}
        </div>
        <div className="slyder-info slyder-show">
          <h1>
            sliders empower you to directly influence our recommendation
            algorithm. Each slider corresponds to a specific parameter
            considered by the algorithm. By adjusting them, you can tailor the
            recommendations to your preferences. For instance, decrease or
            increase the "Sport" slider to receive more or less sports-related
            posts.
          </h1>
          <h1>
            <span
              style={{
                color: "#x33000",
                fontSize: "1rem",
                fontWeight: "lighter",
                textAlign: "left",
              }}
            >
              * Expermintal feature - Not Integrated yet
            </span>
          </h1>
          <div className="trending-slyder-btns">
            <button className="algo-save-btn">
              Save
              <SaveRoundedIcon
                sx={{
                  fontSize: 19,
                  color: "#181e29",
                }}
              ></SaveRoundedIcon>
            </button>
            <button className="algo-reset-btn">
              Reset
              <RestartAltRoundedIcon
                sx={{
                  fontSize: 19,
                  color: "#a7c750",
                }}
              ></RestartAltRoundedIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slyders;
