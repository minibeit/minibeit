import React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import * as S from "../style";

PInfoData.propTypes = {
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

export default function PInfoData({ recruit, setRecruit }) {
  const addConditionDetail = () => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr.push("");
    copy.conditionDetail = arr;
    setRecruit(copy);
  };
  const writeCondition = (e) => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr[e.target.id] = e.target.value;
    copy.conditionDetail = arr;
    setRecruit(copy);
  };

  const conditionSwitch = () => {
    const copy = { ...recruit };
    copy.condition = !recruit.condition;
    setRecruit(copy);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...recruit };
    copy[name] = e.target.value;
    setRecruit(copy);
  };

  return (
    <>
      <h2>제목</h2>
      <S.TitleInput name="title" onChange={onChange} />
      <h2>상세 모집 요강</h2>
      <S.ContentInput name="content" onChange={onChange} />
      <h2>지원 조건</h2>
      <Switch
        checked={recruit["condition"]}
        onChange={conditionSwitch}
        name="condition"
        color="primary"
      />
      {recruit.conditionDetail.map((a, i) => {
        return (
          <div key={i}>
            <S.ConditionInput
              id={i}
              disabled={recruit.condition ? false : true}
              onChange={writeCondition}
            />
          </div>
        );
      })}
      <button
        onClick={addConditionDetail}
        disabled={recruit.condition ? false : true}
      >
        +
      </button>
      <h2>금액 및 지급 분류</h2>
      <ToggleButtonGroup
        value={recruit.payment}
        exclusive
        onChange={(e, value) => {
          const copy = { ...recruit };
          copy.payment = value;
          setRecruit(copy);
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="cache" aria-label="cache">
          현금
        </ToggleButton>
        <ToggleButton value="goods" aria-label="goods">
          보상
        </ToggleButton>
      </ToggleButtonGroup>
      {recruit.payment === "cache" ? (
        <>
          <S.PaymentInput
            name="pay"
            type="number"
            defaultValue={0}
            onChange={onChange}
          />
          <span>원</span>
        </>
      ) : (
        <S.PaymentInput
          name="pay"
          placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
          onChange={onChange}
        />
      )}
      <S.PaymentMemo
        name="payMemo"
        placeholder="남기실 메모가 있다면 적어주세요"
        onChange={onChange}
      />
    </>
  );
}
