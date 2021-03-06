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
    height: 2rem;
    position: relative;
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
  @media only screen and (max-width: 700px) {
    margin-right: 1rem;
    & > svg {
      height: 1.5rem;
      font-size: 1.5rem;
      margin: 1rem 0 0;
    }
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
    width: 8em;
    height: 8em;
    padding: 2em;
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
    height: 10rem;
    justify-content: flex-start;
    & > img {
      width: 4rem;
      height: 4rem;
      padding: 1em;
    }
    & > p {
      font-size: 1.2rem;
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
    height: 2.3rem;
    width: 14rem;
    gap: 1.2rem;
    margin: 0.7rem auto;
    & > img {
      width: 1.3rem;
      height: 1.3rem;
    }
    & > p {
      font-size: 0.9rem;
    }
  }
`;

export const GLoginButton = styled(KLoginButton)`
  background-color: #fff;
  border: 1px solid #aaaaaa;
`;
