import React, { useState } from "react";
import Calendar from "react-calendar";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoil/filterState";

import "./Calender.scss";

export default function FLCalendar() {
  const [date, setDate] = useRecoilState(filterState);
  console.log(date);
  const [value, setValue] = useState(
    date.date == null ? new Date() : new Date(date.date)
  );
  console.log(value);
  const onChange = (e) => {
    setValue(e);
    console.log(e);
    const nowDay = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
    let nowMonth = e.getMonth() + 1;
    nowMonth = nowMonth < 10 ? "0" + nowMonth : nowMonth;
    const nowYear = e.getFullYear();
    const nowDate = nowYear + "-" + nowMonth + "-" + nowDay;
    console.log(nowDate);
    setDate({
      ...date,
      date: new Date(e),
      dateApi: nowDate,
    });
  };
  return (
    <div>
      <Calendar onChange={onChange} value={value} className="react-calendar" />
    </div>
  );
}
