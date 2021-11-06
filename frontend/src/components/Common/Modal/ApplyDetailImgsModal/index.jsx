import React from "react";
import Portal from "../Portal";
import ApplyImgsSlide from "./ApplyImgsSlide";
import * as S from "./style";

export default function ApplyImgsModal({ setModalSwitch, currentImg, files}) {
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
        <ApplyImgsSlide currentImg={currentImg} files={files}/>
      </S.ModalBackground>
    </Portal>
  );
}
