import React from "react";

import * as S from "../style";

export default function ApplyController({ apply, feedDetailData, checkLogin }) {
  const payment = feedDetailData.payment === "CACHE" ? "현금" : "보상";
  const value =
    payment === "현금" ? feedDetailData.cache + "원" : feedDetailData.goods;

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다. 원하는곳에서 붙여넣기 해주세요!");
    } catch (error) {
      alert("복사 실패!");
    }
  };

  const num = Math.floor(Math.random() * 10) + 1;

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
          <S.ViewNum>
            이 페이지를 <span>{num}</span>명이 보고 있습니다.
          </S.ViewNum>
          <button
            disabled={apply.postDoDateId ? false : true}
            onClick={checkLogin}
          >
            신청하기
          </button>
          <button onClick={() => handleCopyClipBoard(window.location.href)}>
            공유하기
          </button>
        </S.ApplyBtnGroup>
      </S.Controller>
    </S.RemoteBox>
  );
}
