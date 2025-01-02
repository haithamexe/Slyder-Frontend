import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/reset.css";
import { useSelector } from "react-redux";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    try {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (
        password !== confirmPassword ||
        !password.match(passwordRegex) ||
        !confirmPassword.match(passwordRegex)
      ) {
        setError(
          "* Passwords do not match or do not meet requirements (minimum 8 characters, at least one letter and one number)"
        );
        return;
      }

      const data = await axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "api/user/resetPassword",
        data: {
          token,
          password,
        },
        withCredentials: true,
      });

      if (data.status === 200) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }, [error]);

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1>Reset Password</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={resetPassword}>Reset Password</button>

        {error && <p className="error">{error}</p>}

        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default ResetPassword;
