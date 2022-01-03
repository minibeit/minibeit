import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Calendar from "react-calendar";
import moment from "moment";

import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as CalendarIcon } from "../../../../svg/달력.svg";

import * as S from "./style";

export default function DateInput({ minDate, maxDate, onChange }) {
  const [calendarView, setCalendarView] = useState(false);
  const [dateArr, setDateArr] = useState([]);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      if (dateArr.find((ele) => ele === moment(date).format("YYYY-MM-DD"))) {
        return <S.ColorView>{moment(date).format("D")}</S.ColorView>;
      } else {
        return null;
      }
    }
  };

  const onDateClick = (date) => {
    let stringDate = moment(date).format("YYYY-MM-DD");
    if (dateArr.findIndex((ele) => ele === stringDate) !== -1) {
      const copy = [...dateArr];
      copy.splice(
        dateArr.findIndex((ele) => ele === stringDate),
        1
      );
      copy.sort();
      setDateArr(copy);
    } else {
      const copy = [...dateArr];
      copy.push(stringDate);
      copy.sort();
      setDateArr(copy);
    }
  };

  const removeDate = (date) => {
    const copy = [...dateArr];
    copy.splice(
      dateArr.findIndex((ele) => ele === date),
      1
    );
    copy.sort();
    setDateArr(copy);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setCalendarView(false);
      }}
    >
      <div>
        <S.DateInput>
          <CalendarIcon />
          <input
            readOnly
            defaultValue={
              dateArr.length !== 0
                ? `${moment(dateArr[0]).format("M월D일")}  ~ ${moment(
                    dateArr[dateArr.length - 1]
                  ).format("M월D일")}`
                : null
            }
            onClick={() => setCalendarView(!calendarView)}
          />
        </S.DateInput>
        {calendarView && (
          <S.CalendarWrapper>
            <div>
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
                formatDay={(locale, date) => moment(date).format("D")}
              />
              <S.DateList>
                <div>
                  {dateArr.map((a, i) => {
                    return (
                      <S.Date key={i}>
                        <p>{moment(a).format("MM월DD일")}</p>
                        <CloseIcon onClick={() => removeDate(a)} />
                      </S.Date>
                    );
                  })}
                </div>
              </S.DateList>
            </div>
            <div>
              <button
                onClick={() => {
                  setCalendarView(false);
                  onChange(dateArr);
                }}
              >
                적용
              </button>
            </div>
          </S.CalendarWrapper>
        )}
      </div>
    </ClickAwayListener>
  );
}
