import styled from "styled-components";

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
  border-radius: 1.25rem;
  height: 35rem;
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
`;
export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & > p:nth-child(3) {
    margin-top: 1rem;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export const MessageBox = styled(Box)`
  & > div:first-child {
    margin: 0.5rem;
    & > img {
      width: 4rem;
      height: 4rem;
    }
  }
  & > p {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const DataBox = styled(Box)`
  width: 100%;
  position: relative;
  background: #f9f9f9;
  gap: 0.7rem;
  font-size: 0.9rem;
  padding: 1rem 0;
`;
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  height: 7rem;
  border-radius: 50%;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
