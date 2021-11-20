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
  padding: 32px 36px;
  height: 26rem;
  background-color: white;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  & > p {
    font-size: 18px;
    font-weight: 500;
  }
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
`;
export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  & > div:first-child {
    display: flex;
    font-size: 0.7rem;
  }
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 10rem;
  height: 10rem;
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
  background: #c4c4c4;
  color: white;
  border-radius: 14px;
  width: 100px;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`;

/*info*/

export const InfoContainer = styled.div`
  flex: 2;
  margin: 27px 12px;
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
export const CreateInput = styled.div`
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
    border-radius: 8px;
    padding: 4px 0 8px 5px;
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.14px;
    text-align: left;
    margin-top: 7px;
    outline: none;
    color: #707070;
    background: #fafafa;
    text-decoration: none;
  }
`;
export const SubmitBtnBox = styled.div`
  & > button {
    display: flex;
    background: blue;
    color: white;
    border-radius: 25px;
    font-size: 15px;
    cursor: pointer;
    align-items: center;
    width: 7rem;
    height: 2rem;
    justify-content: center;
    border: none;
    margin-left: auto;
  }
`;
