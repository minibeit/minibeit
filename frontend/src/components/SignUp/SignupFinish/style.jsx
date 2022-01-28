import styled from "styled-components";

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 35rem;
  border-radius: 1.25rem;
  height: 35rem;

  @media only screen and (max-width: 700px) {
    padding: 1rem;
    width: 20rem;
    height: 21rem;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const CloseModalBtn = styled.div`
  margin: 1rem 1.5rem 0 auto;
  height: -webkit-fill-available;
  & > svg {
    width: 1.2rem;
    margin: 1rem 1rem 0 0;
    cursor: pointer;
  }

  @media only screen and (max-width: 700px) {
    margin: 0 0 0 auto;
    & > svg {
      margin: 0.7rem 0.7rem 0 0;
    }
  }
`;
export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  gap: 2rem;
  & > button:nth-child(2) {
    border: none;
    background-color: rgba(6, 66, 255, 0.1);
    padding: 0.8rem 2rem;
    border-radius: 2rem;
    color: #0642ff;
    font-size: 1.2rem;
    font-weight: 700;
  }
  & > p:nth-child(3) {
    color: #d4d4d4;
  }
  & button {
    cursor: pointer;
  }
  @media only screen and (max-width: 700px) {
    gap: 1rem;
    margin: 0;
    & > button:nth-child(2) {
      padding: 0.4rem 1rem;
      font-size: 1rem;
      font-weight: 600;
    }
    & > p:nth-child(3) {
      font-size: 0.8rem;
    }
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const MessageBox = styled(Box)`
  & > p {
    font-size: 1.6rem;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    color: #0642ff;
  }
  @media only screen and (max-width: 700px) {
    & > p {
      text-align: center;
      font-size: 1.1rem;
    }
  }
`;

export const ImgBox = styled.div`
  position: relative;
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
  display: inline-block;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(6, 66, 256, 0.05);
  & > img {
    width: 16rem;
    height: 16rem;
    z-index: 9;
  }

  @media only screen and (max-width: 700px) {
    height: 8rem;
    width: 8rem;
    margin: 0.5rem 0;
    & > img {
      width: 12rem;
      height: 12rem;
    }
  }
`;
