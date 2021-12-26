import styled, { css, keyframes } from "styled-components";

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
  width: 55rem;
  border-radius: 2rem;
`;
export const ModalHeader = styled.div`
  padding: 1rem 0;
  margin: 0 2rem;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  & > p:first-child {
    font-size: 1.5rem;
    font-weight: bold;
  }

  & > p:nth-child(3) {
    color: #7c7c7c;
    font-size: 0.8rem;
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
export const InfoBox = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  overflow: hidden;
  transform: translate(-8rem, 0);
  background-color: white;
  position: absolute;
  border: 1px solid #c4c4c4;
  width: 19rem;
  height: 6rem;
  z-index: 99;
  border-radius: 1rem;

  & > p {
    font-size: 0.8em;
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
  border-top: 1px dotted #c4c4c4;
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
`;
export const CalendarView = styled(View)`
  flex: 2;
  ${({ blur }) =>
    blur &&
    css`
      filter: blur(4px);
      z-index: -99;
    `}
  &>div {
    margin-top: 1em;
  }
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
    margin-top: 0.7em;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    padding: 1rem;
  }
`;

export const CreateScheduleBtn = styled.div`
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
  align-self: end;
  & > svg {
    width: 1rem;
  }
  & > div:nth-child(2) {
    position: absolute;
    & > svg {
      width: 1rem;
      transform: rotate(270deg);
    }
    animation: ${createFirst} 0.5s infinite linear alternate;
  }
`;
export const ScheduleNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.4em;
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
    font-weight: bold;
  }
`;

export const DateList = styled.div`
  display: flex;
  align-items: center;
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
  background-color: #c4c4c4;
  width: fit-content;
  font-size: 0.85em;
  padding: 0.3em 0.5em;
  border-radius: 1em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  & svg {
    & path {
      fill: white;
    }
    width: 0.8em;
    height: fit-content;
    cursor: pointer;
  }
`;
export const ColorView = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: ${(props) => props.color || "none"};
  transform: translate(0.2em, -1.9em);
  color: white;
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
    padding: 10px;
    cursor: pointer;
    display: flex;
    border-radius: 10px;
    background: #f8f8f8;
    color: #c4c4c4;
  }
  & > input:checked + label {
    color: white;
    background: ${(props) => props.color || "none"};
  }
`;
