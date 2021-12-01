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
  flex: 1;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
`;
export const TimeView = styled(View)`
  flex: 2;
`;

export const ScheduleNav = styled.div`
  display: flex;
  & > p:nth-child(2) {
    white-space: nowrap;
  }
`;
export const ColorView = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "none"};
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
