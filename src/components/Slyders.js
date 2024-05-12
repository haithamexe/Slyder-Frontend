import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const Slyders = (props) => {
  const canvasRef = useRef(null);
  let myChart = null;
  const [width, setWidth] = useState(window.innerWidth);
  const [slyders, setSlyders] = useState({
    sport: 30,
    news: 30,
    entertainment: 70,
    politics: 20,
    technology: 50,
    fashion: 40,
    travel: 60,
    food: 50,
  });

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    if (width > 1749) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 60;
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(slyders),
          datasets: [
            {
              label: "Slyders Blocks",
              data: Object.values(slyders),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1.7,
            },
            {
              label: "Slyders Line",
              data: Object.values(slyders),
              type: "line",
              borderColor: "#a7c750",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      myChart?.destroy();
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
            We're thrilled to unveil our new feature: interactive sliders! These
            sliders empower you to directly influence our recommendation
            algorithm. Each slider corresponds to a specific parameter
            considered by the algorithm. By adjusting them, you can tailor the
            recommendations to your preferences. For instance, increase the
            "Sport" slider to receive more sports-related posts.
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

      <div className="slyder-stats">
        <canvas
          ref={canvasRef}
          className={
            width >= 1805 ? "slyder-canvas" : "slyder-canvas slyder-stat-hide"
          }
        ></canvas>
      </div>
    </>
  );
};

export default Slyders;
