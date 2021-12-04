import styled from "styled-components";

export const CalendarWrapper = styled.div`
  position: absolute;
  max-width: 30rem;
  z-index: 99;
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
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
    border-top: 1px solid #c4c4c4;
    & > button {
      margin: 0 1rem;
      border: none;
      background: none;
      font-size: 1rem;
      color: #0642ff;
      cursor: pointer;
      font-weight: bold;
    }
  }
`;
export const DateList = styled.div`
  min-width: 6rem;
  border-left: 1px solid #c4c4c4;
  flex: 1;
  margin: 1rem 0;
  padding: 2rem 0 0 0;
  & > div:first-child {
    height: 15em;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
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
  }
`;
export const Date = styled.div`
  background-color: #c4c4c4;
  width: fit-content;
  font-size: 0.85em;
  padding: 0.3em 0.5em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #0642ff;
  position: absolute;
  transform: translate(-0.1em, -1.9em);
`;
