import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Calendar from "react-calendar";
import moment from "moment";

import * as S from "./style";

export default function DateInput({ minDate, maxDate, defaultDate, onChange }) {
  const [calendarView, setCalendarView] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      if (moment(selectDate).format("D") === moment(date).format("D")) {
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
        <input
          readOnly
          value={moment(defaultDate).format("YY.MM.DD")}
          onClick={() => setCalendarView(!calendarView)}
        />
        {calendarView && (
          <S.CalendarWrapper>
            <Calendar
              calendarType="US"
              value={selectDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => setSelectDate(date)}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              tileContent={tileContent}
              formatDay={(locale, date) => moment(date).format("D")}
            />
            <button
              onClick={() => {
                setCalendarView(false);
                onChange(selectDate);
              }}
            >
              선택 완료
            </button>
          </S.CalendarWrapper>
        )}
      </S.DateInputBox>
    </ClickAwayListener>
  );
}
