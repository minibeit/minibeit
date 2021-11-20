import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 날짜변경시 설정한 정보가 변경되는것을 알려주는

export default function DateChange ({setResetAlert, resetOk}) {
  const closeAlert = () => {
    setResetAlert(false);
  };

  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>날짜, 시간을 변경하면 시간선택 그룹이 초기화돼요!<br/> 
            <span>정말로 날짜를 변경하시겠어요?</span>
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오, 돌아갈래요</S.GrayButton>
              <S.BlueButton onClick={resetOk}>네, 날짜를 변경할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}