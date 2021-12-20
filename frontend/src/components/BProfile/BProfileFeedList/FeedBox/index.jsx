import React, { useState } from "react";
import moment from "moment";
import { ReactComponent as StarIcon } from "../../../../svg/별.svg";
import { useHistory } from "react-router";

import * as S from "../../style";
import { feedDeleteApi } from "../../../../utils";
import FeedCloseModal from "../FeedCloseModal";
import BManageModal from "../BManageModal";
import EndRecruting from "../../../Common/Alert/EndRecruting";
import EndSchedule from "../../../Common/Alert/EndSchedule";
import AskEndSchedule from "../../../Common/Alert/AskEndSchedule";
import { toast } from "react-toastify";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [manageModal, setManageModal] = useState(false);
  const [closeModal, setCloseModal] = useState(0);
  const [endAlert, setEndAlert] = useState(0);

  const deleteFeed = async (id) => {
    await feedDeleteApi(id)
      .then(() => {
        setEndAlert(2);
        // changeFeedData("완료된 모집공고");
      })
      .catch(() => {
        toast.error(
          "삭제할 수 없는 게시물입니다. 확정자가 있는지 확인해주세요."
        );
        setEndAlert(0);
      });
  };
  return (
    <>
      <S.FeedBox
        onClick={() => history.push(`/apply/${data.id}`)}
        status={status}
        postStatus={data.postStatus}
      >
        <S.FeedLabel status={status}>
          {status === "생성한 모집공고" && "모집중"}
          {status === "완료된 모집공고" && "모집완료"}
        </S.FeedLabel>
        <S.FeedImgView thumbnail={data.thumbnail}>
          <S.FeedTitle>
            <div>
              <StarIcon /> {data.likes}
            </div>
            <p>{data.title}</p>
            <p>{data.businessName}</p>
            <p>
              {data.address &&
                data.address.split(" ")[0] + " " + data.address.split(" ")[1]}
            </p>
          </S.FeedTitle>
        </S.FeedImgView>
        <S.FeedContentView>
          <div>
            <p>날짜</p>
            <p>
              {moment(data.startDate).format("YYYY.MM.DD (dd)")}-
              {moment(data.endDate).format("YYYY.MM.DD (dd)")}
            </p>
          </div>
          <div>
            <p>총 모집 인원</p>
            <p>{data.headcount} 명</p>
          </div>
          <div>
            {status === "생성한 모집공고" && (
              <>
                <S.BlueButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setManageModal(true);
                  }}
                >
                  참여자 관리
                </S.BlueButton>
                <S.WhiteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setCloseModal(1);
                  }}
                >
                  모집 종료
                </S.WhiteButton>
              </>
            )}
            {status === "완료된 모집공고" && (
              <S.WhiteButton
                onClick={(e) => {
                  e.stopPropagation();
                  setEndAlert(1);
                }}
              >
                일정 종료
              </S.WhiteButton>
            )}
          </div>
        </S.FeedContentView>
      </S.FeedBox>
      {manageModal && (
        <BManageModal feedData={data} setModalSwitch={setManageModal} />
      )}
      {closeModal === 1 && (
        <FeedCloseModal
          postId={data.id}
          closeModal={closeModal}
          changeFeedData={changeFeedData}
          setCloseModal={setCloseModal}
        />
      )}
      {closeModal === 2 && (
        <EndRecruting
          changeFeedData={changeFeedData}
          setCloseModal={setCloseModal}
        />
      )}
      {endAlert === 1 && (
        <AskEndSchedule
          setEndAlert={setEndAlert}
          deleteFeed={deleteFeed}
          data={data}
        />
      )}
      {endAlert === 2 && (
        <EndSchedule
          setEndAlert={setEndAlert}
          changeFeedData={changeFeedData}
        />
      )}
    </>
  );
}
