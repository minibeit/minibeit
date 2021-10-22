import React, { useState, useRef, useCallback } from "react";
import Portal from "../Portal";
import * as S from "./style";
import Slider from "react-slick";

import "./slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function TestSlider() {

  const slickRef = useRef(null);
  let [imgs] = useState(['/cloud.jpg', '/cloud2.jpg','/cloud.jpg', '/cloud2.jpg', '/cloud.jpg', '/cloud2.jpg']);


  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    // centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true
  };
  return (
    <S.Container>
    <Slider {...settings} ref={slickRef}>
    {imgs.map(function (a,i) {
        return (
          <S.TestContainer key={i}>
            <S.Image src={a} />
          </S.TestContainer>
        )
      })}
      </Slider>

      <S.PrevButton onClick={previous}><S.PrevIcon /></S.PrevButton>
      <S.NextButton onClick={next}><S.NextIcon /></S.NextButton>
    
  </S.Container>
    );
  }

export default function TestModal2({ setModalSwitch }) {
  const closeModal = () => {
    setModalSwitch(false);
  };
     
  return (
    <Portal>
      <S.ModalBackground>
      <S.ModalBtn onClick={closeModal}>X 닫기</S.ModalBtn>
      <S.ModalBtn>다운로드</S.ModalBtn>
        <TestSlider />
      </S.ModalBackground>
    </Portal>
  );
}
