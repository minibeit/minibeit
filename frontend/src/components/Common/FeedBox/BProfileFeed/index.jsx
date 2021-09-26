import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { changeState } from "../../../../recoil/changeState";
import {
  feedDeleteApi,
  reviewOneReadApi,
  stateCompleteApi,
} from "../../../../utils";
import BManageModal from "../../../BProfile/BManageModal";
import ReviewModal from "../../ReviewModal";
import * as S from "../style";

export default function BProfileFeed({ state, feedInfo, getMakelist }) {
  return (
    <>
      <S.FeedTag></S.FeedTag>
      <S.FeedCont>
        <S.FeedContent>
          {state === "new" ? (
            <NewFeedBlock feedInfo={feedInfo} getMakelist={getMakelist} />
          ) : state === "review" ? (
            <ReviewFeedBlock feedInfo={feedInfo} />
          ) : state === "finish" ? (
            <FinishFeedBlock feedInfo={feedInfo} getMakelist={getMakelist} />
          ) : null}
        </S.FeedContent>
      </S.FeedCont>
    </>
  );
}
function NewFeedBlock({ feedInfo, getMakelist }) {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [change, setChange] = useRecoilState(changeState);
  const stateComplete = async (postId) => {
    await stateCompleteApi(postId)
      .then(async () => {
        window.alert(feedInfo.title + "이 모집완료 되었습니다");
        await getMakelist();
        setChange(1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
      <S.FeedBookmarkCont>
        <div onClick={() => setModalSwitch(true)}>person</div>
        {modalSwitch ? (
          <BManageModal
            postId={feedInfo.id}
            title={feedInfo.title}
            setModalSwitch={setModalSwitch}
          />
        ) : null}
        <div>star</div>
        <S.FeedBookmark>{feedInfo.likes}</S.FeedBookmark>
      </S.FeedBookmarkCont>
      <S.FeedBtn
        onClick={async (e) => {
          e.preventDefault();
          await stateComplete(feedInfo.id);
        }}
      >
        글내리기
      </S.FeedBtn>
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

function FinishFeedBlock({ feedInfo, getMakelist }) {
  const [change, setChange] = useRecoilState(changeState);
  if (change === 1) {
    getMakelist();
  }
  const postDelete = async (postId) => {
    await feedDeleteApi(postId)
      .then(() => {
        window.alert(feedInfo.title + "이 삭제되었습니다.");
        getMakelist();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.FeedTitle>{feedInfo.title}</S.FeedTitle>
      <S.FeedBookmarkCont>
        <div>star</div>
        <S.FeedBookmark>{feedInfo.likes}</S.FeedBookmark>
      </S.FeedBookmarkCont>
      <S.FeedBtn
        onClick={async (e) => {
          e.preventDefault();
          await postDelete(feedInfo.id);
        }}
      >
        삭제하기
      </S.FeedBtn>
    </>
  );
}
