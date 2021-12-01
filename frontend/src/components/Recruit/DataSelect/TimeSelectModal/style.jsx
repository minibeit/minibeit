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
  border-radius: 2rem;
`;
export const ModalHeader = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  & > p:first-child {
    font-size: 1.5rem;
    font-weight: bold;
  }
  & > svg {
    width: 1rem;
    & path {
      fill: #7c7c7c;
    }
  }
  & > p:nth-child(3) {
    color: #7c7c7c;
    font-size: 0.8rem;
  }
`;
export const ModalContent = styled.div`
  display: flex;
  padding: 0 2rem;
  min-height: 23rem;
`;
export const ModalFooter = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: end;
  & > div {
    border: none;
    font-size: 1.2rem;
    background: none;
    color: #0642ff;
    font-weight: bold;
    display: flex;
    gap: 0.3rem;
    align-items: center;
    cursor: pointer;
    & > svg {
      width: 1rem;
      transform: rotate(270deg);
      & path {
        fill: #0642ff;
      }
    }
  }
`;

export const View = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
`;
export const CalendarView = styled(View)`
  flex: 2;
`;
export const ScheduleView = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex: 1;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
`;
export const TimeView = styled(View)`
  flex: 2;
  & > p:first-child {
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    padding: 1rem;
  }
`;

export const CreateScheduleBtn = styled.button`
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
  align-self: end;
  & > svg {
    width: 1rem;
  }
`;
export const ScheduleNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  & > button {
    border: none;
    background: none;
    cursor: pointer;
    & > svg {
      width: 1rem;
    }
  }
  & > button:first-child {
    & > svg {
      transform: rotate(90deg);
    }
  }
  & > button:nth-child(3) {
    & > svg {
      transform: rotate(270deg);
    }
  }
  & > p:nth-child(2) {
    white-space: nowrap;
  }
`;

export const DateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  height: 17em;
  padding: 0 0.5em;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #c4c4c4;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
export const DateButton = styled.div`
  background: #c4c4c4;
  color: white;
  display: flex;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  gap: 0.4em;
  & > svg {
    cursor: pointer;
    width: 0.8rem;
    & path {
      fill: white;
    }
  }
`;
export const ColorView = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  position: absolute;
  transform: translate(0.5em, -1.5em);
  opacity: 0.5;
  background: ${(props) => props.color || "none"};
`;
export const TimeBtnBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 17em;
  overflow-y: scroll;
  padding: 1rem;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #c4c4c4;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
export const TimeBtn = styled.div`
  & > input {
    display: none;
  }
  & > label {
    margin: 1px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    border-radius: 10px;
    background: #f8f8f8;
    color: #c4c4c4;
  }
  & > input:checked + label {
    margin: 0;
    border: 1px solid #0642ff;
    background: white;
  }
`;
