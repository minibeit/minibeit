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
