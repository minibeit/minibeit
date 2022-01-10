import styled, { keyframes } from "styled-components";

const createFirst = keyframes`
  0% {
    transform: translate(-3rem, -0.2rem);
  }
  100% {
    transform: translate(-2rem, -0.2rem);
  }
`;

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  width: 27rem;
  max-height: 100vh;
  border-radius: 2rem;
  padding: 0 1rem;
`;
export const ModalHeader = styled.div`
  padding: 0.7rem 0;
  margin: 1rem 2rem;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  & > div:first-child {
    font-size: 1.3rem;
    font-weight: bold;
  }
  & > svg {
    width: 1em;
    cursor: pointer;
  }
`;
export const Info = styled.div`
  & > svg {
    width: 1rem;
    & path {
      fill: #7c7c7c;
    }
  }
  &:hover > div:nth-child(2) {
    display: flex;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 28rem;
  overflow-y: scroll;
  padding: 1rem 0.5rem;
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
export const ModalFooter = styled.div`
  padding: 1.2rem 2rem;
  display: flex;
  border-top: 1px dotted #c4c4c4;
  justify-content: center;
  cursor: pointer;
  color: #0642ff;
`;

export const CalendarView = styled.div`
  & > div {
    margin: 0 auto;
    padding: 0;
  }
`;
export const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  background: #f8f8f8;
  border-radius: 0.5em;
  padding: 0.2em;
  margin: 0.2em;
  border: 0.5px solid #c4c4c4;
`;
export const ScheduleView = styled(View)``;
export const TimeView = styled(View)``;

export const CreateScheduleBtn = styled.div`
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
  align-self: end;
  margin-left: auto;
  background: #d6dfff;
  padding: 0.5em;
  border-radius: 0.3em;
  font-size: 0.7em;
  margin-right: 0.5em;
  & > p {
    color: #0642ff;
  }
  & > div:nth-child(2) {
    position: absolute;
    & > svg {
      width: 0.5rem;
      transform: rotate(270deg);
    }
    animation: ${createFirst} 0.5s infinite linear alternate;
  }
`;
export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  padding: 0.3em 0;
  gap: 0.5em;
  min-height: 1em;
`;
export const ScheduleNav = styled(Nav)`
  & > div:first-child {
    display: flex;
  }
`;
export const CalendarIcon = styled.div`
  width: 1.5em;
  height: 1.5em;
  background: #e5ecff;
  border-radius: 50%;
  & > div {
    width: 100%;
    height: 100%;
    background: url("/images/달력아이콘.png") no-repeat center center/contain;
  }
`;

export const ClockIcon = styled.div`
  width: 1.5em;
  height: 1.5em;
  background: #e5ecff;
  border-radius: 50%;
  & > div {
    width: 100%;
    height: 100%;
    background: url("/images/시간아이콘.png") no-repeat center center/contain;
  }
`;

export const ScheduleSelect = styled.select`
  background: none;
  width: 6em;
  height: 2em;
  text-align: center;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
export const List = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  padding: 0.5em;
  overflow-x: scroll;
  min-height: 2.5em;
  ::-webkit-scrollbar {
    height: 6px;
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
export const TimeNav = styled(Nav)`
  & > div:first-child {
    display: flex;
    & > p:nth-child(2) {
      text-align: center;
      font-weight: bold;
      padding: 0 0.7em;
      font-size: 0.9em;
      display: flex;
      align-items: center;
    }
  }
`;

export const DateButton = styled.div`
  background-color: #f8f8f8;
  width: fit-content;
  font-size: 0.8em;
  padding: 0.5em;
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  & svg {
    transform: translate(0, 1px);
    & path {
      fill: black;
    }
    width: 0.8em;
    height: fit-content;
    cursor: pointer;
  }
`;
export const ColorView = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin: auto;
  background: ${(props) => props.color || "none"};
`;

export const TimeBtn = styled.div`
  & > input {
    display: none;
  }
  & > label {
    font-size: 0.7em;
    padding: 10px;
    cursor: pointer;
    display: flex;
    border-radius: 10px;
    background: #c4c4c4;
    border: 1px solid #c4c4c4;
  }
  & > input:checked + label {
    color: black;
    background: #e6ecff;
    border: 1px solid #0642ff;
  }
`;
