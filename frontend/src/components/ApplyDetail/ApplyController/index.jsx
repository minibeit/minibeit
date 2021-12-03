import React from "react";

import * as S from "../style";

export default function ApplyController({ apply, feedDetailData, checkLogin }) {
  return (
    <S.RemoteBox>
      <S.Controller>
        <p>선택한 일정</p>
        <S.ApplyData key={apply}>
          <div>
            <span>날짜 </span> {apply.doDate}
          </div>
          <div>
            <span>시간 </span> {apply.doTime}
          </div>
        </S.ApplyData>
        <S.ApplyBtnGroup>
          <button
            disabled={apply.postDoDateId ? false : true}
            onClick={checkLogin}
          >
            지원하기
          </button>
          <button>공유하기</button>
        </S.ApplyBtnGroup>
      </S.Controller>
    </S.RemoteBox>
  );
}
