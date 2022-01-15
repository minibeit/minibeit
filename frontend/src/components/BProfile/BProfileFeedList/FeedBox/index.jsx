import React, { useState } from "react";
import moment from "moment";
import { ReactComponent as StarIcon } from "../../../../svg/별.svg";
import { useHistory } from "react-router";

import * as S from "../../style";
import { feedDeleteApi } from "../../../../utils";
import FeedCloseModal from "../FeedCloseModal";
import BManageModal from "../BManageModal";
import AskEndSchedule from "../../../Common/Alert/AskEndSchedule";

export default function FeedBox({ status, data, changeFeedData }) {
  const history = useHistory();
  const [manageModal, setManageModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [endAlert, setEndAlert] = useState(false);

  return (
    <>
      <S.FeedBox
        onClick={() => history.push(`/apply/${data.id}`)}
        status={status}
        postStatus={data.postStatus}
      >
        <S.FeedLabel status={status}>
          {status === "created" && "모집중"}
          {status === "completed" && "모집완료"}
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
            {status === "created" && (
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
                    setCloseModal(true);
                  }}
                >
                  모집 종료
                </S.WhiteButton>
              </>
            )}
            {status === "completed" && (
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
                    setEndAlert(true);
                  }}
                >
                  일정 종료
                </S.WhiteButton>
              </>
            )}
          </div>
        </S.FeedContentView>
      </S.FeedBox>
      {manageModal && (
        <BManageModal feedData={data} setModalSwitch={setManageModal} />
      )}
      {closeModal && (
        <FeedCloseModal
          postId={data.id}
          closeModal={closeModal}
          changeFeedData={changeFeedData}
          setCloseModal={setCloseModal}
        />
      )}
      {endAlert && (
        <AskEndSchedule
          setEndAlert={setEndAlert}
          data={data}
          changeFeedData={changeFeedData}
          feedDeleteApi={feedDeleteApi}
        />
      )}
    </>
  );
}
