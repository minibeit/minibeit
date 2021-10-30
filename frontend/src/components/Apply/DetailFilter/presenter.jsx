import React from "react";
import Slider from "rc-slider";
import "../range.css";
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";

import * as S from "../style";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Presenter({
  filterReset,
  setFilterSwitch,
  paymentType,
  filter,
  changeFilter,
  minPay,
  doTime,
  timeArr,
  setFilter,
  search,
}) {
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
          search(1);
          setFilterSwitch(false);
        }}
      >
        필터 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
