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
  width: 20rem;
  height: 15rem;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
`;
export const CloseModalBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
`;
export const ModalContent = styled.div``;
export const ReviewBtn = styled.button``;
export const ReviewContentCont = styled.div``;
export const ReviewDate = styled.div``;
export const ReviewDatecont = styled.div``;
export const ReviewInfo = styled.div``;
export const ReviewInput = styled.input``;
export const ReviewInputView = styled.div``;
export const ReviewSecond = styled.div``;
export const ReviewTime = styled.div``;
export const ReviewTimecont = styled.div``;
export const ReviewTitle = styled.div``;
export const ReviewTitleCont = styled.div``;
export const ReviewTop = styled.div``;
