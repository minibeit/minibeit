import styled from "styled-components";

/* Common */
export const Page = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  text-align: center;
`;
export const SaveBtn = styled.button`
  width: 10rem;
  height: 3rem;
  border-radius: 2rem;
  background: #0642ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  margin: auto;
  cursor: pointer;
  z-index: 0;
  &:disabled {
    background: #c4c4c4;
    cursor: default;
  }
`;

/* Bussiness Profile Select*/
export const BProfileContainer = styled(Container)`
  & > p:first-child {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(3) {
    color: #c4c4c4;
  }
`;
export const BProfileListBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const BProfileImgBox = styled.div`
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  background-color: rgba(6, 66, 255, 0.5);
  &.selected {
    transform: scale(1.2);
  }
  &.selected img {
    mix-blend-mode: color-burn;
  }
`;

/* School Select */
export const SchoolSelectContainer = styled(Container)`
  & > p:first-child {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
  }
`;
export const SchoolSearchBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  & > p:first-child {
    width: 4rem;
    align-items: center;
    display: flex;
    color: #c4c4c4;
    justify-content: end;
  }
  & > div:nth-child(2) {
    width: 50%;
  }
  & > button:nth-child(3) {
    width: 4rem;
    background: #0642ff;
    border: none;
    border-radius: 2rem;
    color: white;
    font-weight: bolder;
    font-size: 15px;
    cursor: pointer;
    &:disabled {
      background: #c4c4c4;
    }
  }
`;

/* DateSelect */
export const DateSelectContainer = styled(Container)`
  & > div:first-child {
    width: 55%;
  }
  & > p:nth-child(1) {
    font-size: 2rem;
    font-weight: 600;
  }
  & > p:nth-child(2) {
    color: #c4c4c4;
  }
`;
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: solid 1px #c4c4c4;
  border-radius: 1rem;
  & > div:first-child {
    & > p {
      color: #0642ff;
      font-weight: bold;
    }
    width: 50%;
    border-right: solid #c4c4c4;
  }
  & > div:nth-child(2) {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    & > div:first-child {
      width: 100%;
    }
  }
`;
export const TimeContainer = styled.div`
  display: flex;
  border: solid 1px #c4c4c4;
  border-radius: 1rem;
`;
export const DoTimeBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: solid #c4c4c4;
  padding: 1rem 0 1rem 0;
  & > p {
    font-size: 14px;
    color: #c4c4c4;
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    gap: 1rem;
    &>p{
      display: flex;
      align-items: center;
    }
  }
}
`;
export const TimeBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 45%;
    & > p {
      color: #c4c4c4;
    }
    padding: 0 1rem 0 1rem;
    & > div:nth-child(2) {
      height: 2.5rem;
    }
  }
`;
export const MinusBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  background: white;
  color: #c4c4c4;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
export const PlusBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  background: #1c2362;
  color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

/* TimeSelect */
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
  width: 55rem;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 8%;
  padding: 10px;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > p:first-child {
      font-size: 25px;
      font-weight: bold;
    }
  }
  & > p:nth-child(2) {
    color: #c4c4c4;
  }
`;
export const CloseModalBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
`;
export const ModalContent = styled.div`
  display: flex;
  height: 30rem;
  padding: 2rem;
`;
export const CalendarView = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const GroupBox = styled.div`
  display: flex;
  gap: 10px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  position: relative;
  overflow-x: scroll;
  & > div {
    display: flex;
    position: relative;
    gap: 10px;
  }
`;
export const GroupBtn = styled.button`
  width: 5rem;
  height: 2rem;
  border: 0.5px solid grey;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => {
    return props.color ? "white" : "#0642FF";
  }};
  border: ${(props) => {
    return props.color ? "1px solid" + props.color : "none";
  }};
  color: ${(props) => {
    return props.color ? props.color : "white";
  }};
  border-radius: 20px;
`;
export const ColorView = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "none"};
`;
export const TimeBtnContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  & > button:nth-child(3) {
    width: 6rem;
    height: 2rem;
    margin-left: auto;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    background: #0642ff;
    border: none;
    color: white;
    border-radius: 2rem;
  }
`;
export const SelectDateView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #c4c4c4;
`;
export const TimeBtnBox = styled.div`
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: scroll;
`;
export const TimeBtn = styled.div`
  & > input {
    display: none;
  }
  & > label {
    margin: 1px;
    padding: 10px;
    display: flex;
    border-radius: 10px;
    background: #f8f8f8;
    color: #c4c4c4;
  }
  & > input:checked + label {
    margin: 0;
    border: 1px solid #0642ff;
    padding: 10px;
    display: flex;
    border-radius: 10px;
    background: white;
  }
`;

/* CategorySelect */
export const CategoryContainer = styled(Container)`
  & > p:first-child {
    font-size: 2rem;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    color: #c4c4c4;
  }
  & > div:nth-child(3) {
    margin: 20px 0 20px 0;
  }
`;
export const CategoryBtn = styled.button`
  width: 8rem;
  border: 1px solid #0642ff;
  padding: 10px;
  border-radius: 10px;
  background: white;
  font-weight: bold;
  margin: 5px;
  cursor: pointer;
  &:disabled {
    margin: 5px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background: #f8f8f8;
    color: #c4c4c4;
  }
`;

/* Info Data */
export const InputPage = styled(Page)`
  height: 280vh;
`;
export const InputContainer = styled(Container)``;
export const Input = styled.div`
  width: 100%;
  border-radius: 15px;
  border: none;
  background: #f8f8f8;
  padding: 0 15px 0 15px;
  display: flex;
  & > input {
    height: 2em;
    background: none;
    border: none;
    width: 100%;
    font-size: 21px;
  }
  & > input:focus {
    outline: none;
  }
`;
export const InputBox = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > p:first-child {
    font-size: 2rem;
    font-weight: bold;
    text-align: start;
  }
`;
export const TitleBox = styled(InputBox)`
  & > input:nth-child(2) {
    width: 100%;
    height: 3em;
    border-radius: 15px;
    border: none;
    font-size: 21px;
    background: #f8f8f8;
    padding: 0 15px 0 15px;
  }
`;
export const ContentBox = styled(InputBox)`
  & > textarea:nth-child(2) {
    width: 100%;
    height: 6em;
    border-radius: 15px;
    border: none;
    font-size: 21px;
    background: #f8f8f8;
    padding: 15px;
  }
`;
export const ConditionBox = styled(InputBox)`
  & > div:first-child {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const ConditionInput = styled(Input)`
  & > button {
    background: none;
    display: flex;
    border: none;
    align-items: center;
    color: #0642ff;
    cursor: pointer;
  }
  & > button:disabled {
    color: #c4c4c4;
  }
`;
export const PaymentBox = styled(InputBox)`
  & > div:first-child {
    display: flex;
    font-size: 2rem;
    font-weight: bold;
    gap: 1rem;
  }
`;
export const PayInput = styled(Input)`
  & > span {
    display: flex;
    align-items: center;
    font-size: 21px;
    font-weight: bold;
    color: #c4c4c4;
  }
`;

/* img and address */
export const ImgForm = styled.div`
  position: relative;
  display: flex;
  width: 50rem;
  overflow-x: scroll;
  & > div {
    display: flex;
    gap: 20px;
  }
`;
export const ImgBox = styled.div`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  border-radius: 30px;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  display: inline-block;
`;
export const DeleteImg = styled.button`
  position: absolute;
  transform: translate(14rem, 0);
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const FileLabel = styled.label`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  border-radius: 30px;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  display: inline-block;
`;
export const FileInput = styled.input`
  display: none;
`;
