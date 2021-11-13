import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// 날짜가 겹쳤음을 알려주는 알림창

export default function DuplicateDate({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>겹치는 날짜는 선택이 불가합니다.</p>
            <p>그룹을 변경해주세요.</p>
            <button onClick={closeAlert}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}