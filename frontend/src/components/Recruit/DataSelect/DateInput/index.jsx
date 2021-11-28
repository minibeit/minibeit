import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Calendar from "react-calendar";
import moment from "moment";

import * as S from "./style";

export default function DateInput({ minDate, maxDate, onChange }) {
  const [calendarView, setCalendarView] = useState(false);
  const [arr, setArr] = useState([]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      if (arr.find((ele) => ele === moment(date).format("YYYY-MM-DD"))) {
        return <S.ColorView />;
      } else {
        return null;
      }
    }
  };

  const onDateClick = (date) => {
    let stringDate = moment(date).format("YYYY-MM-DD");
    if (arr.findIndex((ele) => ele === stringDate) !== -1) {
      const copy = [...arr];
      copy.splice(
        arr.findIndex((ele) => ele === stringDate),
        1
      );
      copy.sort();
      setArr(copy);
    } else {
      const copy = [...arr];
      copy.push(stringDate);
      copy.sort();
      setArr(copy);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setCalendarView(false);
      }}
    >
      <div>
        <input
          readOnly
          defaultValue={arr.length !== 0 ? `${arr[0]} ~` : null}
          onClick={() => setCalendarView(!calendarView)}
        />
        {calendarView && (
          <S.CalendarWrapper>
            <Calendar
              calendarType="US"
              minDate={minDate}
              maxDate={maxDate}
              onChange={onDateClick}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              tileContent={tileContent}
            />
            <button
              onClick={() => {
                setCalendarView(false);
                onChange(arr);
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
