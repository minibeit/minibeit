import React from "react";
import * as S from "../style";

export default function ProfileFeed({ allow, finish, complete, feedInfo }) {
  return (
    <>
      <S.FeedTag></S.FeedTag>
      <S.FeedCont>
        <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
        <S.FeedContent>
          {finish ? (
            complete ? (
              <>
                <S.Over></S.Over>
                <S.FeedBtn>후기수정</S.FeedBtn>
              </>
            ) : (
              <>
                <S.Over></S.Over>
                <S.FeedBtn>삭제하기</S.FeedBtn>
              </>
            )
          ) : (
            <>
              <S.Notyet>
                <S.FeedDateNum>
                  실험날짜 {feedInfo.doDate}/실험실 번호 {feedInfo.contact}
                </S.FeedDateNum>
                <S.FeedTimeCheck>
                  실험시간 {feedInfo.startTime}~{feedInfo.endTime}/ 조건 유무{" "}
                  {feedInfo.recruitCondition ? "있음" : "없음"}
                </S.FeedTimeCheck>
              </S.Notyet>
              {allow ? (
                <S.BtnCont>
                  <S.FeedBtn>참여완료</S.FeedBtn>
                  <S.FeedBtn>참여취소</S.FeedBtn>
                </S.BtnCont>
              ) : (
                <S.FeedBtn>참여취소</S.FeedBtn>
              )}
            </>
          )}
        </S.FeedContent>
      </S.FeedCont>
    </>
  );
}
