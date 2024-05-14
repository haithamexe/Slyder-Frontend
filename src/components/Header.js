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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userAuthed);
  const [logoutUserApi, { data, error, isLoading, isSuccess: logoutSuccess }] =
    useLogoutUserApiMutation();
  const [menuClicked, setMenuClicked] = useState(false);

  const handleLogout = () => {
    logoutUserApi();
  };

  useEffect(() => {
    if (logoutSuccess) {
      dispatch(userActions.logoutUser());
      navigate("/login", { replace: true });
    }
  }, [logoutSuccess]);

  return (
    <div className="header">
      <div className="header-left">
        <img
          src="/images/slyder-logo-star.png"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <input type="text" placeholder="Search" />
      </div>
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
        <WhatshotRoundedIcon
          onClick={() => navigate("/trending")}
          sx={{
            fontSize: 30,
            color: "#a7c750;",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="header-right">
        <div
          onClick={() => setMenuClicked(!menuClicked)}
          className="header-user"
        >
          <img src="/images/demo/3.png" alt="post" />
          <SettingsRoundedIcon
            className="user-settings-icon"
            sx={{
              fontSize: 25,
              color: "#dfdfdf",
              cursor: "pointer",
              backgroundColor: "#292929",
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
            <div className="menu-item">
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
    </div>
  );
};

export default Header;
