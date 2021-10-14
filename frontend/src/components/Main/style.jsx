import styled from "styled-components";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const BackGround = styled.div`
width: 100%;
background-color: #F9F9F9;
padding-bottom: 10rem;
`;

export const MainJumbotron = styled.div`
position: relative;
margin-top: 10rem;
width: 100%;
height: 100%;
background-color: #FFFFFF;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Jumbo = styled(MainJumbotron)`
position: relative;
width: 80rem;
height: 54rem;
left: 50%;
transform: translateX(-50%);
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 30px;
`;


const Comment = styled.p`
position: relative;
height: 200;
font-size: 64px;
font-weight: 700;
line-height: 95px;
color: #000000;
`;

export const JComment = styled(Comment)`
position: relative;
text-align: center;
`;

export const Dot = styled(JComment)`
display: inline;
text-emphasis-style: filled #0642FF;
-webkit-text-emphasis: filled #0642FF;
`;

export const MComment = styled(Comment)`
position: relative;
text-align: left;
margin-left: 400px;
margin-bottom: 100px;
`;

const Button = styled.button`
position: relative;
margin: 50px;
width: 267px;
height: 85px;
font-size: 36px;
font-weight: bold;
line-height: 130%;
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 42.5px;
`;

export const WhiteButton = styled(Button)`
position: relative;
color: #0642FF;
border: 1px solid #FFFFFF;
background: #FFFFFF;
`;

export const BlueButton = styled(Button)`
position: relative;
display: block;
color: #FFFFFF;
border: 1px solid #0642FF;
background: #0642FF;
margin-left: 400px;
`;

export const Ptag = styled.p`
position: relative;
width: 140px;
height:27px;
font-size: 18px;
color: #D7D7D7;
line-height: 27px;
text-align: center;
text-decoration: underline;
margin: 70px 0 70px 0;
 `;

export const Section = styled.div`
position: relative;
padding-top: 150px;
width: 100%;
`;

// slider
export const Container = styled.div`
  width: 80%;
  overflow: visible;
  .slick-next,
  .slick-prev {
    width: 100px !important;
    top: 50% !important;

  }
  .slick-prev{
    left: 10%;
    z-index: 1;
  }
  .slick-next{
    right: 40%;
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

export const StyledSlider = styled(Slider)`
left: 30%;
  .slick-slide {
    width: 70%;
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .slick-slide div {
    outline: none;
  }
  .slick-list div {
    position: relative;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin-bottom: 30px;
  border-radius: 39px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
`;

export const Image = styled.img`
  position: absolute;
  max-width:100%;
  max-height:100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
