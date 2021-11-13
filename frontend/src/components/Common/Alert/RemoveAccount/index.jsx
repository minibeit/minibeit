import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 탈퇴하기

export default function RemoveAccount({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>회원이 아니면 사람들을 모집 할 수 없고,<br/> 
            다양한 구인 공고에 참여할 수 없어요.<br/>
            <span>정말로 탈퇴하시겠어요?</span>
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오, 관둘래요</S.GrayButton>
              <S.BlueButton>네, 탈퇴할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}