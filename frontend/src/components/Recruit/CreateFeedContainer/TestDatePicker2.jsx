import React, { useState } from "react";

import "react-dates/initialize";
import { CalendarDay, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

export default function TestDatePicker2() {
  moment.locale("ko");
  const [dates, setDates] = useState(null);
  const [focused, setFocused] = useState(null);

  return (
    <>
      <SingleDatePicker
        date={dates}
        onDateChange={(date) => setDates(date)}
        focused={focused}
        onFocusChange={({ focused }) => {
          setFocused(focused);
        }}
        id="date"
        monthFormat={"YYYY년 MM월"}
        displayFormat="YYYY-MM-DD"
        numberOfMonths={1}
        noBorder
        hideKeyboardShortcutsPanel
        renderCalendarDay={(props) => {
          console.log(props.modifiers);
          return <CalendarDay {...props} />;
        }}
      />
    </>
  );
}
