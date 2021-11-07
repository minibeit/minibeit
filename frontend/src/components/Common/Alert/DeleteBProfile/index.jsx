import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 비즈니스 프로필 삭제 확인

export default function DeliteBProfile({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>비즈니스 프로필이 없으면,<br/> 
            게시글을 통해서 모집을 할 수 없어요.<br/>
            <span>정말로 삭제하시겠어요?</span>
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오, 관둘래요</S.GrayButton>
              <S.BlueButton>네, 삭제할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}