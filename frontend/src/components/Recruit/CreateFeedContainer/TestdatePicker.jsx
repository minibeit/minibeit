import React, { useState } from "react";

import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

export default function TestDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

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
        }}
        monthFormat={"YYYY년 MM월"}
        displayFormat="YYYY-MM-DD"
        hideKeyboardShortcutsPanel={true}
        keepOpenOnDateSelect={true}
        renderCalendarDay={(props) => {
          console.log(props.modifiers);
          return <CalendarDay {...props} />;
        }}
      />
    </>
  );
}
