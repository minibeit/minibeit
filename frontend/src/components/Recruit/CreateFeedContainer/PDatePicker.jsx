import React, { useState } from "react";

import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

export default function TestDatePicker() {
  /* range calendar state */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateArr, setDateArr] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  /* single calendar state */
  const [focused, setFocused] = useState(null);

  /* 실험 날짜 로직 */
  const createDateArr = (startDate, endDate) => {
    if (startDate < endDate) {
      const arr = [];
      let moveDate = moment(startDate);
      while (moveDate <= endDate) {
        arr.push(moment(moveDate).format("YYYY-MM-DD"));
        moveDate.add(1, "days");
      }
      return arr;
    } else {
      return null;
    }
  };

  /* 실험 날짜 빼는 로직 */
  const handleDateArr = (date) => {
    if (startDate === null) {
      alert("기간을 먼저 선택해주세요");
    } else {
      if (startDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")) {
        alert("실험 첫날은 지울수 없습니다");
      } else if (dateArr.includes(date.format("YYYY-MM-DD"))) {
        const dateArr_cp = dateArr;
        dateArr_cp.splice(dateArr_cp.indexOf(date.format("YYYY-MM-DD")), 1);
        setDateArr([...dateArr_cp]);
      } else {
        setDateArr([...dateArr, date.format("YYYY-MM-DD")]);
      }
    }
  };

  return (
    <>
      <>
        <p>실험 기간</p>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date"
          endDate={endDate}
          endDateId="end_date"
          monthFormat={"YYYY년 MM월"}
          displayFormat="YYYY-MM-DD"
          hideKeyboardShortcutsPanel={true}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            if (startDate && endDate !== null) {
              setDateArr(createDateArr(startDate, endDate));
            }
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            setFocusedInput(focusedInput);
          }}
        />
      </>

      <>
        <p>날짜 빼기</p>
        <SingleDatePicker
          date={startDate}
          onDateChange={handleDateArr}
          focused={focused}
          onFocusChange={({ focused }) => {
            setFocused(focused);
          }}
          key={dateArr}
          numberOfMonths={1}
          isDayBlocked={(day) => {
            if (moment(startDate) > day || moment(endDate) < day) {
              return true;
            }
          }}
          hideKeyboardShortcutsPanel
          monthFormat="YYYY년 MM월"
          displayFormat="YYYY-MM-DD"
          keepOpenOnDateSelect={true}
          renderCalendarDay={(props) => {
            const { day, modifiers } = props;
            if (day && dateArr.length !== 0) {
              if (dateArr.find((ele) => ele === day.format("YYYY-MM-DD"))) {
                modifiers && modifiers.add("selected");
              }
            }
            return <CalendarDay {...props} modifiers={modifiers} />;
          }}
        />
      </>
    </>
  );
}
