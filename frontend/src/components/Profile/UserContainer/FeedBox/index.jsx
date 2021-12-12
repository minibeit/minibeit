import React, { useState } from "react";
import { useHistory } from "react-router";

import { deleteCancelApi, doJoinApi, doNotJoinApi } from "../../../../utils";
import { toast } from "react-toastify";
import CreateReviewModal from "../CreateReviewModal";

import * as S from "../../style";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [reviewModal, setReviewModal] = useState(false);

  const doNotJoin = (id) => {
    let value = window.confirm("실험 참여를 취소하시겠습니까?");
    if (value) {
      doNotJoinApi(id)
        .then(() => {
          toast.info("실험이 참여 취소 되었습니다.");
          changeFeedData();
        })
        .catch((err) => toast.error("취소할 수 없는 실험입니다."));
    }
  };

  const doDelete = (id) => {
    let value = window.confirm("게시물을 리스트에서 삭제하시겠습니까?");
    if (value) {
      deleteCancelApi(id)
        .then(() => {
          toast.info("반려 게시물이 삭제되었습니다");
          changeFeedData();
        })
        .catch((err) => toast.error("삭제할 수 없는 실험입니다."));
    }
  };

  const doComplete = (id) => {
    doJoinApi(id)
      .then(() => setReviewModal(true))
      .then(() => changeFeedData())
      .catch((err) => toast.error("완료할 수 없는 실험입니다."));
  };

  return (
    <>
      <S.FeedLabel status={status} postStatus={data.postStatus}>
        {status === "approve" && "참여확정"}
        {status === "wait" && "참여대기"}
        {status === "complete" && "참여완료"}
        {status === "reject" && "참여반려"}
        {status === "like" &&
          (data.postStatus === "RECRUIT" ? "모집중" : "모집완료")}
      </S.FeedLabel>
      <S.FeedBox status={status} postStatus={data.postStatus}>
        <S.FeedTitleBox>
          <p>게시글 제목</p>
          <p onClick={() => history.push(`/apply/${data.id}`)}>{data.title}</p>
        </S.FeedTitleBox>
        <S.FeedContentBox>
          {status === "approve" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>실험날짜 : {data.doDate}</p>
                  <p>실험실 번호 : {data.contact}</p>
                </div>
                <div>
                  <p>
                    실험시간 : {data.startTime}~{data.endTime}
                  </p>
                  <p>조건 : {data.recruitCondition ? "있음" : "없음"}</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button
                  disabled={
                    new Date() < new Date(`${data.doDate}T${data.endTime}`)
                  }
                  onClick={() => doComplete(data.postDoDateId)}
                >
                  참여 완료
                </button>
                <button onClick={() => doNotJoin(data.postDoDateId)}>
                  참여 취소
                </button>
              </S.FeedButton>
            </>
          )}
          {status === "wait" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>실험날짜 : {data.doDate}</p>
                  <p>실험실 번호 : {data.contact}</p>
                </div>
                <div>
                  <p>
                    실험시간 : {data.startTime}~{data.endTime}
                  </p>
                  <p>조건 : {data.recruitCondition ? "있음" : "없음"}</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button onClick={() => doNotJoin(data.postDoDateId)}>
                  참여 취소
                </button>
              </S.FeedButton>
            </>
          )}
          {status === "complete" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>{data.review}</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button
                  disabled={data.isWritable ? false : true}
                  onClick={() => setReviewModal(true)}
                >
                  후기 작성
                </button>
              </S.FeedButton>
            </>
          )}
          {status === "reject" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>반려사유 : {data.rejectComment}</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button onClick={() => doDelete(data.id)}>삭제하기</button>
              </S.FeedButton>
            </>
          )}
          {status === "like" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>장소 : {data.place && data.place.substring(0, 15)}...</p>
                  <p>소요시간 : {data.doTime}분</p>
                </div>
                <div>
                  <p>
                    보상 :
                    {data.payment === "CACHE"
                      ? ` 현금 ${data.cache}원`
                      : " 물품"}
                  </p>
                  <p>조건 : {data.recruitCondition ? "있음" : "없음"}</p>
                </div>
              </S.FeedInfo>
            </>
          )}
        </S.FeedContentBox>
      </S.FeedBox>
      {reviewModal && (
        <CreateReviewModal
          data={data}
          changeFeedData={changeFeedData}
          setModalSwitch={setReviewModal}
        />
      )}
    </>
  );
}
