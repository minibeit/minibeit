import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


// 게시글 제목이 비어있음을 알려주는 알림창
// 제목말고 다른 칸이 비었다고도 알려주게 될 수 있을것같아서 파일 이름에 제목을 넣지 않았음

export default function NotEnoughWrite({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>제목을 작성하지 않으셨습니다.</p>
            <p>제목을 작성해주세요.</p>
            <button onClick={closeAlert}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}