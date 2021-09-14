import styled from "styled-components";

export const FormsignupContainer = styled.div`
  display: flex;
`;
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const SignupMSG = styled.div`
  color: ${(props) => props.color};
`;
export const SignupInput = styled.input``;
export const SILabel = styled.label``;
export const SITitle = styled.div``;
export const SICont1_1 = styled.div``;
export const SICont1_2 = styled.div``;
export const SignupButton = styled.button``;
export const ImgDel = styled.button``;
export const SignupSelect = styled.select``;
export const SIheader = styled.div``;
export const SIindex = styled.div``;
export const ViewSelect = styled.div``;
export const ModalPro = styled.div``;
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
  width: 80%;
  height: 30rem;
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
export const SignupNickBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
`;
export const ModalContent = styled.div``;
