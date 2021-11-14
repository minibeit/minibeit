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
  background: white;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
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
  }
`;
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
    & > div {
      display: flex;
    }
    & > div:nth-child(2) {
      width: 100%;
    }
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
`;
export const NextBtn = styled.button`
  display: flex;
  background: #0642ff;
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
`;

export const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;
export const ImgEditBtn = styled.label`
  padding: 5px;
  cursor: pointer;
  background: #c4c4c4;
  color: white;
  border-radius: 14px;
  width: 100px;
  font-size: 12px;
  text-align: center;
  margin: 10px 0px;
`;

/*info*/

export const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;
export const DataInput = styled.div`
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

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 0.5rem;
  }
  & input,
  select {
    border-radius: 8px;
    width: 100%;
    border: none;
    background: #fafafa;
    padding: 8px 0 8px 5px;
  }
`;

export const NameBox = styled(InputBox)`
  width: 4rem;
`;
export const NickNameBox = styled(InputBox)`
  width: 7.5rem;
  & > div {
    display: flex;
    background: #fafafa;
    border-radius: 8px;
    & > button {
      white-space: nowrap;
      border: none;
      background: none;
      padding: 8px 5px 8px 5px;
      font-size: 0.5rem;
      color: blue;
      cursor: pointer;
    }
  }
`;
export const GenderBox = styled(InputBox)`
  width: 3rem;
`;
export const BirthBox = styled(InputBox)`
  width: 10rem;
  & > div {
    display: flex;
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
  width: 8rem;
  & > div {
    display: flex;
    gap: 0.2rem;
    & > input {
      flex: 1;
    }
    & > input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
  }
`;

export const NickNameBtn = styled.button``;
export const SignupMSG = styled.div`
  color: ${(props) => props.color};
  font-size: 10px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
