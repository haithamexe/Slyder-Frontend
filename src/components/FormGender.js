const FormGender = (props) => {
  const { register, errors, isTouched, watched } = props;

  return (
    <>
      <label>Gender</label>
      <div className="radio-container">
        <div
          className={
            errors?.gender
              ? "register-error-gender radio-select"
              : "radio-select"
          }
        >
          <h3>Male</h3>
          <input
            type="radio"
            name="gender"
            // onChange={(e) => handleChange(e)}
            value="male"
            {...register("gender")}
          />
        </div>
        <div
          className={
            errors?.gender
              ? "register-error-gender radio-select"
              : "radio-select"
          }
        >
          <h3>Female</h3>
          <input
            type="radio"
            name="gender"
            // onChange={(e) => handleChange(e)}
            value="female"
            {...register("gender")}
          />
        </div>

        <div className={errors?.gender ? "radio-select" : "radio-select"}>
          <h3>Other</h3>
          <input
            type="radio"
            name="gender"
            value="other"
            // onChange={(e) => handleChange(e)}
            {...register("gender")}
          />
        </div>
      </div>
      {watched[2] === "other" && (
        <div className="Prounon">
          <label>Pronoun</label>
          <input
            type="text"
            name="pronoun"
            // value={pronoun}
            // onChange={(e) => handleChange(e)}
            {...register("pronoun")}
            placeholder="Pronoun"
          />
        </div>
      )}
    </>
  );
};

export default FormGender;
