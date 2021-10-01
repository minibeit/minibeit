import React, { useState } from "react";
import Slider from "rc-slider";
import "../range.css";
import moment from "moment";

import * as S from "../style";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function DetailFilter({
  filter,
  setFilter,
  setFilterSwitch,
  filterReset,
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

  return (
    <S.FilterBox>
      <button
        onClick={() => {
          filterReset();
          setFilterSwitch(false);
        }}
      >
        닫기
      </button>
      <S.DetailBox>
        <h4>지급방식</h4>
        <S.SelectBtn
          name="paymentType"
          value=""
          disabled={filter["paymentType"] === "" ? true : false}
          onClick={changeFilter}
        >
          전체
        </S.SelectBtn>
        <S.SelectBtn
          name="paymentType"
          value="CACHE"
          disabled={filter["paymentType"] === "CACHE" ? true : false}
          onClick={changeFilter}
        >
          현금
        </S.SelectBtn>
        <S.SelectBtn
          name="paymentType"
          value="GOODS"
          disabled={filter["paymentType"] === "GOODS" ? true : false}
          onClick={changeFilter}
        >
          물품
        </S.SelectBtn>
      </S.DetailBox>
      <S.DetailBox>
        <h4>보상금액</h4>
        {filter["paymentType"] === "GOODS" ? (
          <p>물품일때는 보상금액을 선택할수 없습니다.</p>
        ) : (
          <>
            <S.SelectBtn
              name="minPay"
              value="9999"
              disabled={filter["minPay"] === "9999" ? true : false}
              onClick={changeFilter}
            >
              1만원 미만
            </S.SelectBtn>
            <S.SelectBtn
              name="minPay"
              value="10000"
              disabled={filter["minPay"] === "10000" ? true : false}
              onClick={changeFilter}
            >
              1만원 이상
            </S.SelectBtn>
            <S.SelectBtn
              name="minPay"
              value="30000"
              disabled={filter["minPay"] === "30000" ? true : false}
              onClick={changeFilter}
            >
              3만원 이상
            </S.SelectBtn>
            <S.SelectBtn
              name="minPay"
              value="50000"
              disabled={filter["minPay"] === "50000" ? true : false}
              onClick={changeFilter}
            >
              5만원 이상
            </S.SelectBtn>
          </>
        )}
      </S.DetailBox>
      <S.DetailBox>
        <h4>소요기간</h4>
        <S.SelectBtn
          name="doTime"
          value="30"
          disabled={filter["doTime"] === "30" ? true : false}
          onClick={changeFilter}
        >
          30분 이내
        </S.SelectBtn>
        <S.SelectBtn
          name="doTime"
          value="60"
          disabled={filter["doTime"] === "60" ? true : false}
          onClick={changeFilter}
        >
          1시간 이내
        </S.SelectBtn>
        <S.SelectBtn
          name="doTime"
          value="180"
          disabled={filter["doTime"] === "180" ? true : false}
          onClick={changeFilter}
        >
          3시간 이내
        </S.SelectBtn>
        <S.SelectBtn
          name="doTime"
          value="181"
          disabled={filter["doTime"] === "181" ? true : false}
          onClick={changeFilter}
        >
          3시간 이상
        </S.SelectBtn>
      </S.DetailBox>
      <S.DetailBox>
        <h4>실험 시작시간</h4>
        <p>{`${filter["startTime"]}~${filter["endTime"]}`}</p>
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
            copy["startTime"] = timeArr[e[0]];
            copy["endTime"] = timeArr[e[1]];
            setFilter(copy);
          }}
        />
      </S.DetailBox>
      <button onClick={filterReset}>필터 초기화</button>
      <button onClick={() => setFilterSwitch(false)}>필터 적용하기</button>
    </S.FilterBox>
  );
}
