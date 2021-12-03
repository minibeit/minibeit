import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 30rem;
  height: 22rem;
  border-radius: 2.2rem;
  & > div:first-child {
    display: flex;
    justify-content: flex-end;
    margin: 1.5rem;
    cursor: pointer;
    & > svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const ModalContent = styled.div`
  transform: translate(-50%, -60%);
  position: absolute;
  top: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  & > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: #0642ff;
    }
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    white-space: nowrap;
    font-weight: bold;
  }
  & > p:nth-child(3) {
    font-weight: bold;
  }
  & > p:nth-child(4) {
    color: #c4c4c4;
    font-size: 0.8rem;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  & > button {
    width: 10em;
    height: 3em;
    border: 1px solid #0642ff;
    border-radius: 3rem;
    background: none;
    color: #0642ff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const SelectBox = styled.div`
  margin-bottom: 1rem;
  & > select {
    width: 17rem;
    height: 2.5rem;
    border: 1px solid #0642ff;
    border-radius: 2.5rem;
    text-align: center;
    color: #0642ff;
    & option {
      height: 2.5rem;
    }
  }
`;
