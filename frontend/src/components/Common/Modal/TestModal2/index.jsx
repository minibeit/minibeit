import React from "react";
import Portal from "../Portal";
import TestSlide from "./TestSlide"
import * as S from "./style";

export default function TestModal2({ setModalSwitch, currentImg, imgs}) {
  const closeModal = () => {
    setModalSwitch(false);

  };
     
  return (
    <Portal>
      <S.ModalBackground>
        <div>
          <S.ModalBtn onClick={closeModal}>X 닫기</S.ModalBtn>
          <S.ModalBtn>다운로드</S.ModalBtn>
        </div>
        <TestSlide currentImg={currentImg} imgs={imgs}/>
      </S.ModalBackground>
    </Portal>
  );
}
