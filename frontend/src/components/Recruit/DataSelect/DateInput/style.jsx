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
      padding: 0;
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
export const DateInput = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  & > svg {
    width: 1rem;
  }
  & > input {
    border: none;
    background: none;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
  }
`;
export const DateList = styled.div`
  min-width: 6rem;
  border-left: 1px solid #c4c4c4;
  flex: 1;
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
  background-color: #d6dfff;
  width: fit-content;
  font-size: 0.8em;
  padding: 0.3em 0.5em;
  border-radius: 1em;
  color: #0642ff;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 0.3em;
  & p {
    display: flex;
    align-items: center;
  }
  & svg {
    color: #0642ff;
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
  transform: translate(0.2em, -1.9em);
`;
