import React from "react";
import Slider from "rc-slider";
import "./range.css";
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";

import * as S from "../../style";
import { useHistory } from "react-router";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Presenter({
  filterReset,
  setFilterSwitch,
  paymentType,
  changePayType,
  changeFilter,
  minPay,
  doTime,
  timeArr,
  setFilter,
  data,
  setData,
}) {
  const history = useHistory();
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
              disabled={data["paymentType"] === a.value ? true : false}
              onClick={changePayType}
            >
              {a.name}
            </S.SelectBtn>
          );
        })}
      </S.DetailBox>
      <CSSTransition
        in={data["paymentType"] === "CACHE"}
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
                disabled={data["minPay"] === a.value ? true : false}
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
              disabled={data["doTime"] === a.value ? true : false}
              onClick={changeFilter}
            >
              {a.name}
            </S.SelectBtn>
          );
        })}
      </S.DetailBox>
      <S.DetailBox>
        <p>실험 시작시간 {`${data["startTime"]}~${data["endTime"]}`}</p>

        <Range
          min={0}
          max={24}
          value={data["startAndEnd"]}
          allowCross={false}
          pushable={1}
          tipFormatter={(e) => timeArr[e]}
          onChange={(e) => {
            const copy = { ...data };
            copy["startAndEnd"] = e;
            if (e[0] === 0 && e[1] === 24) {
              copy["startTime"] = "";
              copy["endTime"] = "";
            } else {
              copy["startTime"] = timeArr[e[0]];
              copy["endTime"] = timeArr[e[1]];
            }
            setData(copy);
          }}
        />
      </S.DetailBox>
      <div
        onClick={() => {
          filterReset();
          setFilterSwitch(false);
          history.push("/apply?1");
        }}
      >
        모든 선택 초기화하기
      </div>
      <S.FilterSaveBtn
        onClick={() => {
          setFilter({ ...data });
          setFilterSwitch(false);
          history.push("/apply?1");
        }}
      >
        필터 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
