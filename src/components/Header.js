import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useState, useEffect } from "react";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import SettingsRoundedIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { userActions, userAuthed } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserApiMutation } from "../features/user/userApiSlice";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

import UsersSearch from "./UsersSearch";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [curWidth, setCurWidth] = useState(window.innerWidth);
  const user = useSelector(userAuthed);
  const [logoutUserApi, { data, error, isLoading, isSuccess: logoutSuccess }] =
    useLogoutUserApiMutation();
  const [menuClicked, setMenuClicked] = useState(false);

  const handleLogout = () => {
    logoutUserApi();
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCurWidth(window.innerWidth);
    });
    if (logoutSuccess) {
      dispatch(userActions.logoutUser());
      navigate("/login", { replace: true });
    }

    return () => {
      window.removeEventListener("resize", () => {
        setCurWidth(window.innerWidth);
      });
    };
  }, [logoutSuccess]);

  return (
    <div className="header">
      {curWidth > 900 && (
        <div className="header-left">
          <img
            src="/images/slyder-s.png"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
      )}
      <div className="header-center">
        <Link to="/">
          <HomeRoundedIcon
            sx={{ fontSize: 32, color: "#a7c750;", cursor: "pointer" }}
          />
        </Link>
        <NotificationsRoundedIcon
          sx={{
            fontSize: 30,
            color: "#a7c750;",
            cursor: "pointer",
          }}
        />

        <ReviewsRoundedIcon
          onClick={() => navigate("/chat")}
          sx={{
            fontSize: 30,
            color: "#a7c750;",
            cursor: "pointer",
          }}
        />
        {
          <CircleRoundedIcon
            className="chat-icon-status-icon"
            sx={{ fontSize: 15, color: "red" }}
          />
        }
        <WhatshotRoundedIcon
          onClick={() => navigate("/trending")}
          sx={{
            fontSize: 30,
            color: "#a7c750;",
            cursor: "pointer",
          }}
        />
      </div>
      {curWidth > 900 && (
        <div className="header-right">
          <div
            onClick={() => setMenuClicked(!menuClicked)}
            className="header-user"
          >
            <div className="header-user-img-wrapper">
              <img src={user?.picture} alt="post" />
            </div>
            <SettingsRoundedIcon
              className="user-settings-icon"
              sx={{
                fontSize: 25,
                color: "#a7c750",
                cursor: "pointer",
                backgroundColor: "#161921",
                borderRadius: "50%",
                padding: "3px",
              }}
            />
            <div
              className={
                menuClicked
                  ? "user-header-menu show-user-header-menu"
                  : "user-header-menu"
              }
            >
              <div
                className="menu-item"
                onClick={() => navigate(`/${user?.username}`)}
              >
                <h3>Profile</h3>
                <AccountCircleRoundedIcon
                  sx={{
                    fontSize: 20,
                    color: "#a7c750",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div className="menu-item">
                <h3>Settings</h3>
                <SettingsRoundedIcon
                  sx={{
                    fontSize: 20,
                    color: "#a7c750",
                    marginRight: "10px",
                  }}
                />
              </div>
              <h1 className="logout-btn-header" onClick={handleLogout}>
                Logout
              </h1>
            </div>
          </div>
        </div>
      )}
      {query && <UsersSearch query={query} setQuery={setQuery} />}
    </div>
  );
};

export default Header;
