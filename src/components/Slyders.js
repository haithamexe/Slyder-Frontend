import { useState } from "react";

const Slyders = (props) => {
  const { slyderClick, setSlyderClick } = props;
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

  const handleSlyderChange = (e) => {
    setSlyders({ ...slyders, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* {Object.keys(slyders).map((slyder, index) => {
        return (
          <div
            key={index}
            className={slyderClick ? "slide-box slyder-show" : "slide-box"}
          >
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
      })} */}

      <div
        className="slyde"
        onClick={() => {
          setSlyderClick(!slyderClick);
        }}
      >
        <img src="/images/slyder-text.png" alt="slyde" />
        <h2 className="ai-text">.Ai</h2>
      </div>
      <div
        className={
          slyderClick
            ? "slyder-container-main slyder-show"
            : "slyder-container-main"
        }
      >
        <div
          className={
            slyderClick
              ? "slide-box-container slyder-show"
              : "slide-box-container"
          }
        >
          {Object.keys(slyders).map((slyder, index) => {
            return (
              <div
                key={index}
                className={slyderClick ? "slide-box slyder-show" : "slide-box"}
              >
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
        <div
          className={slyderClick ? "slyder-info slyder-show" : "slyder-info"}
        >
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
    </>
  );
};

export default Slyders;
