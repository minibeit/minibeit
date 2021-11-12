import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 실험을 정말 삭제할것인지 묻는 알림창

export default function DeleteFeed ({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p><span>코로나로 인한 대학생 우울증실험</span>을<br/> 
            정말로 <span>삭제</span>하시겠습니까?
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