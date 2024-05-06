const FormBoxes = (props) => {
  const { errors, register, isTouched } = props;
  return (
    <>
      <div className="half">
        <input
          // value={firstName}
          // onChange={(e) => handleChange(e)}
          type="text"
          name="firstName"
          placeholder="First Name"
          className="register-input half"
          {...register("firstName")}
        />
        <input
          // value={surName}
          // onChange={(e) => handleChange(e)}
          type="text"
          name="surName"
          placeholder="Sur Name"
          className="register-input half"
          {...register("surName")}
        />
      </div>
      <input
        // value={email}
        // onChange={(e) => handleChange(e)}
        type="text"
        name="email"
        placeholder="email"
        className="register-input "
        {...register("email")}
      />
      <input
        // value={password}
        // onChange={(e) => handleChange(e)}
        type="password"
        name="password"
        placeholder="password"
        className="register-input"
        {...register("password")}
      />
      <input
        // value={passwordConfirm}
        // onChange={(e) => handleChange(e)}
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        className="register-input"
        {...register("passwordConfirm")}
      />
    </>
  );
};

export default FormBoxes;
