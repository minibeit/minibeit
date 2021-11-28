import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Calendar from "react-calendar";
import moment from "moment";

import * as S from "./style";

export default function DateInput({ minDate, maxDate, defaultDate, onChange }) {
  const [calendarView, setCalendarView] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <ClickAwayListener
      onClickAway={() => {
        setCalendarView(false);
      }}
    >
      <div>
        <input
          readOnly
          value={moment(defaultDate).format("YYYY.MM.DD")}
          onClick={() => setCalendarView(!calendarView)}
        />
        {calendarView && (
          <S.CalendarWrapper>
            <Calendar
              calendarType="US"
              value={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => setDate(date)}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
            />
            <button
              onClick={() => {
                setCalendarView(false);
                onChange(date);
              }}
            >
              선택 완료
            </button>
          </S.CalendarWrapper>
        )}
      </div>
    </ClickAwayListener>
  );
}
