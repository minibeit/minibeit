import React, { useState, useRef, useEffect } from "react";
import Portal from "../Portal";
import * as S from "./style";


function TestSlider() {
  let [imgs] = useState(['/cloud.jpg', '/cloud2.jpg','/cloud.jpg', '/cloud2.jpg']);
  const TOTAL_SLIDES = imgs.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { 
      return;
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
 
  
  return (
    <>
      <S.Container>
        {currentSlide}
        <p>{currentSlide}/{TOTAL_SLIDES}</p>
        <S.SliderContainer ref={slideRef}>

         {imgs.map(function (a,i) {
          return (
           <S.ImgContainer key={i}>
           <S.Image src={a} />
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
  

export default function TestModal2({ setModalSwitch }) {
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
        <TestSlider />
      </S.ModalBackground>
    </Portal>
  );
}
