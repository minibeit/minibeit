import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
0% {
  transform : translate(-50%, -45%);
  opacity: 0;

}
100%{
  transform : translateY(-50%, -50%);
  opacity: 1;

}`;

const fadeIn = keyframes`
0% {
  opacity: 0;

}
100%{
  opacity: 1;

}`;

export const Background = styled.div`
  animation: ${fadeIn} 0.5s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
  & > div {
    animation: ${slideUp} 1s ease-in;
  }
`;

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  min-height: 16rem;
  border-radius: 2.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 700px) {
    padding: 1rem 0;
    width: 21rem;
    min-height: 14rem;
  }
`;

export const AlertHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: fit-content;
  & > svg {
    cursor: pointer;
    margin: 1rem;
    width: 1rem;
  }
  @media only screen and (max-width: 700px) {
    & > svg {
      margin: 1rem 1.5rem 0;
    }
  }
`;

export const AlertContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 2rem;
    path {
      fill: #0642ff;
    }
  }
`;

export const AlertText = styled.div`
  text-align: center;
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > p:first-child {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: bold;
    & > span {
      color: #0642ff;
    }
  }

  & > p:nth-child(2) {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.5);
    line-height: 1.5rem;
  }

  & > p:nth-child(3) {
    color: #0642ff;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.5rem;
  }

  & > span {
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.3rem;
    line-height: 1.875rem;
    display: inline;
    & > span {
      color: #0642ff;
    }
  }
  @media only screen and (max-width: 700px) {
    width: 21rem;
    & > p:first-child {
      font-size: 1.3rem;
    }

    & > span {
      display: block;
    }
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media only screen and (max-width: 700px) {
    margin: 1rem 0;
  }
`;

const Button = styled.button`
  position: relative;
  font-size: 0.85rem;
  padding: 0.7rem 1rem;
  font-size: 0.85rem;
  border-radius: 2rem;
  cursor: pointer;
  min-width: 10rem;

  @media only screen and (max-width: 700px) {
    padding: 0.5rem 1rem;
    min-width: 8rem;
  }
`;

export const GrayButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #ffffff;
  background: #c4c4c4;
`;

export const BlueButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #0642ff;
  background: #0642ff;
`;

//이용약관이랑 개인정보에만 사용됌
export const Conditions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  margin: 0 1rem;
  justify-content: center;
  align-items: left;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > p:first-child {
      font-size: 1.3rem;
      font-weight: 700;
    }
    & > p:nth-child(2) {
      font-size: 0.9rem;
      line-height: 1.2rem;
    }
  }

  & > div:nth-child(2) {
    position: relative;
    display: flex;
    justify-content: left;
    background-color: #f9f9f9;
    border-radius: 17px;
    width: 28rem;
    height: 22rem;

    & > p {
      margin: 15px;
      font-size: 12px;
      text-align: left;
      line-height: 15px;
      width: 26rem;
      height: 21rem;
      padding: 0 0.5rem;
      overflow-y: scroll;
      font-weight: 400;
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: gray;
      }
      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    gap: 1em;
    margin: 0 1rem;
    & > div:nth-child(2) {
      width: 19rem;
      height: 19rem;

      & > p {
        width: 17rem;
        height: 17rem;
      }
    }
  }
`;
