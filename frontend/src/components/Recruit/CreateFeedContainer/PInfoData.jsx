import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { useRecoilState } from "recoil";
import { recruitState } from "../../../recoil/recruitState";

import * as S from "../style";

export default function PInfoData() {
  const [recruit, setrecruit] = useRecoilState(recruitState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [condition, setCondition] = useState(false);
  const [conditionDetail, setConditionDetail] = useState([]);
  const [payment, setPayment] = useState("cache");
  const [pay, setPay] = useState("");
  const [payMemo, setPayMemo] = useState("");

  const addConditionDetail = () => {
    const copy = [...conditionDetail];
    copy.push("");
    setConditionDetail(copy);
  };
  const writeCondition = (e) => {
    const copy = [...conditionDetail];
    copy[parseInt(e.target.id)] = e.target.value;
    setConditionDetail(copy);
  };
  const onSubmit = () => {
    const copy = { ...recruit };
    copy.title = title;
    copy.content = content;
    copy.condition = condition;
    copy.conditionDetail = conditionDetail;
    copy.payment = payment;
    copy.pay = pay;
    copy.payMemo = payMemo;
    setrecruit(copy);
  };

  return (
    <>
      <h2>제목</h2>
      <S.TitleInput
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <h2>상세 모집 요강</h2>
      <S.ContentInput
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <h2>지원 조건</h2>
      <Switch
        checked={condition}
        onChange={() => setCondition(!condition)}
        name="condition"
        color="primary"
      />
      {conditionDetail.map((a, i) => {
        return (
          <div key={i}>
            <S.ConditionInput
              id={i}
              disabled={condition ? false : true}
              onChange={(e) => {
                writeCondition(e);
              }}
            />
          </div>
        );
      })}
      <button onClick={addConditionDetail} disabled={condition ? false : true}>
        +
      </button>
      <h2>금액 및 지급 분류</h2>
      <ToggleButtonGroup
        value={payment}
        exclusive
        onChange={(e, value) => setPayment(value)}
        aria-label="text alignment"
      >
        <ToggleButton value="cache" aria-label="cache">
          현금
        </ToggleButton>
        <ToggleButton value="goods" aria-label="goods">
          보상
        </ToggleButton>
      </ToggleButtonGroup>
      {payment === "cache" ? (
        <>
          <S.PaymentInput
            type="number"
            defaultValue={0}
            onChange={(e) => {
              setPay(e.target.value);
            }}
          />
          <span>원</span>
        </>
      ) : (
        <S.PaymentInput
          placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
          onChange={(e) => {
            setPay(e.target.value);
          }}
        />
      )}
      <S.PaymentMemo
        placeholder="남기실 메모가 있다면 적어주세요"
        onChange={(e) => {
          setPayMemo(e.target.value);
        }}
      />
      <button onClick={onSubmit}>확인</button>
    </>
  );
}
