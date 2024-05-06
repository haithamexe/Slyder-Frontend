const FormGender = (props) => {
  const { register, errors, isTouched, watched } = props;

  return (
    <>
      <label>Gender</label>
      <div className="radio-container">
        <label className="radio-select">
          <div>
            Male
            <input
              type="radio"
              name="gender"
              // onChange={(e) => handleChange(e)}
              value="male"
              {...register("gender")}
            />
          </div>
        </label>
        <label className="radio-select">
          <div>
            Female
            <input
              type="radio"
              name="gender"
              // onChange={(e) => handleChange(e)}
              value="female"
              {...register("gender")}
            />
          </div>
        </label>
        <label className="radio-select">
          <div>
            Other
            <input
              type="radio"
              name="gender"
              value="other"
              // onChange={(e) => handleChange(e)}
              {...register("gender")}
            />
          </div>
        </label>
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
