import React from "react";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";

import * as S from "../../style";

export default function FilterLabel({
  category,
  setCategory,
  filter,
  setFilter,
}) {
  const closeLabel = (name) => {
    if (name === "startAndEnd") {
      const copy = { ...filter };
      copy[name] = [0, 24];
      copy.startTime = "";
      copy.endTime = "";
      setFilter(copy);
    } else if (name === "category") {
      const copy = { ...category };
      copy.category = "ALL";
      setCategory(copy);
    } else if (name === "doTime") {
      const copy = { ...filter };
      copy[name] = { name: "전체", value: "" };
      setFilter(copy);
    } else {
      const copy = { ...filter };
      copy[name] = "";
      setFilter(copy);
    }
  };
  return (
    <S.FilterLabelBox>
      {filter.paymentType !== "" && (
        <>
          <p>선택한 필터 : </p>
          <S.FilterLabel>
            <p>보상방식 : {filter.paymentType === "CACHE" ? "현금" : "물품"}</p>
            <button onClick={() => closeLabel("paymentType")}>
              <CloseIcon />
            </button>
          </S.FilterLabel>
        </>
      )}
      {filter.minPay !== "" && (
        <S.FilterLabel>
          <p>
            보상금액 : {filter.minPay === "9999" && "1만원 미만"}
            {filter.minPay === "10000" && "1만원 이상"}
            {filter.minPay === "30000" && "3만원 이상"}
            {filter.minPay === "50000" && "5만원 이상"}
          </p>
          <button onClick={() => closeLabel("minPay")}>
            <CloseIcon />
          </button>
        </S.FilterLabel>
      )}
      {filter.doTime.value !== "" && (
        <S.FilterLabel>
          <p>소요시간 : {filter.doTime.name}</p>
          <button onClick={() => closeLabel("doTime")}>
            <CloseIcon />
          </button>
        </S.FilterLabel>
      )}
      {(filter.startAndEnd[0] !== 0 || filter.startAndEnd[1] !== 24) && (
        <S.FilterLabel>
          <p>
            시작시간 : {filter.startAndEnd[0]}시 - {filter.startAndEnd[1]}시
          </p>
          <button onClick={() => closeLabel("startAndEnd")}>
            <CloseIcon />
          </button>
        </S.FilterLabel>
      )}
      {category.category !== "ALL" && (
        <S.FilterLabel>
          <p>{category.category}</p>
          <button onClick={() => closeLabel("category")}>
            <CloseIcon />
          </button>
        </S.FilterLabel>
      )}
    </S.FilterLabelBox>
  );
}
