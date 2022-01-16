import styled from "styled-components";

export const DateInputBox = styled.div`
  margin: 0 1rem;
  z-index: 3;
`;
export const CalendarWrapper = styled.div`
  position: absolute;
  transform: translate(-1rem, 0.5rem);
  z-index: 99;
  border: solid 1px #c4c4c4;
  background: white;
  border-radius: 0.8rem;
  overflow: hidden;
  @media only screen and (max-width: 700px) {
    transform: translate(-16rem, 0.5rem);
  }
  & > div {
    width: 20rem;
    padding: 0;
  }
  & > button:nth-child(2) {
    background-color: #0642ff;
    width: 100%;
    height: 3rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const CalendarBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  & > svg {
    width: 1.3rem;
  }
`;

export const ColorView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #0642ff;
  position: absolute;
  transform: translate(0.5em, -1.9em);
`;
