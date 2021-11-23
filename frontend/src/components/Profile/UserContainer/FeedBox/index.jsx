import React from "react";
import { Link } from "react-router-dom";
import { deleteCancelApi, doJoinApi, doNotJoinApi } from "../../../../utils";

import * as S from "../../style";

export default function FeedBox({ status, data, changeFeedData }) {
  const doNotJoin = (id) => {
    let value = window.confirm("실험 참여를 취소하시겠습니까?");
    if (value) {
      doNotJoinApi(id)
        .then(() => {
          alert("실험이 참여 취소 되었습니다.");
          changeFeedData("대기중");
        })
        .catch((err) => alert("취소할 수 없는 실험입니다."));
    }
  };

  const doDelete = (id) => {
    let value = window.confirm("게시물을 리스트에서 삭제하시겠습니까?");
    if (value) {
      deleteCancelApi(id)
        .then(() => {
          alert("반려 게시물이 삭제되었습니다");
          changeFeedData("반려");
        })
        .catch((err) => alert("삭제할 수 없는 실험입니다."));
    }
  };

  const doComplete = (id) => {
    let value = window.confirm("실험 참여를 완료 처리하시겠습니까?");
    if (value) {
      doJoinApi(id)
        .then(() => {
          alert("참여가 완료 되었습니다");
          changeFeedData("확정");
        })
        .catch((err) => alert("완료할 수 없는 실험입니다."));
    }
  };

  return (
    <>
      <S.FeedLabel>
        {status === "확정" && "참여확정"}
        {status === "대기중" && "참여대기"}
        {status === "완료" && "참여완료"}
        {status === "반려" && "참여반려"}
        {status === "즐겨찾기" &&
          (data.postStatus === "RECRUIT" ? "모집중" : "모집완료")}
      </S.FeedLabel>
      <S.FeedBox>
        <S.FeedTitleBox>
          <p>게시글 제목</p>
          <Link to={`/apply/${data.id}`}>
            <p>{data.title}</p>
          </Link>
        </S.FeedTitleBox>
        <S.FeedContentBox>
          {status === "확정" && (
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
                <button onClick={() => doComplete(data.postDoDateId)}>
                  참여 완료
                </button>
                <button onClick={() => doNotJoin(data.postDoDateId)}>
                  참여 취소
                </button>
              </S.FeedButton>
            </>
          )}
          {status === "대기중" && (
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
          {status === "완료" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>{data.review}</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton></S.FeedButton>
            </>
          )}
          {status === "반려" && (
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
          {status === "즐겨찾기" && (
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
    </>
  );
}
