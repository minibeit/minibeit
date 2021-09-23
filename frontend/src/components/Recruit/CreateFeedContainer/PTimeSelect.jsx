import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "react-calendar/dist/Calendar.css";
import "react-dates/initialize";
import {
  CalendarDay,
  DayPickerSingleDateController,
  isSameDay,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

import * as S from "../style";

import { useRecoilState } from "recoil";
import { recruitState } from "../../../recoil/recruitState";

export default function PDateSelect() {
  const [recruit, setRecruit] = useRecoilState(recruitState);

  const [color] = useState([
    { id: 1, color: "#0be881" },
    { id: 2, color: "#f7d794" },
    { id: 3, color: "#cf6a87" },
    { id: 4, color: "#574b90" },
    { id: 5, color: "#63cdda" },
  ]);
  const [btnGroup, setBtnGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState();

  const disabledDates = [...recruit["exceptDateList"]];

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return disabledDates.find(
        (ele) =>
          moment(ele).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
      );
    }
  };

  return (
    <>
      <h2>정확한 실험 시간을 날짜마다 정해보세요</h2>

      <S.DateBox>
        <Calendar
          minDate={new Date(recruit["startDate"])}
          maxDate={new Date(recruit["endDate"])}
          onClickDay={(day, e) => {
            if (e.target.nodeName === "BUTTON") {
              e.target.style["background-color"] = selectGroup;
            } else {
              e.target.parentNode.style["background-color"] = selectGroup;
            }
          }}
          tileDisabled={tileDisabled}
        />
      </S.DateBox>
      <S.GroupBox>
        <S.GroupBtn
          onClick={() => {
            if (btnGroup.length < 5) {
              setBtnGroup([...btnGroup, color[btnGroup.length]]);
            } else {
              alert("그룹은 최대 5개 입니다.");
            }
          }}
        >
          +
        </S.GroupBtn>
        {btnGroup.map((a) => {
          return (
            <S.GroupBtn
              onClick={() => {
                setSelectGroup(a.color);
              }}
              color={a.color}
              key={a.id}
            >
              그룹 {a.id}
            </S.GroupBtn>
          );
        })}
      </S.GroupBox>
    </>
  );
}
