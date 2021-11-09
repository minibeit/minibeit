import React, { useState, useRef, useCallback } from "react";
import * as S from "../style";
import Slider from "react-slick";
import '../slick.css';

function MainSlide () {
        const slickRef = useRef(null);

        const previous = useCallback(() => slickRef.current.slickPrev(), []);
        const next = useCallback(() => slickRef.current.slickNext(), []);

        let [items] = useState(['/img2.png', '/img1.png', '/img2.png', '/img1.png', '/img2.png', '/img1.png']);
 

        const settings = {
          arrows: false,
          dot: false,
          infinite: false,
          centerMode: true,
          slidesToShow: 1.7,
          slidesToScroll: 1,
          speed: 500
        };

        return (
          <S.Container>
            <Slider ref={slickRef}  {...settings}>
            {items.map(function (a,i) {
                return (
                  <div key={i}>
                    <S.ImageContainer>
                      <S.Image src={a} />
                    </S.ImageContainer>
                  </div>
                )
              })}
              </Slider>

              <S.PrevButton onClick={previous}><S.PrevIcon /></S.PrevButton>
              <S.NextButton onClick={next}><S.NextIcon /></S.NextButton>
            
          </S.Container>
        );
      }
    
 

    export default MainSlide;
