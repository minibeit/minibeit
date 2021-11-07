import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 40rem;
    justify-content: center;
    margin-top: 2rem;
  }
`;

export const ModalBtn = styled.button`
  width: 4rem;
  height: 2rem;
  font-size: 12px;
  color: #ffffff;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 15px;
  background: none;
`;


// slider
export const Container = styled.div`
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 25rem;
  overflow: hidden;
  
  & > p:first-child {
    position: relative;
    font-size: 10px;
    font-weight: 200;
    color: #ffffff;
    text-align: center;
    margin: 1rem;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  margin: 0 auto; 
`;

export const ImgContainer = styled.div`
position: relative;
width: 25rem;
height: 25rem;
`;

export const Image = styled.img`
  position: relative;
  width: 25rem;
  height: 25rem;
  object-fit: contain;
  box-sizing: content-box;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 50%;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%; 
  padding: 0; 
  width: 30px; 
  height: 30px; 
  line-height: 1; 
  border: none; 
  background: none; 
  outline: none; 
  cursor: pointer;
`;

export const PrevButton = styled(ArrowButton)`
  left: 20%;
`;

export const NextButton = styled(ArrowButton)`
  right: 20%;
`;

export const PrevIcon = styled(ArrowBackIosIcon)`
font-size: 30px; 
color: #ffffff; 
`; 

export const NextIcon = styled(ArrowForwardIosIcon)` 
font-size: 30px; 
color: #ffffff; 
`;
