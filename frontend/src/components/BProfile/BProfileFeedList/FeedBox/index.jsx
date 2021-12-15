import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../../../../svg/별.svg";
import { useHistory } from "react-router";

import * as S from "../../style";
import { feedDeleteApi } from "../../../../utils";
import FeedCloseModal from "../FeedCloseModal";
import BManageModal from "../BManageModal";
import EndRecruting from "../../../Common/Alert/EndRecruting";
import EndSchedule from "../../../Common/Alert/EndSchedule";
import AskEndSchedule from "../../../Common/Alert/AskEndSchedule";

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
        alert("삭제할 수 없는 게시물입니다. 확정자가 있는지 확인해주세요.");
        setEndAlert(0);
      });
  };
  return (
    <>
      <S.FeedLabel status={status}>
        {status === "생성한 모집공고" && "모집중"}
        {status === "완료된 모집공고" && "모집완료"}
        {status === "후기 모아보기" && "???"}
      </S.FeedLabel>
      <S.FeedBox onClick={() => history.push(`/apply/${data.id}`)}>
        <div>
          <img alt="썸네일" src="/images/기본프로필.png" />
          <div>
            <S.FeedTitle>
              <div>
                <StarIcon />
                {data.likes}
              </div>
              <p>{data.title}</p>
              <p>클모이랩</p>
              <p>서울시 마포구</p>
            </S.FeedTitle>
          </div>
        </div>
        <S.FeedContentBox>
          {status === "생성한 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  날짜 <span>2021.08.30 ~ 2021.09.30</span>
                </div>
                <div>
                  시간 <span>12:30 ~ 12:30</span>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <S.BlueBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setManageModal(true);
                  }}
                >
                  참여자 관리
                </S.BlueBtn>
                <S.WhiteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setCloseModal(1);
                  }}
                >
                  모집종료
                </S.WhiteBtn>
              </S.FeedButton>
            </>
          )}
          {status === "완료된 모집공고" && (
            <>
              <S.FeedInfo>
                <div>
                  날짜 <span>2021.08.30 ~ 2021.09.30</span>
                </div>
                <div>
                  시간 <span>12:30 ~ 12:30</span>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <S.WhiteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setEndAlert(1);
                  }}
                >
                  일정종료
                </S.WhiteBtn>
              </S.FeedButton>
            </>
          )}
          {status === "후기 모아보기" && (
            <>
              <S.FeedInfo>
                <div>
                  <p>후기 사라지는 거 보고 바꿀 예정</p>
                </div>
              </S.FeedInfo>
              <S.FeedButton>
                <button>더보기</button>
              </S.FeedButton>
            </>
          )}
        </S.FeedContentBox>
      </S.FeedBox>
      {manageModal && (
        <BManageModal
          title={data.title}
          postId={data.id}
          setModalSwitch={setManageModal}
        />
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
