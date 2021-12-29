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
export const MainBox = styled.div`
  height: calc(100vh - 3.5rem);
  position: relative;
  animation: ${fadeIn} 2s ease-in;
  background-image: url("/images/main4.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & > div {
    z-index: 9;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
    width: 70%;
    height: 70%;
    & > div:first-child {
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
  height: calc(100vh - 3.5rem);
  background: #f6fbff;
  display: flex;
  padding: 4rem 0;
  justify-content: center;
  & > div {
    flex: 1;
    position: relative;
    z-index: 9;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div:first-child {
      position: absolute;
      transform: translate(-10rem, -10rem);
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 2rem;
      gap: 1rem;
      & span {
        color: #0642ff;
      }
    }
    & > div:nth-child(2) {
      width: 20rem;
      height: inherit;
      & > img {
        max-width: 20rem;
        height: auto;
      }
    }
  }
`;

export const MainBox3 = styled(MainBox2)`
  background: #fff;
  & > div {
    & > div:first-child {
      transform: translate(-10rem, -10rem);
    }
    & > div:nth-child(2) {
      width: 35rem;
      & > img {
        max-width: 35em;
      }
    }
  }
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
