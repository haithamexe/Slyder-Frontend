import "../styles/loginRegister.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginRegisterButtons = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/login") {
      setClick("login");
    } else if (path === "/register") {
      setClick("register");
    }
  }, [navigate]);

  return (
    <div className="buttons">
      <button
        className={
          click === "login" ? "login-button btn-clicked" : "register-button-up"
        }
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        className={
          click === "register"
            ? "register-button-up btn-clicked"
            : "register-button-up"
        }
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default LoginRegisterButtons;
