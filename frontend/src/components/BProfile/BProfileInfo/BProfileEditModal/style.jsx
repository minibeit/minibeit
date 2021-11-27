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
  border-radius: 1.25rem;
  padding: 2rem 2.25rem;
  height: 26rem;
  background-color: white;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  & > p {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
`;
export const ImgEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > div:first-child {
    display: flex;
    font-size: 0.7rem;
  }
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 9rem;
  height: 9rem;
  display: inline-block;
  border-radius: 50%;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const ImgEditBtn = styled.label`
  padding: 0.5rem;
  cursor: pointer;
  background: #fff;
  color: #000;
  border: 1px solid #0642ff;
  border-radius: 1rem;
  width: 6.25rem;
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  :hover {
    background-color: #0642ff;
    color: #fff;
  }
`;

/*info*/

export const InfoEditContainer = styled.div`
  flex: 2;
  margin: 1.6875rem 0.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;
export const EditInput = styled.div`
  display: flex;
  width: 45%;
  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  & p {
    font-size: 0.5rem;
  }
  & input,
  select {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 0.25rem 0 0.5rem 0.3125rem;
    font-size: 1rem;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.14px;
    text-align: left;
    margin-top: 0.5rem;
    outline: none;
    color: #707070;
    background: #f3f3f3;
    text-decoration: none;
  }
`;
export const SubmitBtnBox = styled.div`
  & > button {
    display: flex;
    background: #0642ff;
    color: #fff;
    border-radius: 1.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    align-items: center;
    width: 7rem;
    height: 2rem;
    justify-content: center;
    border: none;
    margin-left: auto;
  }
`;
