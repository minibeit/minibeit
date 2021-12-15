import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";
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
      if (moment(currentDate).format("D") === moment(date).format("D")) {
        return <S.ColorView>{moment(date).format("D")}</S.ColorView>;
      } else {
        return null;
      }
    }
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        setCalendarView(false);
      }}
    >
      <S.DateInputBox>
        <S.CalendarBtn onClick={() => setCalendarView(!calendarView)}>
          <CalendarIcon />
        </S.CalendarBtn>
        {calendarView && (
          <S.CalendarWrapper>
            <Calendar
              calendarType="US"
              value={currentDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => {
                setCurrentDate(moment(date).format("YYYY-MM-DD"));
                setCalendarView(!calendarView);
              }}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              tileContent={tileContent}
              formatDay={(locale, date) => moment(date).format("D")}
            />
          </S.CalendarWrapper>
        )}
      </S.DateInputBox>
    </ClickAwayListener>
  );
}
