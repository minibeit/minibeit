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
  max-width: 36rem;
  border-radius: 20px;
  padding: 46px 0;
  height: 30rem;
  background: #f1f0f0;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: -webkit-fill-available;
  & > p:first-child {
    font-size: 73px;
  }
  & > p:nth-child(2) {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2.2px;
    line-height: 32.2px;
  }
`;
export const SignupInfoBox = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: lightgrey;
  padding: 1rem 0;
  justify-content: space-around;
  height: auto;
  position: relative;
  bottom: 1rem;
  z-index: -1;
  height: 19rem;
`;
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  height: 14rem;
  border-radius: 50%;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
