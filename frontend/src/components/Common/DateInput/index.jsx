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

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      if (
        moment(currentDate).format("YYYY-MM-DD") ===
        moment(date).format("YYYY-MM-DD")
      ) {
        return <S.ColorView>{moment(date).format("D")}</S.ColorView>;
      } else {
        return null;
      }
    }
  };

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
              tileContent={tileContent}
              showNeighboringMonth={false}
              formatDay={(locale, date) => moment(date).format("D")}
            />
          </S.CalendarWrapper>
        )}
      </S.DateInputBox>
    </ClickAwayListener>
  );
}
