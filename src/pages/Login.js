import "../styles/login.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";
import Canvas2 from "../components/Canvas2";

import { useDispatch, useSelector } from "react-redux";
import {
  userActions,
  userAuthed,
  userAuthToken,
} from "../features/user/userSlice";
import {
  useLoginUserApiMutation,
  useRefreshTokenApiMutation,
} from "../features/user/userApiSlice";

const Login = (props) => {
  const [
    loginUserApi,
    {
      data: loginData,
      error: loginError,
      isLoading: logingLoading,
      isSuccess: loginSuccess,
      isError: loginIsError,
    },
  ] = useLoginUserApiMutation();
  const [
    refreshTokenApi,
    {
      data: refreshToken,
      isSuccess: refSuccess,
      error: refError,
      isLoading: refLoading,
    },
  ] = useRefreshTokenApiMutation();

  const user = useSelector(userAuthed);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [alert, setAlert] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,4})?$/
      )
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required("Password is required"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    loginUserApi(data);
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user]);

  useEffect(() => {
    if (refSuccess) {
      navigate("/", { replace: true });
    }
    refreshTokenApi();
  }, [refSuccess]);

  useEffect(() => {
    if (loginSuccess) {
      dispatch(userActions.loginUser(loginData));
      setError(false);
      setErrorMsg("");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    } else if (loginError) {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 3000);

      setError(true);
      setErrorMsg(loginError);
    }
  }, [loginError, loginSuccess]);

  return (
    <div className="loginRegister">
      <div className="login">
        <LoginForm
          register={register}
          error={error}
          errorMsg={errorMsg}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loginIsError={loginIsError}
          {...props}
        />
        <Canvas2 />
      </div>
      <div
        className={
          alert ? "alert-fail-login show-login-alert" : "alert-fail-login"
        }
        onClick={() => setAlert(false)}
      >
        <p>Invalid Email or Password</p>
      </div>
    </div>
  );
};

export default Login;
