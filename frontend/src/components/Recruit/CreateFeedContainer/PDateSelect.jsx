import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "../react-dates.css";
import moment from "moment";
import "moment/locale/ko";
import PTimeSelect from "./PTimeSelect";

import * as S from "../style";

PDateSelect.propTypes = {
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
  setRecruit: PropTypes.func.isRequired,
};

export default function PDateSelect({ recruit, setRecruit }) {
  const { startDate, endDate, dateList, exceptDateList, doTime } = recruit;

  /* range calendar state */
  const [focusedInput, setFocusedInput] = useState(null);

  /* single calendar state */
  const [focused, setFocused] = useState(null);
  const [check, setCheck] = useState(false);

  /* time select */
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  /* time select calendar */
  const [switchCalendar, setSwitchCalendar] = useState(false);
  const [createdGroup, setCreatedGroup] = useState([]);

  /* 모집인원 카운트 로직 */
  const changeHeadCount = (e) => {
    if (e.target.textContent === "-") {
      const copy = { ...recruit };
      if (copy.headCount > 1) {
        copy.headCount -= 1;
      }
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.headCount += 1;
      setRecruit(copy);
    }
  };

  /* 실험 시간 단위 로직 */
  const changeDoTime = (e) => {
    if (e.target.textContent === "-") {
      const copy = { ...recruit };
      if (copy.doTime > 30) {
        copy.doTime -= 30;
        setRecruit(copy);
      }
    } else {
      const copy = { ...recruit };
      copy.doTime += 30;
      setRecruit(copy);
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
  const createExceptDate = (date) => {
    const copy = recruit;
    if (startDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")) {
      alert("실험 첫날은 지울수 없습니다");
    } else if (copy.dateList.includes(date.format("YYYY-MM-DD"))) {
      copy.dateList.splice(copy.dateList.indexOf(date.format("YYYY-MM-DD")), 1);
      copy.exceptDateList = [...copy.exceptDateList, date.format("YYYY-MM-DD")];
      setCheck(!check);
      setRecruit(copy);
    } else {
      copy.dateList = [...copy.dateList, date.format("YYYY-MM-DD")];
      copy.exceptDateList.splice(
        copy.exceptDateList.indexOf(date.format("YYYY-MM-DD")),
        1
      );
      setCheck(!check);
      setRecruit(copy);
    }
  };

  const createTimeArr = (startTime, endTime, doTime) => {
    const startMoment = moment(startTime, "HH:mm");
    const endMoment = moment(endTime, "HH:mm");
    const timeArr = [];
    const moveMoment = startMoment.clone();
    while (moveMoment.clone().add(doTime, "minutes") <= endMoment) {
      timeArr.push(
        `${moveMoment.clone().format("HH:mm")}~${moveMoment
          .clone()
          .add(doTime, "minutes")
          .format("HH:mm")}`
      );
      moveMoment.add(doTime, "minutes");
    }
    const copy = recruit;
    copy.timeList = timeArr;
    setRecruit(copy);
  };

  useEffect(() => {
    createTimeArr(startTime, endTime, doTime);
  });

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
            const copy = recruit;
            copy.startDate = startDate;
            copy.endDate = endDate;
            setRecruit(copy);
            if (startDate && endDate !== null) {
              const copy = recruit;
              copy.dateList = createDateArr(startDate, endDate);
              setRecruit(copy);
            }
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            setFocusedInput(focusedInput);
            const copy = { ...recruit };
            copy.exceptDateList = [];
            setRecruit(copy);
          }}
        />
      </S.DateBox>

      <S.DateBox>
        <p>날짜 빼기</p>
        <SingleDatePicker
          date={startDate}
          onDateChange={createExceptDate}
          focused={focused}
          onFocusChange={({ focused }) => {
            setFocused(focused);
          }}
          key={check}
          keepOpenOnDateSelect={true}
          numberOfMonths={2}
          isDayBlocked={(day) => {
            if (startDate > day || endDate < day) {
              return true;
            }
          }}
          dayAriaLabelFormat="hi"
          hideKeyboardShortcutsPanel
          monthFormat="YYYY년 MM월"
          disabled={startDate && endDate ? false : true}
          displayFormat={
            exceptDateList.length === 0 ? "없음" : `${exceptDateList.length}일`
          }
          renderCalendarDay={(props) => {
            const { day, modifiers } = props;
            if (day && dateList.length !== 0) {
              if (dateList.find((ele) => ele === day.format("YYYY-MM-DD"))) {
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
        <p>{recruit.headCount}명</p>
        <button onClick={changeHeadCount}>+</button>
      </S.HeadCountBox>
      <p>시간 단위</p>
      <S.DoTimeBox>
        <button onClick={changeDoTime}>-</button>
        <p>{recruit.doTime}분</p>
        <button onClick={changeDoTime}>+</button>
      </S.DoTimeBox>
      <S.StartEndTimeBox>
        <p>시작시간</p>
        <DatePicker
          selected={startTime}
          onChange={(date) => {
            const copy = { ...recruit };
            copy.startTime = moment(date).format("HH:mm");
            setStartTime(date);
            setRecruit(copy);
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
            const copy = { ...recruit };
            copy.endTime = moment(date).format("HH:mm");
            setEndTime(date);
            setRecruit(copy);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
      </S.StartEndTimeBox>
      <button
        key={recruit}
        disabled={startTime && endTime && startDate && endDate ? false : true}
        onClick={() => {
          setSwitchCalendar(!switchCalendar);
        }}
      >
        {switchCalendar ? "접기" : "펼쳐보기"}
      </button>
      {switchCalendar && (
        <PTimeSelect
          recruit={recruit}
          setRecruit={setRecruit}
          setSwitchCalendar={setSwitchCalendar}
          switchCalendar={switchCalendar}
          createdGroup={createdGroup}
          setCreatedGroup={setCreatedGroup}
        />
      )}
    </>
  );
}
