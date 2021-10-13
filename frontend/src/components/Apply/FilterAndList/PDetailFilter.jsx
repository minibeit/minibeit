import React, { useState } from "react";
import Slider from "rc-slider";
import "../range.css";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import PropTypes, { number } from "prop-types";

import * as S from "../style";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

DetailFilter.propTypes = {
  filter: PropTypes.shape({
    schoolId: PropTypes.number,
    schoolName: PropTypes.string,
    paymentType: PropTypes.string,
    minPay: PropTypes.string,
    doTime: PropTypes.string,
    startAndEnd: PropTypes.arrayOf(number),
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  setFilter: PropTypes.func.isRequired,
  setFilterSwitch: PropTypes.func.isRequired,
  filterReset: PropTypes.func.isRequired,
};

export default function DetailFilter({
  filter,
  setFilter,
  setFilterSwitch,
  filterReset,
  search,
}) {
  const createTimeArr = () => {
    var timeArr = ["00:00"];
    var time = moment().set("hour", 0).set("minute", 0).set("second", 0);
    for (var i = 0; i < 24; i++) {
      timeArr.push(time.add(1, "hours").format("HH:mm"));
    }
    return timeArr;
  };
  const [timeArr] = useState(createTimeArr);

  const changeFilter = (e) => {
    const copy = { ...filter };
    copy[`${e.target.name}`] = e.target.value;
    setFilter(copy);
  };

  const paymentType = [
    { name: "전체", value: "" },
    { name: "현금", value: "CACHE" },
    { name: "물품", value: "GOODS" },
  ];
  const minPay = [
    { name: "전체", value: "" },
    { name: "1만원 미만", value: "9999" },
    { name: "1만원 이상", value: "10000" },
    { name: "3만원 이상", value: "30000" },
    { name: "5만원 이상", value: "50000" },
  ];
  const doTime = [
    { name: "전체", value: "" },
    { name: "30분 이내", value: "30" },
    { name: "1시간 이내", value: "60" },
    { name: "3시간 이내", value: "180" },
    { name: "3시간 이상", value: "181" },
  ];

  return (
    <S.FilterBox>
      <div
        onClick={() => {
          filterReset();
          setFilterSwitch(false);
        }}
      >
        <CloseIcon />
      </div>
      <S.DetailBox>
        <p>지급방식</p>
        {paymentType.map((a, i) => {
          return (
            <S.SelectBtn
              key={i}
              name="paymentType"
              value={a.value}
              disabled={filter["paymentType"] === a.value ? true : false}
              onClick={changeFilter}
            >
              {a.name}
            </S.SelectBtn>
          );
        })}
      </S.DetailBox>
      <CSSTransition
        in={filter["paymentType"] === "CACHE"}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <S.DetailBox>
          <p>보상금액</p>
          {minPay.map((a, i) => {
            return (
              <S.SelectBtn
                key={i}
                name="minPay"
                value={a.value}
                disabled={filter["minPay"] === a.value ? true : false}
                onClick={changeFilter}
              >
                {a.name}
              </S.SelectBtn>
            );
          })}
        </S.DetailBox>
      </CSSTransition>
      <S.DetailBox>
        <p>소요기간</p>
        {doTime.map((a, i) => {
          return (
            <S.SelectBtn
              key={i}
              name="doTime"
              value={a.value}
              disabled={filter["doTime"] === a.value ? true : false}
              onClick={changeFilter}
            >
              {a.name}
            </S.SelectBtn>
          );
        })}
      </S.DetailBox>
      <S.DetailBox>
        <p>실험 시작시간 {`${filter["startTime"]}~${filter["endTime"]}`}</p>

        <Range
          min={0}
          max={24}
          value={filter["startAndEnd"]}
          allowCross={false}
          pushable={1}
          tipFormatter={(e) => timeArr[e]}
          onChange={(e) => {
            const copy = { ...filter };
            copy["startAndEnd"] = e;
            if (e[0] === 0 && e[1] === 24) {
              copy["startTime"] = "";
              copy["endTime"] = "";
            } else {
              copy["startTime"] = timeArr[e[0]];
              copy["endTime"] = timeArr[e[1]];
            }
            setFilter(copy);
          }}
        />
      </S.DetailBox>
      <div onClick={filterReset}>모든 선택 초기화하기</div>
      <S.FilterSaveBtn
        onClick={() => {
          search();
          setFilterSwitch(false);
        }}
      >
        필터 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
