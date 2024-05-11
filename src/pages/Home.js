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
  const [isSmaller, setIsSmaller] = useState(false);
  const [isEvenSmaller, setIsEvenSmaller] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // const handleResizeMax = () => {
  //   const maxWindow = 1100;
  //   if (window.outerWidth < maxWindow) {
  //     window.resizeTo(maxWindow, window.outerHeight);
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log(width);
      const maxWindow = 1200;
      if (window.innerWidth < maxWindow) {
        window.resizeTo(maxWindow, window.innerWidth);
      }
      if (window.innerWidth <= 1000) {
        setIsEvenSmaller(true);
      } else if (window.innerWidth > 1000 && isEvenSmaller) {
        setIsEvenSmaller(false);
        refreshPage();
      } else {
        if (window.innerWidth <= 1500) {
          setIsSmaller(true);
        } else {
          setIsSmaller(false);
          refreshPage();
        }
      }
      // setWidth(window.innerWidth);
    };

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
        {!isSmaller ? (
          <>
            <Panel className="left" defaultSize={20} minSize={17}>
              <UserCol />
            </Panel>
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0c0c0d",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
                }}
              />
            </div>
            <PanelResizeHandle />
          </>
        ) : (
          <>
            <Panel defaultSize={0} minSize={0} maxSize={0}></Panel>
            <PanelResizeHandle />
          </>
        )}

        {isSmaller ? (
          <>
            <Panel
              className="center"
              defaultSize={60}
              minSize={70}
              maxSize={80}
            >
              <HomeFeed />
            </Panel>
            <PanelResizeHandle />
          </>
        ) : (
          <>
            <Panel
              className="center"
              defaultSize={35}
              minSize={35}
              maxSize={50}
            >
              <HomeFeed />
            </Panel>
            <PanelResizeHandle />
          </>
        )}
        {/* <Panel className="center" defaultSize={35} minSize={35} maxSize={50}>
          <HomeFeed />
        </Panel> */}
        {!isEvenSmaller ? (
          <>
            <div className="resize-column">
              <MoreVertRoundedIcon
                sx={{
                  fontSize: 27,
                  color: "#0c0c0d",
                  padding: 0,
                  margin: 0,
                  // height: 30,
                  position: "absolute",
                  top: 350,
                  left: -12,
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
        ) : (
          <Panel defaultSize={0} minSize={0} maxSize={0}></Panel>
        )}
      </PanelGroup>
    </>
  );
};

export default Home;
