import React, { useState } from "react";
import { useHistory } from "react-router";

import { deleteRejectedApi, doJoinApi, doNotJoinApi } from "../../../../utils";
import { toast } from "react-toastify";
import CreateReviewModal from "../CreateReviewModal";

import * as S from "../../style";
import moment from "moment";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [reviewModal, setReviewModal] = useState(false);

  const doNotJoin = (e, postDoDateId) => {
    e.stopPropagation();
    let value = window.confirm("실험 참여를 취소하시겠습니까?");
    if (value) {
      doNotJoinApi(postDoDateId)
        .then(() => {
          toast.info("실험이 참여 취소 되었습니다.");
          changeFeedData();
        })
        .catch((err) => toast.error("취소할 수 없는 실험입니다."));
    }
  };

  const doDelete = (e, postId) => {
    e.stopPropagation();
    let value = window.confirm("게시물을 리스트에서 삭제하시겠습니까?");
    if (value) {
      deleteRejectedApi(postId)
        .then(() => {
          toast.info("반려 게시물이 삭제되었습니다");
          changeFeedData();
        })
        .catch((err) => toast.error("삭제할 수 없는 실험입니다."));
    }
  };

  const doComplete = (e, postDoDateId) => {
    e.stopPropagation();
    doJoinApi(postDoDateId)
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
      </S.FeedLabel>
      <S.FeedBox
        onClick={() => history.push(`/apply/${data.id}`)}
        status={status}
        postStatus={data.postStatus}
      >
        <S.FeedImgView>
          <img alt="썸네일" src="/images/기본프로필.png" />
          <S.FeedTitle>
            <p>{data.title}</p>
            <p>
              {status !== "reject"
                ? data.businessProfile && data.businessProfile.name
                : data.businessName}
            </p>
            <p>
              {data.address.split(" ")[0] + " " + data.address.split(" ")[1]}
            </p>
          </S.FeedTitle>
        </S.FeedImgView>
        <S.FeedContentView>
          <div>
            <S.RecruitTag recruit={data.recruitCondition}>
              참여조건 {data.recruitCondition ? "있음" : "없음"}
            </S.RecruitTag>
            <S.Tag>{data.category}</S.Tag>
          </div>
          <div>
            <S.InfoTable>
              <tr>
                <td>날짜</td>
                <td>{moment(data.doDate).format("YYYY.MM.DD (dd)")}</td>
                <td>번호</td>
                <td>{data.contact}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>시간</td>
                <td>
                  {data.startTime}-{data.endTime}
                </td>
              </tr>
            </S.InfoTable>
          </div>
          <div>
            {status === "approve" && (
              <>
                <S.BlueButton onClick={(e) => doComplete(e, data.postDoDateId)}>
                  참여 완료
                </S.BlueButton>
                <S.WhiteButton onClick={(e) => doNotJoin(e, data.postDoDateId)}>
                  참여 취소
                </S.WhiteButton>
              </>
            )}
            {status === "wait" && (
              <S.WhiteButton onClick={(e) => doNotJoin(e, data.postDoDateId)}>
                참여 취소
              </S.WhiteButton>
            )}
            {status === "complete" && (
              <S.WhiteButton onClick={(e) => doComplete(e, data.postDoDateId)}>
                후기 작성
              </S.WhiteButton>
            )}
            {status === "reject" && (
              <S.WhiteButton onClick={(e) => doDelete(e, data.id)}>
                삭제하기
              </S.WhiteButton>
            )}
          </div>
        </S.FeedContentView>
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
