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

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (refSuccess && refreshToken) {
      dispatch(userActions.refreshToken(refreshToken));
      navigate("/");
    }

    if (loginSuccess) {
      dispatch(userActions.loginUser(loginData));
      setError(false);
      setErrorMsg("");
      navigate("/");
    } else if (loginError) {
      setError(true);
      setErrorMsg(loginError);
    }

    refreshTokenApi();
  }, [user, loginError, loginSuccess, refSuccess]);

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
    </div>
  );
};

export default Login;
