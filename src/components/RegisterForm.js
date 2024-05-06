import FormBoxes from "./FormBoxes";
import FormDate from "./FormDate";
import FormGender from "./FormGender";
import LoginRegisterButtons from "./LoginRegisterButtons";

const RegisterForm = (props) => {
  const {
    register,
    errors,
    isTouched,
    handleSubmit,
    onSubmit,
    watched,
    ...rest
  } = props;
  return (
    <div className="register-form">
      <div className="logo-register">
        <img src="../images/slyder-logo-star.png" alt="logo" />
      </div>
      <LoginRegisterButtons />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBoxes
          // userForm={userForm}
          //  handleChange={handleChange}
          errors={errors}
          register={register}
          isTouched={isTouched}
        />
        <FormDate
          // userForm={userForm}
          //  handleChange={handleChange}

          errors={errors}
          register={register}
          isTouched={isTouched}
          watched={watched}
        />
        <FormGender
          // userForm={userForm}
          // handleChange={handleChange}
          errors={errors}
          register={register}
          isTouched={isTouched}
          watched={watched}
        />

        <button type="submit" className="register-button">
          Register
        </button>
        <p>
          By registering you are agreeing to our{" "}
          <a href="/terms">terms and conditions</a> and{" "}
          <a href="/privacy">privacy policy .</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
