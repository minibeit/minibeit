import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 40rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const ModalBtn = styled.button`
  width: 4rem;
  height: 2rem;
  font-size: 0.8rem;
  color: #ffffff;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 1rem;
  background: none;
  cursor: pointer;
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
    font-size: 0.7rem;
    font-weight: 200;
    color: #ffffff;
    text-align: center;
    margin-top: 2rem;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  margin: auto;
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
  width: 2rem;
  height: 2rem;
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
  font-size: 2rem;
  color: #ffffff;
`;

export const NextIcon = styled(ArrowForwardIosIcon)`
  font-size: 2rem;
  color: #ffffff;
`;
