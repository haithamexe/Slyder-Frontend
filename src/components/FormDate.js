import { useState, useEffect } from "react";
import { getMonthName } from "./getMonth";
const FormDate = (props) => {
  const { errors, register, isTouched, watched } = props;

  const year = watched[0];
  const month = watched[1];
  const [daysInMonth, setDaysInMonth] = useState(31);

  useEffect(() => {
    const date = new Date(year, month, 0);
    setDaysInMonth(date.getDate());
  }, [year, month]);

  const formyears = new Array(108)
    .fill(0)
    .map((_, i) => new Date().getFullYear() - i);
  const formMonths = new Array(12).fill(0).map((_, i) => i + 1);
  const formDays = new Array(daysInMonth).fill(0).map((_, i) => i + 1);

  return (
    <>
      <label className="doa">Date of birth</label>
      <div className="register-date-container">
        <select
          // value={day}
          // onChange={(e) => handleChange(e)}
          name="day"
          {...register("day")}
        >
          {formDays.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="month"
          //  value={month}
          //   onChange={(e) => handleChange(e)}
          {...register("month")}
        >
          {formMonths.map((month, index) => (
            <option key={index} value={month}>
              {getMonthName(month)}
            </option>
          ))}
        </select>
        <select
          name="year"
          //  value={year}
          //  onChange={(e) => handleChange(e)}
          {...register("year")}
        >
          {formyears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FormDate;
