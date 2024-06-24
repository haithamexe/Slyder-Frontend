const FormBoxes = (props) => {
  const { errors, register, isTouched, touched, isDirty } = props;

  return (
    <>
      <div className="half">
        <input
          // value={firstName}
          // onChange={(e) => handleChange(e)}
          type="text"
          name="firstName"
          placeholder="First Name"
          className={
            errors.firstName
              ? "register-input half reg-error"
              : "register-input half"
          }
          {...register("firstName")}
        />
        <input
          // value={surName}
          // onChange={(e) => handleChange(e)}
          type="text"
          name="surName"
          placeholder="Sur Name"
          className={
            errors?.surName
              ? "register-input half reg-error"
              : "register-input half"
          }
          {...register("surName")}
        />
      </div>
      <input
        // value={email}
        // onChange={(e) => handleChange(e)}
        type="text"
        name="email"
        placeholder="email"
        className={
          errors?.email ? "register-input reg-error" : "register-input"
        }
        {...register("email")}
      />
      <input
        // value={password}
        // onChange={(e) => handleChange(e)}
        type="password"
        name="password"
        placeholder="password"
        className={
          errors?.password ? "register-input reg-error" : "register-input"
        }
        {...register("password")}
      />
      <input
        // value={passwordConfirm}
        // onChange={(e) => handleChange(e)}
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        className={
          errors?.passwordConfirm
            ? "register-input reg-error"
            : "register-input"
        }
        {...register("passwordConfirm")}
      />
    </>
  );
};

export default FormBoxes;
