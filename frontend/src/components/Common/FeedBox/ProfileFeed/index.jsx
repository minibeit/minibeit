import React from "react";
import * as S from "../style";

export default function ProfileFeed({ state, allow, finish, feedInfo }) {
  return (
    <>
      <S.FeedTag></S.FeedTag>
      <S.FeedCont>
        <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
        <S.FeedContent>
          {state === "Join" ? (
            <JoinFeedBlock feedInfo={feedInfo} allow={allow} />
          ) : state === "finish" ? (
            finish ? (
              <FinishFeedBlock feedInfo={feedInfo} />
            ) : (
              <CancelFeedBlock feedInfo={feedInfo} />
            )
          ) : null}
        </S.FeedContent>
      </S.FeedCont>
    </>
  );
}
function JoinFeedBlock({ feedInfo, allow }) {
  return (
    <>
      <S.FeedDateNum>
        실험날짜 {feedInfo.doDate}/실험실 번호 {feedInfo.contact}
      </S.FeedDateNum>
      <S.FeedTimeCheck>
        실험시간 {feedInfo.startTime}~{feedInfo.endTime}/ 조건 유무{" "}
        {feedInfo.recruitCondition ? "있음" : "없음"}
      </S.FeedTimeCheck>
      {allow ? (
        <S.BtnCont>
          <S.FeedBtn>참여완료</S.FeedBtn>
          <S.FeedBtn>참여취소</S.FeedBtn>
        </S.BtnCont>
      ) : (
        <S.FeedBtn>참여취소</S.FeedBtn>
      )}
    </>
  );
}

function FinishFeedBlock({ feedInfo }) {
  return (
    <>
      <S.Over></S.Over>
      <S.FeedBtn>후기수정</S.FeedBtn>
    </>
  );
}

function CancelFeedBlock({ feedInfo }) {
  return (
    <>
      <S.Over></S.Over>
      <S.FeedBtn>삭제하기</S.FeedBtn>
    </>
  );
}
