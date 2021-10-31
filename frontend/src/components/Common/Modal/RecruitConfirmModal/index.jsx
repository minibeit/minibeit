import React, { useState } from "react";
import { useHistory } from "react-router";
import Portal from "../Portal";
import PropTypes from "prop-types";

import * as S from "./style";

RecruitConfirmModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
};

export default function RecruitConfirmModal({
  setModalSwitch,
  submit,
  recruit,
}) {
  const [feedId, setFeedId] = useState();
  const history = useHistory();
  const [completedRecruit, setCompletedRecruit] = useState(false);

  const closeModal = () => {
    setModalSwitch(false);
  };
  const clickYes = () => {
    submit(recruit)
      .then((res) => {
        setFeedId(res.data.data.id);
        setCompletedRecruit(true);
      })
      // 에러처리 해야함
      .catch((err) => console.log(err));
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          {completedRecruit !== true ? (
            <S.ModalContent>
              <h2>게시물을 작성하시겠습니까?</h2>
              <p>게시물이 생성되면 상세내용 외에는 수정이 불가합니다!</p>
              <button onClick={closeModal}>아니오</button>
              <button onClick={clickYes}>예</button>
            </S.ModalContent>
          ) : (
            <S.ModalContent>
              <h2>게시물 작성이 완료되었습니다.</h2>
              <button
                onClick={() => {
                  history.push(`/apply/${feedId}`);
                }}
              >
                내가 작성한 모집 보러가기
              </button>
              <button
                onClick={() => {
                  history.push("/");
                }}
              >
                홈으로 가기
              </button>
            </S.ModalContent>
          )}
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
