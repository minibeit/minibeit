import styled from "styled-components";

export const CalendarWrapper = styled.div`
  position: absolute;
  max-width: 30rem;
  z-index: 99;
  border: solid 1px #c4c4c4;
  background: white;
  border-radius: 0.8rem;
  overflow: hidden;
  & > div:first-child {
    display: flex;
    & > div:first-child {
      flex: 2;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    height: 3rem;
    justify-content: end;
    & > button {
      margin: 0 1rem;
      border: none;
      background: none;
      font-size: 1rem;
      color: #0642ff;
      cursor: pointer;
    }
  }
`;
export const DateList = styled.div`
  & > div:first-child {
    height: 15em;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
  }
  flex: 1;
  padding: 4rem 0 0 0;
`;
export const Date = styled.div`
  background-color: #c4c4c4;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 0.5em;
  border-radius: 1em;
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 0.3em;
  & svg {
    color: white;
    width: 1rem;
    height: fit-content;
    cursor: pointer;
  }
`;

export const ColorView = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(6, 66, 255, 0.5);
  position: absolute;
  transform: translate(0, -1.9em);
`;
