import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

import * as S from "../style";

import { useRecoilState } from "recoil";
import { recuritState } from "../../../recoil/recuritState";

PSelectBProfile.propTypes = {
  bplist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
};

export default function PSelectBProfile() {
  const [recurit, setRecurit] = useRecoilState(recuritState);

  const changeHeadCount = (e) => {
    if (e.target.textContent === "-") {
      const recurit_cp = { ...recurit };
      if (recurit_cp["headCount"] > 1) {
        recurit_cp["headCount"] -= 1;
      }
      setRecurit(recurit_cp);
    } else {
      const recurit_cp = { ...recurit };
      recurit_cp["headCount"] += 1;
      setRecurit(recurit_cp);
    }
  };

  const changeDoTime = (e) => {
    if (e.target.textContent === "-") {
      const recurit_cp = { ...recurit };
      if (recurit_cp["doTime"] > 30) {
        recurit_cp["doTime"] -= 10;
      }
      setRecurit(recurit_cp);
    } else {
      const recurit_cp = { ...recurit };
      recurit_cp["doTime"] += 10;
      setRecurit(recurit_cp);
    }
  };

  function DateList(startDate, endDate) {
    let dateList = [];
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);
    let dateItem = dayjs(startDate);

    if (dateItem.format("YYYY-MM-DD") === endDate.format("YYYY-MM-DD")) {
      if (dateItem.format("YYYY-MM-DD") !== "Invalid Date") {
        dateList.push(dateItem.format("YYYY-MM-DD"));
      }
    } else {
      while (dateItem.format("YYYY-MM-DD") <= endDate.format("YYYY-MM-DD")) {
        dateList.push(dateItem.format("YYYY-MM-DD"));
        dateItem = dateItem.add(1, "day");
      }
    }
    return dateList;
  }

  function TimeList(startTime, endTime, doTime) {
    let arr = [];
    let new_startTime = dayjs()
      .hour(startTime.slice(0, 2))
      .minute(startTime.slice(3));
    let new_endTime = dayjs()
      .hour(endTime.slice(0, 2))
      .minute(endTime.slice(3));
    while (new_startTime < new_endTime) {
      arr.push(new_startTime.format("HH:mm"));
      new_startTime = new_startTime.add(doTime, "minute");
    }
    return arr;
  }

  function combineDateTime(DateList, TimeList) {
    const dateTimeArr = [];
    for (var i = 0; i < DateList.length; i++) {
      for (var j = 0; j < TimeList.length; j++) {
        dateTimeArr.push(`${DateList[i]}T${TimeList[j]}`);
      }
    }
    const recurit_cp = { ...recurit };
    recurit_cp["doDateList"] = dateTimeArr;
    setRecurit(recurit_cp);
  }

  return (
    <>
      <h2>리서치 정보를 알려주세요.</h2>
      <p>정확한 정보를 입력해주세요.</p>
      <S.DateBox>
        <p>시작 날짜</p>
        <DatePicker
          selected={recurit["startDate"]}
          onChange={(date) => {
            const recurit_cp = { ...recurit };
            recurit_cp["startDate"] = date;
            setRecurit(recurit_cp);
          }}
        />
      </S.DateBox>

      <S.DateBox>
        <p>종료 날짜</p>
        <DatePicker
          selected={recurit["endDate"]}
          onChange={(date) => {
            const recurit_cp = { ...recurit };
            recurit_cp["endDate"] = date;
            setRecurit(recurit_cp);
          }}
        />
      </S.DateBox>
      <S.HeadCountBox>
        <p>모집 인원</p>
        <button onClick={changeHeadCount}>-</button>
        <p>{recurit["headCount"]}명</p>
        <button onClick={changeHeadCount}>+</button>
      </S.HeadCountBox>
      <p>시간 단위</p>
      <S.DoTimeBox>
        <button onClick={changeDoTime}>-</button>
        <p>{recurit["doTime"]}분</p>
        <button onClick={changeDoTime}>+</button>
      </S.DoTimeBox>
      <S.StartEndTimeBox>
        <p>시작시간</p>
        <input
          type="time"
          onChange={(e) => {
            const recurit_cp = { ...recurit };
            recurit_cp["startTime"] = e.target.value;
            setRecurit(recurit_cp);
          }}
        />
        <p>종료시간</p>
        <input
          type="time"
          onChange={(e) => {
            const recurit_cp = { ...recurit };
            recurit_cp["endTime"] = e.target.value;
            setRecurit(recurit_cp);
          }}
        />
      </S.StartEndTimeBox>
    </>
  );
}
