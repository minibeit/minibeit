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
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 100%;
  max-width: 35rem;
  border-radius: 20px;
  height: 35rem;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 4.5rem;
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  margin-right: 1.5rem;
  height: -webkit-fill-available;
  & > svg {
    height: 37.67px;
    font-size: 30.5px;
    margin: 17px 0px;
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & > p:nth-child(3) {
    margin-top: auto;
    margin-bottom: 1rem;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
export const MessageBox = styled(Box)`
  & > div:first-child {
    font-size: 4rem;
    margin: 0.5rem;
  }
  & > p {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const DataBox = styled(Box)``;
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  height: 8rem;
  border-radius: 50%;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
