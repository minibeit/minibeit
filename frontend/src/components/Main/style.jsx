import styled, { keyframes } from "styled-components";

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
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
    & > p {
      color: #7c7c7c;
      cursor: pointer;
    }
    & > a > svg {
      padding-top: 0.5rem;
      cursor: pointer;
      width: 1rem;
      path {
        fill: #7c7c7c;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    max-height: 100vh;
    & > div {
      position: relative;
      gap: 2.5rem;
      margin-bottom: 1rem;
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
  }
  @media only screen and (max-width: 700px) {
    max-height: 100vh;
  }
`;

export const ImgBox = styled.div`
  width: 20rem;
  height: inherit;
  & > img {
    max-width: 20rem;
    height: auto;
  }
  @media only screen and (max-width: 700px) {
    width: 15rem;
    margin: 7rem 0 0 3rem;
    & > img {
      max-width: 15rem;
    }
  }
`;

export const ImgBox2 = styled(ImgBox)`
  width: 35rem;
  & > img {
    max-width: 35rem;
  }
  @media only screen and (max-width: 700px) {
    width: 20rem;
    & > img {
      max-width: 20rem;
    }
  }
`;

export const TextBox = styled.div`
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
  @media only screen and (max-width: 700px) {
    transform: translate(-3rem, -13.5rem);
    gap: 2rem;
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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

export const LastBox = styled.div`
  height: 100vh;
  position: relative;
  & > div {
    position: relative;
    height: inherit;
    padding: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 700px) {
    max-height: 100vh;
    padding: auto;
    & > div {
      padding: 0;
    }
  }
`;

export const ImgBox3 = styled.div`
  & > img {
    width: 14rem;
    height: 14rem;
  }
  @media only screen and (max-width: 700px) {
    & > img {
      width: 7rem;
      height: 7rem;
    }
  }
`;

export const TextBox2 = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  line-height: 3.5rem;
  text-align: center;
  & > span {
    text-emphasis-style: filled #0642ff;
    -webkit-text-emphasis: filled #0642ff;
  }
  @media only screen and (max-width: 700px) {
    font-size: 2rem;
  }
`;
