import React, { useState } from "react";

import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

export default function TestDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateArr, setDateArr] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(null);

  //format으로 넣어야함
  const createDateArr = (startDate, endDate) => {
    if (startDate < endDate) {
      const arr = [];
      let moveDate = moment(startDate);
      while (moveDate <= endDate) {
        arr.push(moveDate.format("YYYY-MM-DD"));
        moveDate.add(1, "days");
      }
      return arr;
    } else {
      return null;
    }
  };

  return (
    <>
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => {
          setFocusedInput(focusedInput);
          if (startDate && endDate !== null) {
            console.log(createDateArr(startDate, endDate));
          }
        }}
        monthFormat={"YYYY년 MM월"}
        displayFormat="YYYY-MM-DD"
        hideKeyboardShortcutsPanel={true}
        keepOpenOnDateSelect={true}
      />
      <SingleDatePicker
        date={date}
        onDateChange={(date) => setDate(date)}
        focused={focused}
        onFocusChange={({ focused }) => {
          setFocused(focused);
        }}
        id="date"
        monthFormat={"YYYY년 MM월"}
        displayFormat="YYYY-MM-DD"
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        renderCalendarDay={(props) => {
          return <CalendarDay {...props} />;
        }}
      />
    </>
  );
}
