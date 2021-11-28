import styled from "styled-components";

export const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  border: solid 1px #c4c4c4;
  background: white;
  border-radius: 0.8rem;
  overflow: hidden;
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
export const ColorView = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(6, 66, 255, 0.5);
  position: absolute;
  transform: translate(0.2em, -1.9em);
`;
