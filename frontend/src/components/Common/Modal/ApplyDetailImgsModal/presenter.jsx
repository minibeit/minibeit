import React from "react";

import * as S from "./style";

export default function Presenter({
  closeModal,
  currentSlide,
  slideRef,
    currentImg,
     files,
     prevSlide,
     nextSlide
    }) {

  return (
    <>
        <div>
          <S.ModalBtn onClick={closeModal}>X 닫기</S.ModalBtn>
          <S.ModalBtn>다운로드</S.ModalBtn>
        </div>
        <S.Container>
        {currentImg}
        <p>{currentSlide + 1}/{files.length}</p>
        <S.SliderContainer ref={slideRef}>

         {files.map(function (a,i) {
          return (
           <S.ImgContainer key={i}>
           <S.Image src={a.url} />
           </S.ImgContainer>
          )
        })}
        </S.SliderContainer>
      </S.Container>
      <S.ButtonContainer>
       <S.PrevButton onClick={prevSlide}><S.PrevIcon /></S.PrevButton>
       <S.NextButton onClick={nextSlide}><S.NextIcon /></S.NextButton>
      </S.ButtonContainer>
      </>
  );
}
