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
  width: 22rem;
  height: 27rem;
  padding: 0.7rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & > div:nth-child(2) {
    position: relative;
    width: 22rem;
    height: 27rem;
  }
`;

export const CloseModalBtn = styled.div`
  margin: 1rem auto 0 0.5rem;
  z-index: 2;
  & > svg {
    font-size: 18px;
    cursor: pointer;
  }
`;
