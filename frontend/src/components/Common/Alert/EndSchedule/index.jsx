import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// 일정이 끝났다고 알려주는 알림창

export default function EndSchedule({ data, deleteFeed}) {
  console.log(data);
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <ErrorOutlineIcon  sx={{ fontSize: 40}} />
            <p>해당 모집 공고의<br/><span>일정이 종료</span>되었어요.</p>
            <button onClick={()=>deleteFeed(data.id)}>닫기</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}