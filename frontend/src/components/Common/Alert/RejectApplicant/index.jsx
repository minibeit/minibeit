import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 정말로 반려할것인지 물어보는 알림창

export default function RejectApplicant ({setRejectAlert, RejectApply, rejectUserInfo, reason}) {
  const closeAlert = () => {
    setRejectAlert(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p><span>{rejectUserInfo.name}님</span>을<br/> 
            정말로 <span>반려</span>하시겠습니까?
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오, 관둘래요</S.GrayButton>
              <S.BlueButton onClick={()=>RejectApply(rejectUserInfo.postDoDateId, rejectUserInfo.id, reason)}>네, 반려할래요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}