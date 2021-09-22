import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import PDatePicker from "./PDatePicker";
import moment from "moment";

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

  /* time select */
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  /* 모집인원 카운트 로직 */
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

  /* 실험 시간 단위 로직 */
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

  console.log(recurit);
  return (
    <>
      <h2>리서치 정보를 알려주세요.</h2>
      <p>정확한 정보를 입력해주세요.</p>
      <PDatePicker />
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
        <DatePicker
          selected={startTime}
          onChange={(date) => {
            const recurit_cp = { ...recurit };
            recurit_cp["startTime"] = moment(date).format("HH:mm");
            setStartTime(date);
            setRecurit(recurit_cp);
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
            const recurit_cp = { ...recurit };
            recurit_cp["endTime"] = moment(date).format("HH:mm");
            setEndTime(date);
            setRecurit(recurit_cp);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
      </S.StartEndTimeBox>
      <button>확인</button>
    </>
  );
}
