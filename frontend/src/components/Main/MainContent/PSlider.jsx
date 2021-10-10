import React from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const Container = styled.div`
  width: 60%;
  overflow: ;
  .slick-next,
  .slick-prev {
    width: 100px !important;
    top: 50% !important;

  }
  .slick-prev{
    left: 30%;
    z-index: 1;
  }
  .slick-next{
    right: 20%;
    z-index: 1;
  }
  .slick-prev:before {
    content: '<';
    color: #6F6F6F;
    width: 101px;
    padding: 5px 16px;
    font-size: 43px;
    font-weight: 700;
  }

  .slick-next:before {
    content: '>';
    color: #6F6F6F;
    width: 101px;
    padding: 5px 16px;
    font-size: 43px;
    font-weight: 700;
  }

`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100%;
    left: 30%;
  }
  .slick-slide div {
    outline: none;
  }
  .slick-list div {
    position: relative;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 681px;
  height: 681px;
  border-radius: 39px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
`;

const Image = styled.img`
  position: absolute;
  max-width:100%;
  max-height:100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const imgUrl1 = require('./img2.png').default;
const imgUrl2 = require('./img1.png').default;

const items = [
  { id: 1, url: imgUrl1 },
  { id: 2, url: imgUrl2 },
  { id: 3, url: imgUrl1 },
  { id: 4, url: imgUrl2 },
  { id: 5, url: imgUrl1 },
  { id: 6, url: imgUrl2 }
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
          <Container>
            <StyledSlider {...settings}>
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <ImageContainer>
                      <Image src={item.url} />
                    </ImageContainer>
                  </div>
                )
              })}
            </StyledSlider>
          </Container>
        );
      }
    
 

    export default PSlider;
