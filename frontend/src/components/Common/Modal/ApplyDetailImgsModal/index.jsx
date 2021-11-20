import React, { useState, useRef, useEffect } from "react";
import Portal from "../Portal";

import Presenter from './presenter'
import * as S from "./style";

export default function ApplyImgsModal({ setModalSwitch, currentImg, files}) {
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
    <Portal>
      <S.ModalBackground>
        <Presenter
        currentSlide={currentSlide}
        slideRef={slideRef}
        setModalSwitch={setModalSwitch}
        currentImg={currentImg}
        files={files}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        />
      </S.ModalBackground>
    </Portal>
  );
}
