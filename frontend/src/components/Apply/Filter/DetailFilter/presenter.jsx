import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as FilterIcon } from "../../../../svg/필터.svg";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import * as S from "../../style";

export default function Presenter({
  filterReset,
  paymentType,
  changePayType,
  changeFilter,
  minPay,
  setFilter,
  data,
}) {
  const history = useHistory();
  const [filterSwitch, setFilterSwitch] = useState(false);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setFilterSwitch(false);
      }}
    >
      <div>
        <S.FilterBtn onClick={() => setFilterSwitch(true)}>
          <FilterIcon />
          상세필터
        </S.FilterBtn>
        {filterSwitch && (
          <S.FilterBox>
            <div
              onClick={() => {
                filterReset();
                setFilterSwitch(false);
              }}
            >
              <CloseIcon />
            </div>
            <div>
              <S.DetailBox>
                <p>지급방식</p>
                <div>
                  {paymentType.map((a, i) => {
                    return (
                      <S.PaymentBtn
                        key={i}
                        name="paymentType"
                        value={a.value}
                        disabled={
                          data["paymentType"] === a.value ? true : false
                        }
                        onClick={changePayType}
                      >
                        {a.name}
                      </S.PaymentBtn>
                    );
                  })}
                </div>
              </S.DetailBox>
              <CSSTransition
                in={data["paymentType"] === "CACHE"}
                classNames="fade"
                timeout={500}
                unmountOnExit
              >
                <S.DetailBox>
                  <p>보상금액</p>
                  <div>
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
                  </div>
                </S.DetailBox>
              </CSSTransition>
              <S.FilterResetBtn
                onClick={() => {
                  filterReset();
                  setFilterSwitch(false);
                  history.push("/apply?1");
                }}
              >
                모든 선택 초기화하기
              </S.FilterResetBtn>
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
        )}
      </div>
    </ClickAwayListener>
  );
}
