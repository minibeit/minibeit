import styled, { keyframes } from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const BackGround = styled.div`
  width: 100vw;
  background-color: #fff;
  overflow-x: hidden;
  max-width: 100%;
`;
export const MainBox = styled.div`
  width: 100vw;
  height: calc(100vh - 3.5rem);
  position: relative;
  animation: ${fadeIn} 2s ease-in;

  & > img {
    width: inherit;
    height: calc(100vh - 3.5rem);
    object-fit: cover;
    padding: 1rem 0;
    box-sizing: border-box;
    animation: ${fadeIn} 3s ease-in;
  }
  & > div {
    position: absolute;
    left: 50%;
    top: 92%;
    transform: translate(-50%, -92%);
    z-index: 9;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    & > div {
      display: flex;
      gap: 3rem;
    }
    & > p {
      color: #7c7c7c;
      cursor: pointer;
    }
    & > a > div {
      padding-top: 0.5rem;
      cursor: pointer;
      & > svg {
        width: 1rem;
        path {
          fill: #7c7c7c;
        }
      }
    }
  }
`;

export const MainBox2 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  background: #f6fbff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  & > div {
    position: absolute;
    top: 20%;
    left: 30%;
    z-index: 9;
    transform: translate(-30%, -20%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    & > div:first-child {
      font-size: 1.5rem;
      font-weight: bolder;
      line-height: 2.3rem;
      color: #000000;
      & > span {
        color: #0642ff;
      }
    }
  }
  & > img {
    width: inherit;
    position: relative;
    height: calc(100vh - 3.5rem);
    object-fit: contain;
    padding: 4rem 0 2rem;
    box-sizing: border-box;
  }
`;

export const MainBox3 = styled(MainBox2)`
  background: #fff;
`;

const Button = styled.button`
  position: relative;
  width: 8rem;
  height: 3rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5rem;
  box-shadow: 0.5rem 0.5rem 1.8rem rgba(189, 189, 189, 0.2);
  border-radius: 3rem;
  border: none;
  cursor: pointer;
`;

export const WhiteButton = styled(Button)`
  color: #0642ff;
  background: #ffffff;
  :hover {
    background: #0642ff;
    color: #ffffff;
  }
`;

export const BlueButton = styled(Button)`
  color: #ffffff;
  background: #0642ff;
  :hover {
    color: #0642ff;
    background: #ffffff;
  }
`;

export const LastBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  & > div {
    padding: 9rem 12rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 4rem);
    box-sizing: border-box;
    justify-content: center;
    & > div:first-child {
      font-size: 2.3rem;
      font-weight: bold;
      line-height: 3.5rem;
      text-align: center;
      & > span {
        text-emphasis-style: filled #0642ff;
        -webkit-text-emphasis: filled #0642ff;
      }
    }
    & > div:nth-child(2) {
      & > img {
        width: 14rem;
        height: 14rem;
      }
    }
  }
`;

// slider
export const Container = styled.div`
  position: relative;
  width: 85vw;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 1rem 0 2rem;
  border-radius: 1.5rem;
  box-shadow: 0.5rem 0.5rem 1.8rem rgba(189, 189, 189, 0.2);
`;

export const Image = styled.img`
  position: absolute;
  max-width: 5rem;
  max-height: 5rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 45%;
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
  left: 0;
`;

export const NextButton = styled(ArrowButton)`
  right: 15rem;
`;

export const PrevIcon = styled(ArrowBackIosIcon)`
  font-size: 1.5rem;
  color: gray;
`;

export const NextIcon = styled(ArrowForwardIosIcon)`
  font-size: 1.5rem;
  color: gray;
`;
