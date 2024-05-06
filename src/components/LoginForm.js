import LoginRegisterButtons from "./LoginRegisterButtons";
import LoginFormBoxes from "./LoginFormBoxes";
const LoginForm = (props) => {
  const { register, error, handleSubmit, onSubmit, ...rest } = props;
  return (
    <div className="login-form">
      <div className="logo-login">
        <img src="../images/slyder-logo-star.png" alt="logo" />
      </div>
      <LoginRegisterButtons />
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginFormBoxes register={register} />
        <button type="submit" className="login-button-1">
          Login
        </button>
        <div className="login-hero">
          <img src="/images/slyder-text.png" alt="logo" />
          <div>
            <p>Custmize your expierence </p>
            <p>Connect with others</p>
            <p>Share and react</p>
          </div>
          <p className="cheeky">Cool people register for free 😝</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
