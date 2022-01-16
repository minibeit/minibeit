import React, { useEffect, useState, useCallback } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { feedDetailDateApi } from "../../../utils";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";

import * as S from "./style";

export default function CalendarButton({
  feedId,
  minDate,
  maxDate,
  currentDate,
  setCurrentDate,
}) {
  const [calendarView, setCalendarView] = useState(false);
  const [activeDate, setActiveDate] = useState([]);

  const getActiveDate = useCallback(
    (date) => {
      feedDetailDateApi(feedId, moment(date).format("YYYY-MM")).then((res) =>
        setActiveDate(res.data.data.doDateList.sort())
      );
    },
    [feedId]
  );

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

  const tileDisabled = ({ date }) => {
    if (activeDate.find((a) => a === moment(date).format("YYYY-MM-DD"))) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getActiveDate();
  }, [getActiveDate]);

  return (
    <ClickAwayListener onClickAway={() => setCalendarView(false)}>
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
              onActiveStartDateChange={({ activeStartDate }) =>
                getActiveDate(activeStartDate)
              }
              tileDisabled={tileDisabled}
              onChange={(date) => {
                setCurrentDate(moment(date).format("YYYY-MM-DD"));
                setCalendarView(!calendarView);
              }}
              tileContent={tileContent}
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
