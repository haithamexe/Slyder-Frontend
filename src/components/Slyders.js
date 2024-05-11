import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

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
            We are excited to introduce you to our unique feature - interactive
            sliders! These sliders are a powerful tool that allows you to have
            direct control over the recommendations you receive from our
            algorithm.
          </h1>
          <h1>
            Each slider represents a different parameter that our recommendation
            algorithm considers. By adjusting these sliders, you can influence
            the algorithm's decision-making process. For example, if you prefer
            sport items over other ones, you can adjust the "Sport" slider to
            reflect this preference.
          </h1>
        </div>
      </div>

      {width > 1749 && (
        <div className="slyder-stats">
          <canvas ref={canvasRef} className="slyder-canvas"></canvas>
        </div>
      )}
    </>
  );
};

export default Slyders;
