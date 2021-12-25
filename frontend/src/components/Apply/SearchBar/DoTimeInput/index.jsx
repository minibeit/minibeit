import React, { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useRecoilState } from "recoil";
import { filterState } from "../../../../recoil/filterState";

import * as S from "./style";

export default function DoTimeInput() {
  const [viewSwitch, setViewSwitch] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);
  const [selectDoTime, setSelectDoTime] = useState(filter.doTime);

  const doTime = [
    { name: "전체", value: "" },
    { name: "30분 이내", value: "30" },
    { name: "1시간 이내", value: "60" },
    { name: "3시간 이내", value: "180" },
    { name: "3시간 이상", value: "181" },
  ];

  const submit = () => {
    const copy = { ...filter };
    copy.doTime = selectDoTime;
    setFilter(copy);
    setViewSwitch(false);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setViewSwitch(false);
      }}
    >
      <div>
        <S.SearchInput>
          <input
            type="text"
            readOnly
            value={filter.doTime.name}
            onClick={() => setViewSwitch(!viewSwitch)}
          />
        </S.SearchInput>
        {viewSwitch && (
          <S.Wrapper>
            <p>원하는 실험 소요시간을 선택해주세요</p>
            <S.BtnGroup>
              {doTime.map((a, i) => {
                return (
                  <S.SelectBtn
                    key={i}
                    name="doTime"
                    disabled={selectDoTime.value === a.value ? true : false}
                    onClick={() => setSelectDoTime(a)}
                  >
                    {a.name}
                  </S.SelectBtn>
                );
              })}
            </S.BtnGroup>
            <button onClick={() => submit()}>적용</button>
          </S.Wrapper>
        )}
      </div>
    </ClickAwayListener>
  );
}
