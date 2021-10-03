import React from "react";
import { useState } from "react";
import {
  doJoinApi,
  doNotJoinApi,
  deleteCancelApi,
  reviewOneReadApi,
} from "../../../../utils";
import ReviewModal from "../../ReviewModal";
import * as S from "../style";

export default function ProfileFeed({
  state,
  allow,
  finish,
  feedInfo,
  getJoinlist,
  getCancellist,
  getFinishlist,
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
              <FinishFeedBlock
                key={feedInfo.reviewId}
                getFinishlist={getFinishlist}
                feedInfo={feedInfo}
              />
            ) : (
              <CancelFeedBlock
                key={feedInfo.id}
                getCancellist={getCancellist}
                feedInfo={feedInfo}
              />
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
        console.log(res);
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
        <p> {feedInfo.doDate} /</p>
        <p>실험실 번호 </p>
        <p> {feedInfo.contact}</p>
      </S.FeedDateNum>
      <S.FeedTimeCheck>
        <p>실험시간 </p>
        <p>
          {feedInfo.startTime}~{feedInfo.endTime} /
        </p>
        <p> 조건 유무 </p>
        <p> {feedInfo.recruitCondition ? "있음" : "없음"}</p>
      </S.FeedTimeCheck>
      {allow ? (
        <S.BtnCont>
          <S.FeedBtn
            onClick={async () => {
              setModalSwitch(true);
            }}
          >
            <p>참여완료</p>
          </S.FeedBtn>
          {modalSwitch ? (
            <ReviewModal
              doJoin={doJoin}
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
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modalSwitch2, setModalSwitch2] = useState(false);
  const [postInfo, setPostInfo] = useState({});
  const editReview = async () => {
    await reviewOneReadApi(feedInfo.reviewId).then((res) =>
      setPostInfo(res.data)
    );
    setModalSwitch(true);
  };
  const newReview = async () => {
    setPostInfo({
      id: feedInfo.postId,
      postTitle: feedInfo.title,
      content: "",
      doDate: feedInfo.doDate,
      startTime: feedInfo.startTime,
      endTime: feedInfo.endTime,
      postDoDateId: feedInfo.postDoDateId,
      time: feedInfo.time,
    });
    setModalSwitch2(true);
  };
  return (
    <>
      {modalSwitch ? (
        <ReviewModal
          setModalSwitch={setModalSwitch}
          state="EDIT"
          postInfo={postInfo}
        />
      ) : null}
      {modalSwitch2 ? (
        <ReviewModal
          setModalSwitch={setModalSwitch2}
          state="NEW"
          postInfo={postInfo}
        />
      ) : null}
      <S.Over>
        <p>{feedInfo.review}</p>
      </S.Over>
      {feedInfo.reviewId === null ? (
        <S.FeedBtn
          onClick={async (e) => {
            e.preventDefault();
            await newReview();
          }}
        >
          <p>후기작성</p>
        </S.FeedBtn>
      ) : feedInfo.isWritable ? (
        <S.FeedBtn
          onClick={async (e) => {
            e.preventDefault();
            await editReview();
          }}
        >
          <p>후기수정</p>
        </S.FeedBtn>
      ) : null}
    </>
  );
}

function CancelFeedBlock({ feedInfo, getCancellist }) {
  const doDelete = async () => {
    await deleteCancelApi(feedInfo.id)
      .then(async () => {
        window.alert("반려 게시물이 삭제되었습니다");
        await getCancellist();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <S.Over>
        <p>반려사유</p>
        <p>{feedInfo.rejectComment}</p>
      </S.Over>
      <S.FeedBtn
        onClick={async (e) => {
          e.preventDefault();
          await doDelete();
        }}
      >
        <p>삭제하기</p>
      </S.FeedBtn>
    </>
  );
}
