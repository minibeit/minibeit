import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// 현재 모집중인 실험이 있는데 비즈니스 프로필을 삭제할때를 알려주는 알림창

export default function Recruting({setDeleteAlert}) {
  const closeAlert = () => {
    setDeleteAlert(0);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40 , color: "#0642FF"}} />
            <p>현재 모집중인 실험이 있습니다.</p>
            <p>글내리기를 눌러 게시글을 삭제하거나<br/>
            비즈니스 프로필의 관리자를 바꾼 뒤 다시 진행해주세요.</p>
            <button onClick={closeAlert}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}