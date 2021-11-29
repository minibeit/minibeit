import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const BackGround = styled.div`
  width: 100vw;
  background-color: #f9f9f9;
  max-width: 100%;
  overflow-x: hidden;
  & > div:last-child {
    padding: 4rem 12rem;
    height: 100vh;
  }
`;

export const MainJumbotron = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
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
    height: 27px;
    font-size: 14px;
    color: #d7d7d7;
    line-height: 27px;
    text-align: center;
    text-decoration: underline;
    margin: 50px 0 70px 0;
  }
`;

const Button = styled.button`
  position: relative;
  margin-top: 30px;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border-radius: 42.5px;
  cursor: pointer;
`;

export const WhiteButton = styled(Button)`
  color: #0642ff;
  border: 1px solid #ffffff;
  background: #ffffff;
  margin-top: 30px;
`;

export const BlueButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #0642ff;
  background: #0642ff;
`;

export const Section = styled.div`
  position: relative;
  padding: 4rem 12rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.6rem;

  & > button:first-child {
  }

  & > p:nth-child(2) {
    font-size: 20px;
    font-weight: 800;
    line-height: 40px;
    color: #000000;
    margin-left: 1.5rem;
  }
`;

export const LastJumbo = styled.div`
  position: relative;
  margin: auto;
  width: 700px;
  height: 450px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border-radius: 30px;
  background-color: #ffffff;

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
  width: 370px;
  height: 370px;
  margin-bottom: 30px;
  border-radius: 25px;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  margin-right: 0;
`;

export const Image = styled.img`
  position: absolute;
  max-width: 100px;
  max-height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: calc(50% - 50px);
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
  right: 330px;
`;

export const PrevIcon = styled(ArrowBackIosIcon)`
  font-size: 22px;
  color: gray;
  &:focus,
  &:hover {
    color: #666;
  }
`;

export const NextIcon = styled(ArrowForwardIosIcon)`
  font-size: 22px;
  color: gray;
  &:focus,
  &:hover {
    color: #666;
  }
`;
