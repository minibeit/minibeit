import React from "react";
import { useState } from "react";
import { reviewOneReadApi } from "../../../../utils";
import ReviewModal from "../../ReviewModal";
import * as S from "../style";

export default function BProfileFeed({ state, feedInfo }) {
  return (
    <>
      <S.FeedTag></S.FeedTag>
      <S.FeedCont>
        <S.FeedContent>
          {state === "new" ? (
            <NewFeedBlock feedInfo={feedInfo} />
          ) : state === "review" ? (
            <ReviewFeedBlock feedInfo={feedInfo} />
          ) : state === "finish" ? (
            <FinishFeedBlock feedInfo={feedInfo} />
          ) : null}
        </S.FeedContent>
      </S.FeedCont>
    </>
  );
}
function NewFeedBlock({ feedInfo }) {
  return (
    <>
      <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
      <S.FeedBookmarkCont>
        <div>star</div>
        <S.FeedBookmark>{feedInfo.likes}</S.FeedBookmark>
      </S.FeedBookmarkCont>
      <S.FeedBtn>글내리기</S.FeedBtn>
    </>
  );
}
function ReviewFeedBlock({ feedInfo }) {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const readReview = async (businessProfileReviewId) => {
    await reviewOneReadApi(businessProfileReviewId)
      .then(async (res) => setPostInfo(res.data))
      .then(() => setModalSwitch(true))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.FeedTitle>{feedInfo.postTitle}</S.FeedTitle>
      <S.FeedDateNum>
        실험날짜 {feedInfo.doDate}/실험시간 {feedInfo.startTime}~
        {feedInfo.endTime}
      </S.FeedDateNum>
      <S.Review>{feedInfo.content}</S.Review>
      <S.FeedBtn
        onClick={async () => {
          await readReview(feedInfo.id);
        }}
      >
        더보기
      </S.FeedBtn>
      {modalSwitch ? (
        <ReviewModal
          setModalSwitch={setModalSwitch}
          state="READ"
          postInfo={postInfo}
        />
      ) : null}
    </>
  );
}

function FinishFeedBlock({ feedInfo }) {
  return (
    <>
      <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
      <S.FeedBookmarkCont>
        <div>star</div>
        <S.FeedBookmark>{feedInfo.likes}</S.FeedBookmark>
      </S.FeedBookmarkCont>
      <S.FeedBtn>삭제하기</S.FeedBtn>
    </>
  );
}
