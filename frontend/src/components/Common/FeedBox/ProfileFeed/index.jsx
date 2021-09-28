import React from "react";
import { useState } from "react";
import { doJoinApi, doNotJoinApi } from "../../../../utils/profileApi";
import ReviewModal from "../../ReviewModal";
import * as S from "../style";

export default function ProfileFeed({
  state,
  allow,
  finish,
  feedInfo,
  getJoinlist,
  tag,
}) {
  return (
    <>
      <S.FeedTag>
        <p>{tag}</p>
      </S.FeedTag>
      <S.FeedCont>
        <S.FeedTitle>
          <p>실험명</p>
          <p>{feedInfo.title}</p>
        </S.FeedTitle>
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
  const [modalSwitch, setModalSwitch] = useState(false);
  const doJoin = async () => {
    await doJoinApi(feedInfo.postDoDateId)
      .then((res) => {
        setModalSwitch(true);
      })
      // 만일 에러뜨면 아직 실험 날짜가 오늘날짜보다 이후라서 그럼
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
  console.log(feedInfo);
  const postInfo = {
    id: feedInfo.id,
    postTitle: feedInfo.title,
    content: "",
    doDate: feedInfo.doDate,
    startTime: feedInfo.startTime,
    endTime: feedInfo.endTime,
    postDoDateId: feedInfo.postDoDateId,
    time: feedInfo.time,
  };
  return (
    <>
      <S.FeedDateNum>
        <p>실험날짜</p>
        <p> {feedInfo.doDate}</p>
        <p>/실험실 번호 </p>
        <p> {feedInfo.contact}</p>
      </S.FeedDateNum>
      <S.FeedTimeCheck>
        <p>실험시간 </p>
        <p>
          {feedInfo.startTime}~{feedInfo.endTime}
        </p>
        <p> / 조건 유무 </p>
        <p> {feedInfo.recruitCondition ? "있음" : "없음"}</p>
      </S.FeedTimeCheck>
      {allow ? (
        <S.BtnCont>
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await doJoin();
            }}
          >
            <p>참여완료</p>
          </S.FeedBtn>
          {modalSwitch ? (
            <ReviewModal
              setModalSwitch={setModalSwitch}
              state="NEW"
              postInfo={postInfo}
            />
          ) : null}
          <S.FeedBtn
            onClick={async (e) => {
              e.preventDefault();
              await doNotJoin();
            }}
          >
            <p>참여취소</p>
          </S.FeedBtn>
        </S.BtnCont>
      ) : (
        <S.FeedBtn
          onClick={async (e) => {
            e.preventDefault();
            await doNotJoin();
          }}
        >
          <p>참여취소</p>
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
