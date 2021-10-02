import React, { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { applyState } from "../../../../recoil/applyState";
import Portal from "../Portal";
import PropTypes from "prop-types";

import * as S from "./style";
import { applyApi } from "../../../../utils/feedApi";
import { userState } from "../../../../recoil/userState";

ApplyConfirmModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
};

export default function ApplyConfirmModal({ setModalSwitch }) {
  const apply = useRecoilValue(applyState);
  const user = useRecoilValue(userState);
  const history = useHistory();
  const [completedApply, setCompletedApply] = useState(false);

  const applyForPost = async (feedId, postDoDateId) => {
    applyApi(feedId, postDoDateId)
      .then((res) => {
        setCompletedApply(true);
      })
      .catch((err) => {
        alert(err);
        //   신청한 실험일 때, 날짜를 고르지 않았을 때 에러 추가해야함
      });
  };

  const closeModal = () => {
    setModalSwitch(false);
  };
  const clickYes = () => {
    applyForPost(apply["postId"], apply["postDoDateId"]);
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          {completedApply !== true ? (
            <S.ModalContent>
              <h2>
                {apply["doDate"]} {apply["doTime"]}
              </h2>
              <h2>참여 신청을 하시겠습니까?</h2>
              <button onClick={closeModal}>아니오</button>
              <button onClick={clickYes}>예</button>
            </S.ModalContent>
          ) : (
            <S.ModalContent>
              <h2>신청이 완료되었습니다.</h2>
              <p>검토 후 확정 알림을 보내드릴 예정입니다.</p>
              <button
                onClick={() => {
                  history.push("/");
                }}
              >
                홈으로 가기
              </button>
              <button
                onClick={() => {
                  history.push(`/user/${user.name}`);
                }}
              >
                신청내역 확인하기
              </button>
            </S.ModalContent>
          )}
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
