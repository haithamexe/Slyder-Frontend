import "../styles/register.css";

import RegisterForm from "../components/RegisterForm";
import Canvas from "../components/Canvas";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { userActions } from "../features/user/userSlice";
import * as yup from "yup";

import {
  useRegisterUserApiMutation,
  useRefreshTokenApiMutation,
} from "../features/user/userApiSlice";
import { userAuthed } from "../features/user/userSlice";
import { alertTitleClasses } from "@mui/material";

const Register = (props) => {
  const [registerUserApi, { data: regData, error, isLoading, isSuccess }] =
    useRegisterUserApiMutation();

  const user = useSelector(userAuthed);

  const [refreshTokenApi, { data: refreshToken, isSuccess: refreshSuccess }] =
    useRefreshTokenApiMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date();
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    surName: yup.string().required("Surname is required"),
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
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
    year: yup
      .number()
      .min(1900)
      .max(new Date().getFullYear() - 15, "You must be 15 years or older")
      .required("Year is required"),
    month: yup.number().min(1).max(12).required("Month is required"),
    day: yup.number().min(1).max(31).required("Day is required"),
    gender: yup.string().required("gender is required"),
    Prounon: yup.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isTouched, errors, touched, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      surName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      gender: "",
      Prounon: "",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
  });

  const watched = watch(["year", "month", "gender"]);

  const onSubmit = (data) => {
    registerUserApi(data);
  };

  const [regError, setRegError] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user]);

  useEffect(() => {
    if (refreshSuccess) {
      navigate("/", { replace: true });
    }
    refreshTokenApi();
  }, [refreshSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setRegError(false);
      setRegErrorMsg("");
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
        navigate("/login", { replace: true });
      }, 3000);
    } else if (error) {
      setRegError(true);
      setFailAlert(true);
      setRegErrorMsg(error?.data?.message);

      setTimeout(() => {
        setFailAlert(false);
        setRegError(false);
        setRegErrorMsg("");
      }, 3000);
    }
  }, [isSuccess, error]);

  return (
    <div className="loginRegister">
      <div className="register">
        <RegisterForm
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isTouched={isTouched}
          touched={touched}
          watched={watched}
          isDirty={isDirty}
          {...props}
        />
        <Canvas />
      </div>
      <dev
        className={
          successAlert
            ? "alert-success-register show-register-alert"
            : "alert-success-register"
        }
        onClick={() => setSuccessAlert(false)}
      >
        <p>
          Welcome to Slyder! Please verify your email to complete the
          registration .
        </p>
      </dev>
      <dev
        className={
          failAlert
            ? "alert-fail-register show-register-alert-fail"
            : "alert-fail-register"
        }
        onClick={() => setFailAlert(false)}
      >
        <p>{regErrorMsg}</p>
      </dev>
    </div>
  );
};

export default Register;
