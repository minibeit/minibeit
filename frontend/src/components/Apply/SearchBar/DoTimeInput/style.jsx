import styled from "styled-components";

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  & > input {
    border: none;
    background: none;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
  }
`;
export const Wrapper = styled.div`
  position: absolute;
  transform: translate(-1.2rem, 1rem);
  min-width: 10em;
  min-height: 10em;
  display: flex;
  z-index: 99;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 10rem;
  max-width: 20rem;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 10px 10px 30px rgb(189 189 189 / 20%);
  border-radius: 1.5rem;
  & > p:first-child {
    font-size: 1.2em;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
  }
  & > button:nth-child(3) {
    background: #0642ff;
    border: none;
    padding: 0.7em;
    border-radius: 2em;
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
  }
`;

export const BtnGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 1em 0;
`;
export const SelectBtn = styled.button`
  width: 7em;
  height: 2.5em;
  background: white;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  color: black;
  border-radius: 0.5rem;
  white-space: nowrap;
  &:disabled {
    border: 1px solid #0642ff;
    background: #b4c6ff;
  }
`;
