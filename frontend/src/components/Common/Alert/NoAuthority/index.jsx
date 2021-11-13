import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 게시글 삭제 권한이없음을 알려주는 알림창

export default function NoAuthority({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>회원님께서는<br/>
            삭제하실 수 있는 권한이 없습니다.</p>
            <button onClick={closeAlert}>네, 알겠어요</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}