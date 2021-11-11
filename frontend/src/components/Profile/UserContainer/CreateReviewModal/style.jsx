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
  max-width: 41rem;
  border-radius: 20px;
  padding: 46px 55px;
  height: 26rem;
  background: white;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  & > div:first-child {
    display: flex;
    gap: 1rem;
  }
  & > div:nth-child(2) {
    display: flex;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0 0.5rem 0;
  height: fit-content;
  border-bottom: 2px solid blue;
  & > p:first-child {
    font-size: 0.7rem;
  }
  & > p:nth-child(2) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
export const DateTime = styled.div`
  display: flex;
  gap: 2.5rem;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const TextInput = styled.textarea`
  width: 93%;
  height: 19rem;
  border: none;
  background: #f8f8f8;
  border-radius: 1rem;
  padding: 1rem;
  resize: none;
`;
export const ReviewBtn = styled.div`
  display: flex;
  gap: 1rem;
  align-self: end;
  margin-left: auto;
  & button {
    background: #0642ff;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
`;
