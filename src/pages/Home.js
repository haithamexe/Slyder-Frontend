import "../styles/home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import UserCol from "../components/UserCol";
import HomeFeed from "../components/HomeFeed";
import MsgCol from "../components/MsgCol";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleResize = () => {
    setWidth(window.innerWidth);
    refreshPage();
  };

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <PanelGroup className="home" direction="horizontal">
        {width >= 1400 && (
          <>
            <Panel className="left" defaultSize={20} minSize={17}>
              <UserCol />
            </Panel>
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0d0e10",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
                  zIndex: -2,
                }}
              />
            </div>
            <PanelResizeHandle />
          </>
        )}

        <Panel className="center" defaultSize={35} minSize={35} maxSize={50}>
          <HomeFeed />
        </Panel>

        {width >= 900 && (
          <>
            <PanelResizeHandle />
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0d0e10",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
                  zIndex: -2,
                }}
              />
            </div>
            <Panel className="right" defaultSize={22} minSize={16}>
              <MsgCol
                Panel={Panel}
                PanelGroup={PanelGroup}
                PanelResizeHandle={PanelResizeHandle}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </>
  );
};

export default Home;
