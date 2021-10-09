import React from "react";
import Portal from "../Portal";
import * as S from "./style";

export default function ConfirmModal({ setModalSwitch }) {
  const closeModal = () => {
    setModalSwitch(false);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            {
              // 진짜 내용 부분
            }
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
