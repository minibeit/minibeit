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
      <CSSTransition
        in={filter["paymentType"] === "CACHE"}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <S.DetailBox>
          <p>보상금액</p>
          <S.SelectBtn
            name="minPay"
            value=""
            disabled={filter["minPay"] === "" ? true : false}
            onClick={changeFilter}
          >
            전체
          </S.SelectBtn>
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
        </S.DetailBox>
      </CSSTransition>
      <S.DetailBox>
        <p>소요기간</p>
        <S.SelectBtn
          name="doTime"
          value=""
          disabled={filter["doTime"] === "" ? true : false}
          onClick={changeFilter}
        >
          전체
        </S.SelectBtn>
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
