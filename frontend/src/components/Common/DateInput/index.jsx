import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Calendar from "react-calendar";
import moment from "moment";

import * as S from "./style";

export default function DateInput({
  minDate,
  maxDate,
  currentDate,
  setCurrentDate,
}) {
  const [calendarView, setCalendarView] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setCalendarView(false)}>
      <S.DateInputBox>
        <input
          readOnly
          value={moment(currentDate).format("YY.MM.DD")}
          onClick={() => setCalendarView(!calendarView)}
        />
        {calendarView && (
          <S.CalendarWrapper>
            <Calendar
              calendarType="US"
              value={currentDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => {
                setCurrentDate({ date: date });
                setCalendarView(false);
              }}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              formatDay={(locale, date) => moment(date).format("D")}
            />
          </S.CalendarWrapper>
        )}
      </S.DateInputBox>
    </ClickAwayListener>
  );
}
