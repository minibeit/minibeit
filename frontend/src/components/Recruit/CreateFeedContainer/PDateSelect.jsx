import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

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
      if (recurit_cp["doTime"] > 10) {
        recurit_cp["doTime"] -= 10;
      }
      setRecurit(recurit_cp);
    } else {
      const recurit_cp = { ...recurit };
      recurit_cp["doTime"] += 10;
      setRecurit(recurit_cp);
    }
  };

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
    </>
  );
}
