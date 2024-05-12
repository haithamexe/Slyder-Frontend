import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

import Timer from "./Timer";
import { useState } from "react";

const TrendNotes = () => {
  const [NewNote, setNewNote] = useState("");
  return (
    <div className="trending-notes">
      <div className="trending-timer">
        {/* <h1 className="trending-timer-title">Time Passed</h1>
        <h1 className="trending-timer-time-dash">:</h1>
        <h1 className="trending-timer-time"></h1> */}
        <Timer />
      </div>
      <div className="notes">
        <div className="note-header">
          <h1>Notes</h1>
          <EditNoteRoundedIcon
            sx={{
              fontSize: 30,
              color: "#a7c750",
              marginLeft: "auto",
            }}
          />
          <AddCircleRoundedIcon
            sx={{
              fontSize: 30,
              color: "#a7c750",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="note-container">
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
          <div className="note">
            <h2 className="note-title">Hello</h2>
            <h3 className="note-content">
              jadojdoajd oaidj aoweijdd kajsdh kajhdka ak hak hkajsdh akjshd
              kakjhaskjdh aksjdakak akdha kasjdh
            </h3>
            {/* <DeleteForeverRoundedIcon
              sx={{
                fontSize: 30,
                color: "#ff5959",
                cursor: "pointer",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendNotes;
