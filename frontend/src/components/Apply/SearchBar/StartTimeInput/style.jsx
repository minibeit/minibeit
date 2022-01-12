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
  gap: 1rem;
  max-height: 10rem;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 10px 10px 30px rgb(189 189 189 / 20%);
  border-radius: 1.5rem;
  & > p:first-child {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
  }
  & > p:nth-child(2) {
    text-align: center;
    font-weight: bold;
  }
  & > button:nth-child(4) {
    background: #0642ff;
    border: none;
    padding: 0.7em;
    border-radius: 2em;
    color: white;
    font-weight: bold;
    font-size: 1em;
  }
`;
