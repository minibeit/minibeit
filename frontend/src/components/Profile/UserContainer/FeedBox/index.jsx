import React, { useState } from "react";
import { useHistory } from "react-router";

import { deleteRejectedApi, doJoinApi, doNotJoinApi } from "../../../../utils";
import CreateReviewModal from "../CreateReviewModal";

import * as S from "../../style";
import moment from "moment";
import CancleAttend from "../../../Common/Alert/CancleAttend";
import DeleteRejectList from "../../../Common/Alert/DeleteRejectList";
import toast from "react-hot-toast";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [reviewModal, setReviewModal] = useState(false);
  const [cancleAttend, setCancleAttend] = useState(false);
  const [deleteRejectList, setDeleteRejectList] = useState(false);

  return (
    <>
      <S.FeedBox
        onClick={() => history.push(`/apply/${data.id}`)}
        status={status}
        postStatus={data.postStatus}
      >
        <S.FeedLabel status={status} postStatus={data.postStatus}>
          {status === "approve" && "참여 확정"}
          {status === "wait" && "참여 대기"}
          {status === "complete" && "참여 완료"}
          {status === "reject" && "참여 반려"}
        </S.FeedLabel>
        <S.FeedImgView thumbnail={data.thumbnail}>
          <div>
            <S.FeedTitle>
              <p>{data.title}</p>
              <p>
                {status !== "reject"
                  ? data.businessProfile && data.businessProfile.name
                  : data.businessName}
              </p>
              <p>
                {data.address &&
                  data.address.split(" ")[0] + " " + data.address.split(" ")[1]}
              </p>
            </S.FeedTitle>
          </div>
        </S.FeedImgView>
        <S.FeedContentView>
          <div>
            {status === "reject" ? (
              <S.RejectTag>
                <p>반려사유</p>
                <p>{data.rejectComment}</p>
              </S.RejectTag>
            ) : (
              <>
                <S.RecruitTag recruit={data.recruitCondition}>
                  참여조건 {data.recruitCondition ? "있음" : "없음"}
                </S.RecruitTag>
                <S.Tag>{data.category}</S.Tag>
              </>
            )}
          </div>
          <div>
            <S.InfoTable>
              <tbody>
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
              </tbody>
            </S.InfoTable>
            <S.InfoTabelForMobile>
              <div>
                <p>날짜</p>
                <p>{moment(data.doDate).format("YYYY.MM.DD (dd)")}</p>
              </div>
              <div>
                <p>번호</p>
                <p>{data.contact}</p>
              </div>
              <div>
                <p>시간</p>
                <p>
                  {data.startTime}-{data.endTime}
                </p>
              </div>
            </S.InfoTabelForMobile>
          </div>
          <div>
            {status === "approve" && (
              <>
                <S.BlueButton
                  disabled={!data.finish}
                  onClick={(e) => {
                    e.stopPropagation();
                    doJoinApi(data.postDoDateId).then(() => {
                      toast.success("참여완료 처리되었습니다");
                      if (data.isWritable) {
                        setReviewModal(true);
                      } else {
                        changeFeedData();
                      }
                    });
                  }}
                >
                  참여 완료
                </S.BlueButton>
                {!data.finish && (
                  <S.WhiteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCancleAttend(true);
                    }}
                  >
                    참여 취소
                  </S.WhiteButton>
                )}
              </>
            )}
            {status === "wait" && (
              <S.WhiteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setCancleAttend(true);
                }}
              >
                참여 취소
              </S.WhiteButton>
            )}
            {status === "complete" && (
              <S.WhiteButton
                disabled={!data.isWritable}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewModal(true);
                }}
                noneDisplay={!data.writeReview && !data.isWritable}
              >
                {data.writeReview ? "후기 작성 완료" : "후기 작성"}
              </S.WhiteButton>
            )}
            {status === "reject" && (
              <S.WhiteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteRejectList(true);
                }}
              >
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
      {cancleAttend && (
        <CancleAttend
          setCancleAttend={setCancleAttend}
          postDoDateId={data.postDoDateId}
          changeFeedData={changeFeedData}
        />
      )}

      {deleteRejectList && (
        <DeleteRejectList
          setDeleteRejectList={setDeleteRejectList}
          id={data.id}
          changeFeedData={changeFeedData}
          deleteRejectedApi={deleteRejectedApi}
          doNotJoinApi={doNotJoinApi}
        />
      )}
    </>
  );
}
