import React from "react";
import * as S from "../style";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const items = [
  { id: 1, url: '/img1.png' },
  { id: 2, url: '/img2.png' },
  { id: 3, url: '/img1.png' },
  { id: 4, url: '/img2.png' },
  { id: 5, url: '/img1.png' },
  { id: 6, url: '/img2.png' }
];



function PSlider () {

        const settings = {
          arrows: true,
          // nextArrow: <ArrowForwardIosIcon />,
          // prevArrow: <ArrowBackIosIcon />,
          dot: false,
          infinite: false,
          centerMode: true,
          slidesToShow: 1.7,
          slidesToScroll: 1,
          speed: 500
        };


        return (
          <S.Container>
            <S.StyledSlider {...settings}>
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <S.ImageContainer>
                      <S.Image src={item.url} />
                    </S.ImageContainer>
                  </div>
                )
              })}
            </S.StyledSlider>
          </S.Container>
        );
      }
    
 

    export default PSlider;
