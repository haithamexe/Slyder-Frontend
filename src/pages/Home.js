import "../styles/home.css";
import { useEffect } from "react";

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
  return (
    <>
      <PanelGroup className="home" direction="horizontal">
        <Panel className="left" defaultSize={20} minSize={17}>
          <UserCol />
        </Panel>
        <div className="resize-column"></div>
        <PanelResizeHandle />
        <Panel className="center" defaultSize={35} minSize={35} maxSize={50}>
          <HomeFeed />
        </Panel>
        <PanelResizeHandle />
        <div className="resize-column"></div>
        <Panel className="right" defaultSize={22} minSize={16}>
          <MsgCol
            Panel={Panel}
            PanelGroup={PanelGroup}
            PanelResizeHandle={PanelResizeHandle}
          />
        </Panel>
      </PanelGroup>
    </>
  );
};

export default Home;
