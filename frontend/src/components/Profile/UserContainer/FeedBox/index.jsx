import React, { useState } from "react";
import { useHistory } from "react-router";

import { deleteCancelApi, doJoinApi, doNotJoinApi } from "../../../../utils";

import CreateReviewModal from "../CreateReviewModal";

import * as S from "../../style";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [reviewModal, setReviewModal] = useState(false);

  const doNotJoin = (e, id) => {
    e.stopPropagation();
    let value = window.confirm("실험 참여를 취소하시겠습니까?");
    if (value) {
      doNotJoinApi(id)
        .then(() => {
          alert("실험이 참여 취소 되었습니다.");
          changeFeedData();
        })
        .catch((err) => alert("취소할 수 없는 실험입니다."));
    }
  };

  const doDelete = (e, id) => {
    e.stopPropagation();
    let value = window.confirm("게시물을 리스트에서 삭제하시겠습니까?");
    if (value) {
      deleteCancelApi(id)
        .then(() => {
          alert("반려 게시물이 삭제되었습니다");
          changeFeedData();
        })
        .catch((err) => alert("삭제할 수 없는 실험입니다."));
    }
  };

  const doComplete = (e, id) => {
    e.stopPropagation();
    doJoinApi(id)
      .then(() => setReviewModal(true))
      .then(() => changeFeedData())
      .catch((err) => alert("완료할 수 없는 실험입니다."));
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
      <S.FeedBox
        onClick={() => history.push(`/apply/${data.id}`)}
        status={status}
        postStatus={data.postStatus}
      >
        <div>
          <img alt="썸네일" src="/images/기본프로필.png" />
          <div>
            <S.FeedTitle>
              <p>게시글 제목</p>
              <p>{data.title}</p>
              <p>클모이랩</p>
              <p>서울시 마포구</p>
            </S.FeedTitle>
          </div>
        </div>
        <div>
          <S.FeedContentBox>
            {status === "approve" && (
              <>
                <S.FeedInfo condition={data.recruitCondition}>
                  <div>
                    <div>
                      실험날짜 <span>{data.doDate}</span>
                    </div>
                    <div>
                      번호 <span>{data.contact}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      실험시간
                      <span>
                        {data.startTime}~{data.endTime}
                      </span>
                    </div>
                    <div>
                      <span>
                        {data.recruitCondition
                          ? "참여조건있음"
                          : "참여조건없음"}
                      </span>
                    </div>
                  </div>
                </S.FeedInfo>
                <S.FeedButton>
                  <S.BlueBtn
                    disabled={
                      new Date() < new Date(`${data.doDate}T${data.endTime}`)
                    }
                    onClick={(e) => doComplete(e, data.postDoDateId)}
                  >
                    참여 완료
                  </S.BlueBtn>
                  <S.WhiteBtn onClick={(e) => doNotJoin(e, data.postDoDateId)}>
                    참여 취소
                  </S.WhiteBtn>
                </S.FeedButton>
              </>
            )}
            {status === "wait" && (
              <>
                <S.FeedInfo condition={data.recruitCondition}>
                  <div>
                    <div>
                      실험날짜 <span>{data.doDate}</span>
                    </div>
                    <div>
                      번호 <span>{data.contact}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      실험시간
                      <span>
                        {data.startTime}~{data.endTime}
                      </span>
                    </div>
                    <div>
                      <span>
                        {data.recruitCondition
                          ? "참여조건있음"
                          : "참여조건없음"}
                      </span>
                    </div>
                  </div>
                </S.FeedInfo>
                <S.FeedButton>
                  <S.WhiteBtn onClick={(e) => doNotJoin(e, data.postDoDateId)}>
                    참여 취소
                  </S.WhiteBtn>
                </S.FeedButton>
              </>
            )}
            {status === "complete" && (
              <>
                <S.FeedInfo>
                  <div>
                    <div>
                      <span>
                        {/* {data.review !== null
                          ? data.review
                          : "실험에 대한 후기를 작성해보세요!"} */}
                        실험에 대한 후기를 작성해보세요!
                      </span>
                    </div>
                  </div>
                </S.FeedInfo>
                <S.FeedButton>
                  <S.WhiteBtn
                    disabled={data.isWritable ? false : true}
                    onClick={(e) => {
                      e.stopPropagation();
                      setReviewModal(true);
                    }}
                  >
                    후기 작성
                  </S.WhiteBtn>
                </S.FeedButton>
              </>
            )}
            {status === "reject" && (
              <>
                <S.FeedInfo>
                  <div>
                    <div>
                      반려사유 : <span>{data.rejectComment}</span>
                    </div>
                  </div>
                </S.FeedInfo>
                <S.FeedButton>
                  <S.WhiteBtn onClick={(e) => doDelete(e, data.id)}>
                    삭제하기
                  </S.WhiteBtn>
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
        </div>
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
