import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";

import * as S from "../style";

import { useRecoilState } from "recoil";
import { recruitState } from "../../../recoil/recruitState";

export default function PDateSelect() {
  const [recruit, setrecruit] = useRecoilState(recruitState);

  /* range calendar state */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateArr, setDateArr] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  /* single calendar state */
  const [exceptDate, setExceptDate] = useState([]);
  const [focused, setFocused] = useState(null);

  /* time select */
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  /* 모집인원 카운트 로직 */
  const changeHeadCount = (e) => {
    if (e.target.textContent === "-") {
      const recruit_cp = { ...recruit };
      if (recruit_cp["headCount"] > 1) {
        recruit_cp["headCount"] -= 1;
      }
      setrecruit(recruit_cp);
    } else {
      const recruit_cp = { ...recruit };
      recruit_cp["headCount"] += 1;
      setrecruit(recruit_cp);
    }
  };

  /* 실험 시간 단위 로직 */
  const changeDoTime = (e) => {
    if (e.target.textContent === "-") {
      const recruit_cp = { ...recruit };
      if (recruit_cp["doTime"] > 30) {
        recruit_cp["doTime"] -= 10;
      }
      setrecruit(recruit_cp);
    } else {
      const recruit_cp = { ...recruit };
      recruit_cp["doTime"] += 10;
      setrecruit(recruit_cp);
    }
  };

  /* 실험 날짜 로직 */
  const createDateArr = (startDate, endDate) => {
    if (startDate < endDate) {
      const arr = [];
      let moveDate = moment(startDate);
      while (moveDate <= endDate) {
        arr.push(moment(moveDate).format("YYYY-MM-DD"));
        moveDate.add(1, "days");
      }
      return arr;
    } else {
      return null;
    }
  };

  /* 실험 날짜 빼는 로직 */
  const handleDateArr = (date) => {
    if (startDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")) {
      alert("실험 첫날은 지울수 없습니다");
    } else if (dateArr.includes(date.format("YYYY-MM-DD"))) {
      const dateArr_cp = dateArr;
      dateArr_cp.splice(dateArr_cp.indexOf(date.format("YYYY-MM-DD")), 1);
      setDateArr([...dateArr_cp]);
      setExceptDate([...exceptDate, date.format("YYYY-MM-DD")]);
    } else {
      setDateArr([...dateArr, date.format("YYYY-MM-DD")]);
      const exceptDate_cp = [...exceptDate];
      exceptDate_cp.splice(exceptDate_cp.indexOf(date.format("YYYY-MM-DD")), 1);
      setExceptDate([...exceptDate_cp]);
    }
  };
  console.log(recruit);
  return (
    <>
      <h2>리서치 정보를 알려주세요.</h2>
      <p>정확한 정보를 입력해주세요.</p>
      <S.DateBox>
        <p>실험 기간</p>
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date"
          endDate={endDate}
          endDateId="end_date"
          monthFormat={"YYYY년 MM월"}
          displayFormat="YYYY-MM-DD"
          hideKeyboardShortcutsPanel={true}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            if (startDate && endDate !== null) {
              setDateArr(createDateArr(startDate, endDate));
            }
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            setFocusedInput(focusedInput);
          }}
        />
      </S.DateBox>

      <S.DateBox>
        <p>날짜 빼기</p>
        <SingleDatePicker
          date={startDate}
          onDateChange={handleDateArr}
          focused={focused}
          onFocusChange={({ focused }) => {
            setFocused(focused);
          }}
          key={dateArr}
          numberOfMonths={2}
          isDayBlocked={(day) => {
            if (moment(startDate) > day || moment(endDate) < day) {
              return true;
            }
          }}
          dayAriaLabelFormat="hi"
          hideKeyboardShortcutsPanel
          monthFormat="YYYY년 MM월"
          disabled={startDate && endDate ? false : true}
          displayFormat={
            exceptDate.length === 0 ? "없음" : `${exceptDate.length}일`
          }
          keepOpenOnDateSelect={true}
          renderCalendarDay={(props) => {
            const { day, modifiers } = props;
            if (day && dateArr.length !== 0) {
              if (dateArr.find((ele) => ele === day.format("YYYY-MM-DD"))) {
                modifiers && modifiers.add("selected");
              }
            }
            return <CalendarDay {...props} modifiers={modifiers} />;
          }}
        />
      </S.DateBox>

      <S.HeadCountBox>
        <p>모집 인원</p>
        <button onClick={changeHeadCount}>-</button>
        <p>{recruit["headCount"]}명</p>
        <button onClick={changeHeadCount}>+</button>
      </S.HeadCountBox>
      <p>시간 단위</p>
      <S.DoTimeBox>
        <button onClick={changeDoTime}>-</button>
        <p>{recruit["doTime"]}분</p>
        <button onClick={changeDoTime}>+</button>
      </S.DoTimeBox>
      <S.StartEndTimeBox>
        <p>시작시간</p>
        <DatePicker
          selected={startTime}
          onChange={(date) => {
            const recruit_cp = { ...recruit };
            recruit_cp["startTime"] = moment(date).format("HH:mm");
            setStartTime(date);
            setrecruit(recruit_cp);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
        <p>종료시간</p>
        <DatePicker
          selected={endTime}
          onChange={(date) => {
            const recruit_cp = { ...recruit };
            recruit_cp["endTime"] = moment(date).format("HH:mm");
            setEndTime(date);
            setrecruit(recruit_cp);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
      </S.StartEndTimeBox>
      {dateArr.length !== 0 && recruit["startTime"] && recruit["endTime"] ? (
        <button
          onClick={() => {
            const recruit_cp = { ...recruit };
            recruit_cp["doDateList"] = dateArr;
            recruit_cp["startDate"] = startDate.format("YYYY-MM-DD");
            recruit_cp["endDate"] = endDate.format("YYYY-MM-DD");
            setrecruit(recruit_cp);
          }}
        >
          확인
        </button>
      ) : null}
    </>
  );
}
