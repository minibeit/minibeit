import React from "react";
import { downloadFileApi } from "../../../../utils";

import * as S from "./style";

export default function Presenter({
  currentSlide,
  slideRef,
  setSliderSwitch,
  currentImg,
  files,
  prevSlide,
  nextSlide,
}) {
  const modalOff = () => {
    setSliderSwitch(false);
  };

  return (
    <>
      <div>
        <S.ModalBtn onClick={modalOff}>X 닫기</S.ModalBtn>
        <S.ModalBtn
          onClick={() => {
            downloadFileApi(files[currentSlide].name).then((res) => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", files[currentSlide].name);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
          }}
        >
          다운로드
        </S.ModalBtn>
      </div>
      <S.Container>
        {currentImg}
        <p>
          {currentSlide + 1}/{files.length}
        </p>
        <S.SliderContainer ref={slideRef}>
          {files.map(function (a, i) {
            return (
              <S.ImgContainer key={i}>
                <S.Image src={a.url} />
              </S.ImgContainer>
            );
          })}
        </S.SliderContainer>
      </S.Container>
      <S.ButtonContainer>
        <S.PrevButton onClick={(e) => prevSlide(e)}>
          <S.PrevIcon />
        </S.PrevButton>
        <S.NextButton onClick={(e) => nextSlide(e)}>
          <S.NextIcon />
        </S.NextButton>
      </S.ButtonContainer>
    </>
  );
}
