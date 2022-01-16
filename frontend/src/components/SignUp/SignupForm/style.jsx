import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 57%;
  background: white;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  min-height: 26rem;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media only screen and (max-width: 700px) {
    padding: 1rem 1.5rem;
    width: 80%;
    height: 75%;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 3.2rem;
  & > div:first-child {
    background: #0642ff1a;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > p {
    font-size: 18px;
    font-weight: bold;
  }
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ProgressBar = styled.div`
  width: 100%;
  background: #0642ff1a;
  height: 0.3rem;
  border-radius: 1rem;
`;
export const StepBar = styled.div`
  width: ${({ step }) => {
    if (step === 1) return "33.3%";
    else if (step === 2) return "66.6%";
    else return "100%";
  }};
  height: 100%;
  background: #0642ff;
`;

export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  & > div:nth-child(2) {
    display: flex;
    flex-wrap: wrap;
    min-height: 16rem;
  }

  @media only screen and (max-width: 700px) {
    & > div:nth-child(2) {
      max-height: 20rem;
      min-height: 19rem;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: gray;
      }
      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
      }
    }
  }
`;

/* common */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  & > p {
    font-size: 0.5rem;
  }
  & input,
  select {
    border-radius: 8px;
    border: none;
    background: #f8f8f8;
    flex: 1;
    padding: 0.4em;
    outline: 0;
  }
`;
export const GreetingMsg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  & > p {
    font-size: 1.5rem;
    font-weight: bold;
  }
  @media only screen and (max-width: 700px) {
    & > p {
      font-size: 1.3rem;
    }
  }
`;
export const NextBtn = styled.button`
  display: flex;
  background: #0642ff;
  color: white;
  min-width: 7em;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
  align-items: center;
  padding: 0.7rem 1rem;
  justify-content: center;
  border: none;
  margin-left: auto;
  white-space: nowrap;

  @media only screen and (max-width: 700px) {
    padding: 0.4rem 1rem;
  }
`;

/* img */
export const ImgContainer = styled(Container)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  & > div:first-child {
    display: flex;
    font-size: 0.7rem;
    & > p:nth-child(2) {
      color: blue;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
  @media only screen and (max-width: 700px) {
    & > div:nth-child(2) {
      display: flex;
      margin: 0 0 2rem;
      flex-direction: row;
    }
  }
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 10rem;
  height: 10rem;
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
  background: #f8f8f8;
  color: #7c7c7c;
  border-radius: 14px;
  width: 100px;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`;

/*info*/
export const InfoContainer = styled(Container)`
  flex: 2;
  width: 100%;
  gap: 4rem;
  & > div:first-child {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
  }
  @media only screen and (max-width: 700px) {
    flex: 2;
    width: 100%;
    gap: 1rem;
    & > div:first-child {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    & > div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
export const CheckInput = styled.div`
  display: flex;
  gap: 0.4em;
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
    outline: none;
    background: #f8f8f8;
    color: #707070;
    text-decoration: none;
  }
  & input {
    width: 90%;
    height: 100%;
    padding: 0 0.4em;
    margin: 0;
    background: none;
    border: none;
    color: #707070;
    outline: none;
    border-radius: 8px;
  }
  & button {
    border: none;
    background: none;
    cursor: pointer;
    color: blue;
    white-space: nowrap;
    border-radius: 8px;
    :disabled {
      color: #c4c4c4;
      cursor: inherit;
      :hover {
        font-weight: normal;
      }
    }
    :hover {
      font-weight: bold;
    }
    :active {
      background: #c4c4c4;
    }
  }
`;
export const NameBox = styled(InputBox)`
  width: 5rem;
`;
export const GenderBox = styled(InputBox)`
  width: 3rem;
  & > select {
    cursor: pointer;
  }
`;
export const BirthBox = styled(InputBox)`
  width: 10rem;
  & > div {
    display: flex;
    gap: 0.2rem;
    & > select {
      cursor: pointer;
    }
    & > select:first-child {
      flex: 3;
    }
    & > select:nth-child(2) {
      flex: 2;
    }
    & > select:nth-child(3) {
      flex: 2;
    }
  }
`;
export const PhoneNumBox = styled(InputBox)`
  & > input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const EmailBox = styled(InputBox)``;
export const NicknameInput = styled(CheckInput)`
  width: 8rem;
  flex-direction: column;
`;
export const PhoneInput = styled(CheckInput)`
  & > div:nth-child(2) {
    align-items: center;
  }
`;
export const EmailInput = styled(CheckInput)``;

export const SendMessage = styled.p`
  display: none;
  color: #0642ff;
`;

/*school*/
export const SchoolBox = styled(InputBox)`
  min-width: 16rem;
  margin: 3rem 1rem;
  & > div {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
  }
`;

/* job */
export const JobContainer = styled.div`
  & > p {
    margin: 0.5rem;
    font-size: 0.5rem;
  }
  @media only screen and (max-width: 700px) {
    & > p {
      display: none;
    }
  }
`;
export const JobButton = styled.button`
  border: none;
  background: #f9f9f9;
  width: 6rem;
  height: 2rem;
  border-radius: 1rem;
  margin: 6px;
  cursor: pointer;
  &:disabled {
    border: 1px solid #0642ff;
    background: white;
    color: black;
  }

  @media only screen and (max-width: 700px) {
    width: 5rem;
  }
`;
