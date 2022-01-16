import styled from "styled-components";

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  & > svg {
    width: 1rem;
  }
  & > input {
    border: none;
    background: #f8f8f8;
    font-size: 1rem;
    outline: none;
  }
  & > button {
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    & svg {
      width: 1rem;
    }
  }
`;
export const SchoolListWrapper = styled.div`
  position: absolute;
  transform: translate(-1.2rem, 0);
  display: flex;
  z-index: 99;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 10rem;
  padding: 1rem;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 10px 10px 30px rgb(189 189 189 / 20%);

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
export const SchoolItem = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;
  &:hover {
    & > p:nth-child(2) {
      background-color: #0642ff4d;
      color: black;
    }
  }
  & > div:first-child {
    width: 1.5rem;
    height: 1.5rem;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    & svg {
      width: 0.6rem;
    }
  }
  & > p:nth-child(2) {
    flex: 1;
    height: 1.5rem;
    display: flex;
    align-items: center;
    color: #c4c4c4;
    padding: 0 1rem;
    border-radius: 1rem;
  }
`;
