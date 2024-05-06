import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import Selections from "./Selections";
import GenderOptions from "./GenderOptions";
import RegisterInfo from "./RegisterInfo";
import { inputsForm } from "./FormArrays";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookies, selectCookies } from "../features/cookies/cookieSlice";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
const Form = () => {
  const navigate = useNavigate();
  const getCookie = useSelector(selectCookies);
  const [addUser, { data, isSuccess, isLoading, isError, error }] =
    useAddUserMutation();
  const [submitTimes, setSubmitTimes] = useState(0);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    email: "",
    emailConfirm: "",
    password: "",
    date: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      age: "",
    },
    gender: "",
    prefered: "",
    pronoun: "",
  });

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z]{2,20}$/, "First name is not valid")
      .required("First name is required"),
    surName: yup

      .string()
      .matches(/^[A-Za-z]{2,20}$/, "Surname is not valid")
      .required("Surname is required"),
    email: yup
      .string()
      .matches(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?(\.[a-z]{2,8})?$/,
        "Email is not valid"
      )
      .required("Email is required"),
    emailConfirm: yup
      .string()
      .oneOf([yup.ref("email")], "Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password is not valid"
      )
      .required("Password is required"),
    year: yup
      .string()
      .matches(/^(190[5-9]|19[1-9][0-9]|200[0-5])$/, "Year is not valid")
      .required("Year is required"),

    age: yup
      .string()
      .matches(/^(1[8-9]|[2-9][0-9]|10[0-8])$/, "Age is not valid")
      .required("Age is required"),
    gender: yup.string().required("must choose a gender"),
    pronoun: yup
      .string()
      .required("please select pronoun")
      .oneOf(["he", "she", "they"], "please select pronoun"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onChange",
    mode: "onBlur",
  });

  const formChange = (e) => {
    validateEmail();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formChangeExtended = (e) => {
    setFormData({
      ...formData,
      date: { ...formData.date, [e.target.name]: e.target.value },
    });
  };
  const formSubmit = () => {
    if (
      !formData.firstName &&
      !formData.surName &&
      !formData.email &&
      !formData.password
    ) {
      setSubmitTimes(submitTimes + 1);
    }
    console.log("inside submission func", formData);
    // console.log(submitTimes + 1);
    if (errors.length !== 0) {
      return;
    }
    if (formData.age) {
      const ageToYear = new Date().getFullYear() - formData.age;
      setFormData({
        ...formData,
        date: { ...formData.date, year: ageToYear },
      });

      if (formData.gender === "male") {
        setFormData({
          ...formData,
          pronoun: "he",
        });
      } else if (formData.gender === "female") {
        setFormData({
          ...formData,
          pronoun: "she",
        });
      } else {
        setFormData({
          ...formData,
          pronoun: "they",
        });
      }

      addUser({
        firstName: formData.firstName,
        surName: formData.surName,
        email: formData.email,
        password: formData.password,
        year: formData.year,
        month: formData.month,
        day: formData.day,
        gender: formData.gender,
        pronoun: formData.pronoun,
        prefered: formData.prefered,
      });

      if (isSuccess) {
        setCookies({
          name: "username",
          value: data.username,
          options: { expires: 0 },
        });
        setTimeout(() => {
          navigate("/verify");
        }, 1000);
      } else if (isError) {
        console.log(error, "couldnt save cookie");
      }
      console.log(data, "data");
      console.log(selectCookies, "cookie");
      if (isSuccess) {
      }
    }

    console.log("submitted");
  };

  const validateEmail = () => {
    if (
      formData.email.match(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?(\.[a-z]{2,8})?$/
      )
    ) {
      setConfirmEmail(true);
    } else {
      setConfirmEmail(false);
    }
  };

  const handleFocus = (e) => {
    if (e === "date") {
      setFocused("date");
    } else {
      setFocused(e.target.name);
    }
  };
  const handleBlur = () => {
    setFocused("");
  };

  // console.log(formData);
  // console.log(errors);

  return (
    <form
      className="register-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitTimes(submitTimes + 1);
        handleSubmit(formSubmit)(e);
      }}
      autoComplete="off"
    >
      <div className="msgs">
        {isSuccess && <p className="msg pass-msg">Account Created</p>}
        {isError && <p className="msg error-msg">{error}</p>}
      </div>
      <div className="form-inputs">
        {inputsForm.map((input, index) => (
          <FormInput
            key={index}
            confirmEmail={confirmEmail}
            value={formData[input.name]}
            error={errors[input.name]?.message}
            {...input}
            focused={focused}
            handleFocus={handleFocus}
            register={{
              ...register(input.name, {
                onChange: (e) => formChange(e),
                onBlur: () => handleBlur(),
              }),
            }}
          />}
        setSubmitTimes={setSubmitTimes}
        focused={focused}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        registerYear={{
          ...register("year", {
            onChange: (e) => formChangeExtended(e),
            onBlur: () => handleBlur(),
          }),
        }}
        registerAge={{
          ...register("age", {
            onChange: (e) => formChangeExtended(e),
            onBlur: () => handleBlur(),
          }),
        }}
        errorYear={errors["year"]?.message}
        errorAge=
        ))}
      </div>
      <Selections
        formData={formData}
        submitTimes={submitTimes{errors["age"]?.message}
        handleChange={formChangeExtended}
      />
      <GenderOptions
        formData={formData}
        registerGender={{
          ...register("gender", {
            onChange: (e) => formChange(e),
            onBlur: () => handleBlur(),
          }),
        }}
        registerPronoun={{
          ...register("pronoun", {
            onChange: (e) => formChange(e),
            onBlur: () => handleBlur(),
          }),
        }}
        errorGender={errors["gender"]?.message}
        errorPronoun={errors["pronoun"]?.message}
        handleChange={formChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        focused={focused}
      />
      <RegisterInfo />
      <div className="register-btn-container">
        <button className="btn register-btn" type="submit">
          Sign Up
        </button>
        {isLoading && (
          <BeatLoader className="loader" color="#1877F2" autoComplete />
        )}
        {isSuccess && <p className="account-created">Account Created</p>}
      </div>
      <div className="register-already click">
        <p>
          <Link to="/login"> Already have an account ? </Link>
        </p>
      </div>
    </form>
  );
};

export default Form;
