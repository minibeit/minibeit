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
  width: 57%;
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
  background-color: white;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
`;
export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  & > svg:first-child {
    font-size: 4rem;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  & > select {
    width: 20rem;
    height: 2rem;
    border-radius: 0.5rem;
  }
  & > input {
    padding: 0;
    width: 19rem;
    height: 2rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    outline: 1px solid black;
  }
`;
