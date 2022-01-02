import styled from "styled-components";

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
    color: #0642ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const FormContainer = styled.div`
  width: 57%;
  margin: 2rem auto;
`;
export const FormTitleBox = styled.div`
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > img {
    width: 12rem;
    height: 12rem;
  }
  & > p {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 1.1px;
    font-stretch: normal;
    line-height: 1.3;
  }
`;
export const KLoginButton = styled.div`
  background-color: #ffdb1d;
  cursor: pointer;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
  padding: 0 1rem;
  gap: 3rem;
  align-items: center;
  & > img {
    flex: 1;
    width: 1.5rem;
    height: 1.5rem;
  }
  & > p {
    flex: 10;
    color: #000;
  }
`;

export const GLoginButton = styled(KLoginButton)`
  background-color: #fff;
  border: 1px solid #aaaaaa;
`;
