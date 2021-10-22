import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;

`;

export const ModalBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
`;


// slider
export const Container = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  border-radius: 10px;
`;

export const TestContainer = styled.div`
  position: relative;
  width: 30rem;
  height: 30rem;
  box-sizing: content-box;
`;

export const Image = styled.img`
  position: relative;
  width: 30rem;
  height: 30rem;
  box-sizing: content-box;
  object-fit: contain;
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
  left: 0;
`;

export const NextButton = styled(ArrowButton)`
  right: 0;
`;

export const PrevIcon = styled(ArrowBackIosIcon)`
font-size: 30px; 
color: red; 
&:focus, &:hover {
  color: pink; }
`; 

export const NextIcon = styled(ArrowForwardIosIcon)` 
font-size: 30px; 
color: red; 
&:focus, &:hover {
  color: pink; }
`;

