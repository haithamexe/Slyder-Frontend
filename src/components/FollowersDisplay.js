import React from "react";
import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setOnlineUsers,
  selectOnlineUsers,
} from "../features/message/messageSlice";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useSocketContext } from "../context/SocketContext";

const FollowersDisplay = ({ person }) => {
  // const onlineUsers = useSelector(selectOnlineUsers);
  const dispatch = useDispatch();
  const { onlineUsers } = useSocketContext();
  const [online, setOnline] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  // const { data: personData, isSuccess } = useGetUserWithIdApiQuery({
  //   userId: person,
  // });

  // useEffect(() => {
  //   if (personData) {
  //     setUser(personData);
  //   }
  // }, [personData]);

  return (
    <div
      className="active-person"
      onClick={() => navigate("/" + person?.username)}
    >
      <div className="active-person-header">
        <img src={person?.picture} alt="person" />
        <h1>{person?.firstName + " " + person?.surName}</h1>
      </div>
      {onlineUsers.includes(person?._id) ? (
        <div className="active-person-status">
          <CircleRoundedIcon sx={{ fontSize: 10, color: "303030" }} />
          <p>Online</p>
        </div>
      ) : (
        <div className="active-person-status">
          <CircleRoundedIcon sx={{ fontSize: 10, color: "grey" }} />
          <p>Offline</p>
        </div>
      )}
    </div>
  );
};

export default FollowersDisplay;
