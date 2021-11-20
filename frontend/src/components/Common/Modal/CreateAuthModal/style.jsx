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
export const ModalContent = styled.div``;
export const Formexplain = styled.div`
  text-align: center;
  font-size: 11px;
  color: #8c8c8c;

  & > p > span:first-child,
  & > p > span:nth-child(2) {
    color: #0642FF;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const FormContainer = styled.div`
  width: 57%;
  margin: 0 auto;
`;
export const FormTitleBox = styled.div`
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > p {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 1.1px;
    font-stretch: normal;
    line-height: 1.3;
  }
`;
export const LoginButton = styled.div`
  cursor: pointer;
  background: ${(props) => props.color};
  height: 48px;
  border-radius: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
  & > p {
    color: white;
  }
`;
