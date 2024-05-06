import "../styles/activate.css";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useActivateUserApiMutation,
  useRefreshTokenApiMutation,
  RefreshActivationTokenApi,
  useRefreshActivationTokenApiMutation,
} from "../features/user/userApiSlice";
import { userActions, userAuthed } from "../features/user/userSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Blob from "../components/Blob";

const Activate = (props) => {
  const errorRan = useRef(false);
  const token = useParams().token;
  const [isDone, setIsDone] = useState(false);
  const [isDoneMsg, setIsDoneMsg] = useState("");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [runTimer, setRunTimer] = useState(false);
  let intervalId = null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userAuthed);
  const [activateUserApi, { data, error, isLoading, isSuccess }] =
    useActivateUserApiMutation();

  const [
    refreshTokenApi,
    { data: refreshToken, isSuccess: refreshSuccess, error: refreshError },
  ] = useRefreshTokenApiMutation();

  const [
    refreshActivationTokenApi,
    {
      isSuccess: refreshActivateTokenSuccess,
      error: refreshActivateTokenError,
    },
  ] = useRefreshActivationTokenApiMutation();

  const handleActivation = () => {
    console.log("email", email);
    if (email) {
      refreshActivationTokenApi(email);
    }
  };

  useEffect(() => {
    if (runTimer) {
      const targetTime = new Date().getTime() + timer * 1000;

      const updateCountdown = () => {
        const currentTime = new Date().getTime();
        const timeLeft = targetTime - currentTime;
        setTimer(Math.ceil(timeLeft / 1000));

        if (timeLeft <= 0) {
          setRunTimer(false);
          navigate("/login", { replace: true });
        }
      };
      intervalId = setInterval(updateCountdown, 1000);
    }

    if (!token) {
      navigate("/login", { replace: true });
    }

    if (user) {
      navigate("/");
    }

    if (!refreshError) {
      refreshTokenApi(token);
    }

    if (refreshSuccess) {
      dispatch(userActions.refreshToken(refreshToken));
      navigate("/", { replace: true });
    }

    if (token && !error) {
      activateUserApi(token);
    }

    if (isSuccess) {
      setIsDone(true);
      dispatch(userActions.activateUser(data));
      navigate("/", { replace: true });
    }

    if (refreshActivateTokenSuccess) {
      setIsDone(true);
      setRunTimer(true);
    }

    // setRunTimer(true);
    return () => {
      clearInterval(intervalId);
    };
  }, [
    user,
    token,
    runTimer,
    timer,
    isSuccess,
    refreshSuccess,
    refreshError,
    refreshActivateTokenSuccess,
  ]);

  const handleMouseMove = (e) => {
    setTimeout(() => {
      setPos({ x: e.clientX - 150, y: e.clientY - 150 });
    }, 100);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Blob x={pos.x} y={pos.y} />
      <div className="activate">
        <div className="activate-container">
          <CheckCircleOutlineIcon sx={{ fontSize: 140, color: "#a7c750;" }} />
          <h1>Email Activation</h1>
          {!isDone ? (
            <>
              <h2>
                Something went wrong, please retry activating your account
              </h2>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email address"
              />

              <button
                type="button"
                className="btn404"
                style={{
                  zIndex: 3,
                }}
                onClick={handleActivation}
              >
                Send Activation Email
              </button>
            </>
          ) : (
            <>
              <h1 className="desc-activate">
                Activation email sent, Check your email please
              </h1>
            </>
          )}
          {runTimer && (
            <p>
              this page will redirect to login page in <span>{timer}</span>{" "}
              seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activate;
