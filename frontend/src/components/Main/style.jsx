import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const BackGround = styled.div`
  width: 100vw;
  background-color: #f9f9f9;
  max-width: 100%;
  overflow-x: hidden;
  & > div:first-child {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    & > p:first-child {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 4rem;
      color: #000000;
      text-align: center;
      margin-top: 2rem;
    }
    & > div:nth-child(2) {
      display: flex;
      gap: 3rem;
    }
    & > p:nth-child(3) {
      font-size: 0.8rem;
      color: #d7d7d7;
      line-height: 1.5rem;
      text-align: center;
      text-decoration: underline;
    }
  }
  & > div:last-child {
    padding: 6rem 12rem;
  }
`;
export const Icon = styled.div`
  padding-top: 2rem;
  cursor: pointer;
  & > svg {
    width: 0.8rem;
    path {
      fill: #d7d7d7;
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
  cursor: pointer;
`;

export const WhiteButton = styled(Button)`
  color: #0642ff;
  border: 1px solid #ffffff;
  background: #ffffff;
  :hover {
    background: #0642ff;
    color: #ffffff;
  }
`;

export const BlueButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #0642ff;
  background: #0642ff;
  :hover {
    color: #0642ff;
    background: #ffffff;
  }
`;

export const Section = styled.div`
  position: relative;
  padding: 6rem 12rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  & > p:nth-child(2) {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 2.2rem;
    color: #000000;
    margin-left: 1.5rem;
  }
`;

export const LastJumbo = styled.div`
  position: relative;
  margin: auto;
  width: 43rem;
  height: 28rem;
  box-shadow: 0.5rem 0.5rem 1.8rem rgba(189, 189, 189, 0.2);
  border-radius: 2.5rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > p:first-child {
    position: relative;
    font-size: 2.3rem;
    font-weight: bold;
    line-height: 4rem;
    color: #000000;
  }

  & > p > span:nth-child(2) {
    position: relative;
    text-emphasis-style: filled #0642ff;
    -webkit-text-emphasis: filled #0642ff;
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
