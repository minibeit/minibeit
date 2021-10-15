import styled from "styled-components";


export const BackGround = styled.div`
width: 100vw;
background-color: #F9F9F9;
padding-bottom: 10rem;
`;

export const MainJumbotron = styled.div`
position: relative;
margin-top: 30px;
width: 100vw;
height: 600px;
background-color: #FFFFFF;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-wrap: wrap;

& > p:first-child {
  position: relative;
  height: 140px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  color: #000000;
  text-align: center;
}

& > div:nth-child(2) {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

& > p:nth-child(3) {
  width: 140px;
  height:27px;
  font-size: 14px;
  color: #D7D7D7;
  line-height: 27px;
  text-align: center;
  text-decoration: underline;
  margin: 50px 0 70px 0;
}
`;

const Button = styled.button`
position: relative;
width: 150px;
height: 50px;
font-size: 25px;
font-weight: bold;
line-height: 50px;
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 42.5px;
`;

export const WhiteButton = styled(Button)`
color: #0642FF;
border: 1px solid #FFFFFF;
background: #FFFFFF;
margin-top: 30px;
`;

export const BlueButton = styled(Button)`
color: #FFFFFF;
border: 1px solid #0642FF;
background: #0642FF;
`;


export const Section = styled.div`
position: relative;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
flex-wrap: wrap;
gap: 20px;
margin: 70px 0 100px 70px;

& > button:first-child {
  margin-left: 100px;
}

& > p:nth-child(2) {
  font-size: 27px;
  font-weight: bold;
  line-height: 50px;
  color: #000000;
  margin:0 120px;
  flex: 1;
}

& > div:last-child {
  margin-left: 100px;
}

`;


export const LastJumbo = styled.div`
position: relative;
width: 700px;
height: 450px;
left: 50%;
transform: translateX(-50%);
box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
border-radius: 30px;
background-color: #FFFFFF;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-wrap: wrap;
text-align: center;


& > p:first-child {
  position: relative;
  height: 200;
  font-size: 40px;
  font-weight: bold;
  line-height: 90px;
  color: #000000;
}

& > p > span:nth-child(2) {
  position: relative;
  text-emphasis-style: filled #0642FF;
  -webkit-text-emphasis: filled #0642FF;
}
`;





// slider
export const Container = styled.div`
  position: relative;
  width: 80%;
  overflow: visible;

  /* .slick-next,
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
  } */

`;

// export const StyledSlider = styled(Slider)`
// left: 30%;
//   .slick-slide {
//     width: 70%;
//     padding: 0 !important;
//     display: flex !important;
//     justify-content: center !important;
//     align-items: center !important;
//   }
//   .slick-slide div {
//     outline: none;
//   }
//   .slick-list div {
//     position: relative;
//   }
// `;

export const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
  border-radius: 25px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
`;

export const Image = styled.img`
  position: absolute;
  max-width: 100px;
  max-height:100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
