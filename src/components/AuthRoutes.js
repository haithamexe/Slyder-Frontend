import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  userAuthToken,
  userAuthed,
  userActions,
} from "../features/user/userSlice";

// const REACT_INTERVAL_TIMER = 15 * 60 * 1000;
// const REACT_INTERVAL_TIMER = 15 * 60;

const AuthRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userAuthed);
  const [accessToken, setAccessToken] = useState("");
  const intervalRef = useRef(null);
  // const userToken = useSelector(userAuthToken);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const data = await axios({
          method: "POST",
          url: process.env.REACT_APP_BACKEND_URL + "api/user/refresh",
          withCredentials: true,
        });
        if (data) {
          setAccessToken(data.data?.accessToken);
        }
      } catch (error) {
        if (error && !user) {
          navigate("/login");
        }
      }
    };

    if (!user) {
      refreshToken();
    }

    // intervalRef.current = setInterval(refreshToken, REACT_INTERVAL_TIMER);

    // return () => {
    //   clearInterval(intervalRef.current);
    // };
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      const authUser = async () => {
        try {
          const data = await axios({
            method: "POST",
            url: process.env.REACT_APP_BACKEND_URL + "api/user/auth",
            data: { accessToken: accessToken },
            withCredentials: true,
          });
          dispatch(userActions.setUser(data.data));
          // console.log("User Authed", data);
        } catch (error) {
          navigate("/login");
        }
      };
      authUser();
    }
  }, [accessToken]);

  return <>{user && <Outlet />}</>;
};

export default React.memo(AuthRoutes);
