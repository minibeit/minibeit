import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  overflow: scroll;
  max-width: 38rem;
  min-width: 25rem;
  border-radius: 20px;
  padding: 2rem 2.25rem;
  height: 25rem;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media only screen and (max-width: 700px) {
    padding: 1.5rem;
    min-width: 19rem;
    height: 31rem;
  }
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
    width: 1rem;
    height: 1rem;
  }
`;
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
  @media only screen and (max-width: 700px) {
    padding: 1rem;
    height: 24rem;
  }
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
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: row;
  }
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 9rem;
  height: 9rem;
  display: inline-block;
  border-radius: 50%;

  @media only screen and (max-width: 700px) {
    width: 7rem;
    height: 7rem;
  }
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
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
    background: #fafafa;
    color: #707070;
    text-decoration: none;
  }
`;
export const SelectForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  & p {
    font-size: 0.5rem;
  }
  & > div {
    margin-top: 7px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  & input {
    font-size: 1em;
    font-weight: normal;
    color: #707070;
    padding: 4px 0 8px 5px;
  }
`;
export const EmailPhoneInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  & > p:first-child {
    font-size: 0.5rem;
  }
  & > div {
    display: flex;
    height: 2rem;
    border: none;
    border-radius: 8px;
    padding: 0;
    font-size: 15px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.14px;
    text-align: left;
    margin-top: 7px;
    outline: none;
    background: #fafafa;
    color: #707070;
    text-decoration: none;
  }
  & input {
    width: 90%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    color: #707070;
    outline: none;
  }
  & button {
    border: none;
    background: none;
    cursor: pointer;
    color: blue;
    white-space: nowrap;
    &:disabled {
      color: #c4c4c4;
      cursor: inherit;
    }
  }
`;
export const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
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
    margin: auto 0;
  }
`;
