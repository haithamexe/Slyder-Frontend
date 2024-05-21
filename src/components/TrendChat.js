import Slyders from "./Slyders";
import { useState, useEffect } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const TrendChat = () => {
  return (
    <div className="trending-sliders-new">
      {/* <AutoAwesomeRoundedIcon
        className="trend-Ai-icon"
        sx={{
          fontSize: 30,
          color: "#a7c750",
        }}
      /> */}
      <Slyders />
    </div>
  );
};

export default TrendChat;
