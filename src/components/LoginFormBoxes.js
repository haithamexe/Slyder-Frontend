const LoginFormBoxes = (props) => {
  const { register, loginIsError } = props;
  return (
    <div className="form-boxes">
      <div className={loginIsError ? "form-box err-login" : "form-box"}>
        <input
          type="email"
          name="email"
          {...register("email")}
          placeholder="Email"
        />
      </div>
      <div className={loginIsError ? "form-box err-login" : "form-box"}>
        <input
          type="password"
          name="password"
          {...register("password")}
          placeholder="Password"
        />
      </div>
    </div>
  );
};

export default LoginFormBoxes;
