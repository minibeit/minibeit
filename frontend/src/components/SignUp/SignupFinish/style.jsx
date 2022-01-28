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
  height: 3.5rem;
  @media only screen and (max-width: 700px) {
    height: 2rem;
  }
`;
export const CloseModalBtn = styled.div`
  margin: 1rem 1.5rem 0 auto;
  height: 3.5rem;
  & > svg {
    width: 1.2rem;
    height: 1.2rem;
    margin: 1rem 1rem 0 0;
    cursor: pointer;
  }

  @media only screen and (max-width: 700px) {
    margin: 0 0 0 auto;
    height: 2rem;

    & > svg {
      margin: 0.7rem 0.7rem 0 0;
    }
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1.5rem 0;
  gap: 1.5rem;
  max-height: 31rem;
  & > button {
    border: none;
    background-color: rgba(6, 66, 255, 0.1);
    padding: 0.8rem 2rem;
    border-radius: 2rem;
    color: #0642ff;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }
  & > p:last-child {
    color: #d4d4d4;
    font-size: 1rem;
  }

  & > p {
    font-size: 1.6rem;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    color: #0642ff;
  }

  @media only screen and (max-width: 700px) {
    gap: 1rem;
    margin: 0;
    max-height: 18rem;

    & > p {
      text-align: center;
      font-size: 1.1rem;
    }
    & > button {
      padding: 0.4rem 1rem;
      font-size: 1rem;
      font-weight: 600;
    }
    & > p:last-child {
      font-size: 0.8rem;
    }
  }
`;

export const ImgBox = styled.div`
  position: relative;
  height: 11rem;
  width: 11rem;
  border-radius: 50%;
  margin: 1rem 0;
  background-color: rgba(6, 66, 256, 0.05);
  & > img {
    position: absolute;
    width: 11rem;
    height: 11rem;
    z-index: 9;
  }

  @media only screen and (max-width: 700px) {
    height: 8rem;
    width: 8rem;
    margin: 0.5rem 0;
    & > img {
      width: 8rem;
      height: 8rem;
    }
  }
`;
