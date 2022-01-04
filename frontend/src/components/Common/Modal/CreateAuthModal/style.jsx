import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 35rem;
  border-radius: 20px;
  height: 35rem;
  @media only screen and (max-width: 700px) {
    width: 22rem;
    height: 22rem;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 4.5rem;
  @media only screen and (max-width: 700px) {
    height: 1rem;
  }
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
  & > p > span {
    color: #0642ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const FormContainer = styled.div`
  width: 57%;
  margin: 2rem auto;
  @media only screen and (max-width: 700px) {
    width: 80%;
    margin: 1rem auto;
  }
`;
export const FormTitleBox = styled.div`
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
  & > img {
    width: 12em;
    height: 12em;
  }
  & > p {
    font-size: 1.7rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: 1.1px;
    font-stretch: normal;
    line-height: 1.3;
  }

  @media only screen and (max-width: 700px) {
    height: 10.5rem;
    justify-content: flex-start;
    margin-bottom: 0;
    & > img {
      width: 7rem;
      height: 7rem;
    }
    & > p {
      font-size: 1.3rem;
    }
  }
`;
export const KLoginButton = styled.div`
  background-color: #ffdb1d;
  cursor: pointer;
  height: 48px;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
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
  @media only screen and (max-width: 700px) {
    height: 2.7rem;
    width: inherit;
    gap: 1.2rem;
    margin: 0.7rem auto;
    & > img {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
`;

export const GLoginButton = styled(KLoginButton)`
  background-color: #fff;
  border: 1px solid #aaaaaa;
`;
