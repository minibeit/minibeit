import React from "react";
import { doJoinApi, doNotJoinApi } from "../../../../utils/profileApi";
import * as S from "../style";

export default function ProfileFeed({
  state,
  allow,
  finish,
  feedInfo,
  getJoinlist,
}) {
  return (
    <>
      <S.FeedTag></S.FeedTag>
      <S.FeedCont>
        <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
        <S.FeedContent>
          {state === "Join" ? (
            <JoinFeedBlock
              getJoinlist={getJoinlist}
              feedInfo={feedInfo}
              allow={allow}
            />
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
function JoinFeedBlock({ feedInfo, allow, getJoinlist }) {
  const doJoin = async () => {
    await doJoinApi(feedInfo.postDoDateId)
      .then(() => alert(feedInfo.title + "실험이 참여 완료 되었습니다."))
      .catch((err) => console.log(err));
  };
  const doNotJoin = async () => {
    await doNotJoinApi(feedInfo.postDoDateId)
      .then(() => {
        alert(feedInfo.title + "실험이 참여 취소 되었습니다.");
        getJoinlist();
      })
      .catch((err) => console.log(err));
  };
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
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await doJoin();
            }}
          >
            참여완료
          </S.FeedBtn>
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await doNotJoin();
            }}
          >
            참여취소
          </S.FeedBtn>
        </S.BtnCont>
      ) : (
        <S.FeedBtn
          onClick={async (e) => {
            e.preventDefault();
            await doNotJoin();
          }}
        >
          참여취소
        </S.FeedBtn>
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
