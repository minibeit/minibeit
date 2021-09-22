import React, { useState } from "react";

import "react-dates/initialize";
import { CalendarDay, DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

import * as S from "../style";

import { useRecoilState } from "recoil";
import { recruitState } from "../../../recoil/recruitState";

export default function PDateSelect() {
  const [recruit, setRecruit] = useRecoilState(recruitState);

  /* range calendar state */
  const [date, setDate] = useState(recruit["startDate"]);

  return (
    <>
      <h2>정확한 실험 시간을 날짜마다 정해보세요</h2>
      <S.DateBox>
        <DayPickerSingleDateController
          date={date}
          onDateChange={(day) => setDate(day)}
          isDayBlocked={(day) => {
            if (
              moment(recruit["startDate"]) > day ||
              moment(recruit["endDate"]).add(1, "days") <= day
            ) {
              return true;
            }
          }}
          hideKeyboardShortcutsPanel
          monthFormat="YYYY년 MM월"
          keepOpenOnDateSelect={true}
          renderCalendarDay={(props) => {
            const { day, modifiers } = props;

            return <CalendarDay {...props} modifiers={modifiers} />;
          }}
        />
      </S.DateBox>
      <S.GroupBox>
        <button>+</button>
        <button>그룹 1</button>
        <button>그룹 2</button>
      </S.GroupBox>
    </>
  );
}
