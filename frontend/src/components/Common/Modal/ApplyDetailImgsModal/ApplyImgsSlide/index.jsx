import React, { useState, useRef, useEffect } from "react";
import * as S from "../style";


export default function ApplyImgsSlide({currentImg, files}) {
  const [currentSlide, setCurrentSlide] = useState(currentImg);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide+1 < files.length) { 
      setCurrentSlide(currentSlide + 1);
    } else {
      return;
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

  

  