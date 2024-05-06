import React, { useEffect, useState } from "react";
import { getMonthName } from "./getMonth";

const Selections = (props) => {
  const {
    formData: {
      date: { day, month, year, age },
    },
  } = props;

  // const [daysInMonth, setDaysInMonth] = useState(31);

  // useEffect(() => {
  //   const date = new Date(year, month, 0);
  //   setDaysInMonth(date.getdays());
  // }, [month, year]);

  const years = new Array(108)
    .fill(0)
    .map((_, i) => new Date().getFullYear() - i);
  const months = new Array(12).fill(0).map((_, i) => i + 1);
  const days = new Array(getdays()).fill(0).map((_, i) => i + 1);

  let content = null;

  content = (
    <div className="register-date-container">
      <label className="doa">
        <p>Date of birth</p>
        <button type="button" className="info-button">
          <i className="question_icon"></i>
        </button>
      </label>
      <div className="register-date">
        <select name="day" value={day}>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select name="month" value={month}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {getMonthName(month)}
            </option>
          ))}
        </select>

        <select className={selectClassName} name="year" value={year}>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return content;
};

export default Selections;
