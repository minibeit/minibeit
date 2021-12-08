import React from "react";

import * as S from "../style";

export default function ApplyController({
  apply,
  feedDetailData,
  checkLogin,
  setShare,
  share,
}) {
  const payment = feedDetailData.payment === "CACHE" ? "현금" : "보상";
  const value =
    payment === "현금" ? feedDetailData.cache + "원" : feedDetailData.goods;

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
        <div>
          <div>
            <span>지급방법 </span> {payment}
          </div>
          <div>
            <span>보상금액 </span> {value}
          </div>
        </div>
        <S.ApplyBtnGroup>
          <button
            disabled={apply.postDoDateId ? false : true}
            onClick={checkLogin}
          >
            신청하기
          </button>
          <button onClick={() => setShare(!share)}>공유하기</button>
        </S.ApplyBtnGroup>
      </S.Controller>
    </S.RemoteBox>
  );
}
