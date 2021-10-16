import React, { useRef, useCallback } from "react";
import * as S from "../style";
import Slider from "react-slick";
import '../slick.css';




const items = [
  { id: 1, url: '/img2.png' },
  { id: 2, url: '/img1.png' },
  { id: 3, url: '/img2.png' },
  { id: 4, url: '/img1.png' },
  { id: 5, url: '/img2.png' },
  { id: 6, url: '/img1.png' }
];



function PSlider () {
        const slickRef = useRef(null);

        const previous = useCallback(() => slickRef.current.slickPrev(), []);
        const next = useCallback(() => slickRef.current.slickNext(), []);

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
            {items.map(item => {
                return (
                  <div key={item.id}>
                    <S.ImageContainer>
                      <S.Image src={item.url} />
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
    
 

    export default PSlider;
