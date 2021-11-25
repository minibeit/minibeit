import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;

export const ListPageContainer = styled.div`
  margin: 4rem 8rem 4rem 8rem;
  & > div:nth-child(2) {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #c4c4;
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: white;
      border: 1px solid #c4c4c4;
      font-weight: 600;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      min-width: 7rem;
      & svg {
        width: 1rem;
      }
    }
  }
  & > p {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
  }
`;
export const FilterLabelBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  min-height: 3rem;
  & > p:first-child {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
`;
export const FilterLabel = styled.div`
  background: rgba(6, 66, 255, 0.1);
  padding: 0.2rem 1rem;
  border-radius: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: fit-content;
  & > p {
    white-space: nowrap;
  }
  & > button {
    background: none;
    border: none;
    margin: auto;
    display: flex;
    cursor: pointer;
    padding: 0;
    color: #1c2362;
  }
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

/*search filter*/
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  & > p:first-child {
    color: #0642ff;
    font-size: 2rem;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    font-weight: bold;
  }
  & > div:nth-child(3) {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
  }
`;
export const SchoolSelect = styled.div`
  width: 25rem;
  height: 38px;
  cursor: pointer;
`;
export const DateSelect = styled.div`
  width: 25rem;
  height: 38px;
  cursor: pointer;
`;
export const SearchBtn = styled.button`
  width: 160px;
  height: 38px;
  border-radius: 50px;
  color: white;
  background-color: #0642ff;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

/* detail filter */
export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  width: 28rem;
  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  text-align: center;
  z-index: 99;
  & > div:first-child {
    text-align: end;
  }
  & > div:first-child > svg {
    margin: 10px 10px 0 0;
    cursor: pointer;
  }
  & > div:nth-child(5) {
    margin-top: 30px;
    font-size: 15px;
    color: #c4c4c4;
    cursor: pointer;
  }
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const DetailBox = styled.div`
  margin: 10px;
  text-align: start;
  & > p:first-child {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: all 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: all 500ms;
  }
`;

export const SelectBtn = styled.button`
  background: white;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  height: 35px;
  min-width: 80px;
  margin: 0 2px 0 2px;
  cursor: pointer;
  &:disabled {
    background: #b4c6ff;
  }
`;
export const FilterSaveBtn = styled.button`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  background: #0642ff;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 0 0 15px 15px;
  color: white;
  cursor: pointer;
`;

/*list*/
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export const FeedBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 14px;
  padding: 1.5rem;
  height: 7rem;
`;
export const FeedHeader = styled.div`
  display: flex;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  & > div:first-child > p:first-child {
    font-size: 25px;
    font-weight: 600;
    cursor: pointer;
  }
  & > div:nth-child(2) {
    margin-left: auto;
  }
  & > div:nth-child(2) > p:nth-child(2) {
    text-align: center;
  }
  & svg {
    cursor: pointer;
  }
`;
export const FeedInfoData = styled.div`
  & > p {
    color: #c4c4c4;
  }
  display: flex;
  gap: 20px;
  margin-top: 3rem;
`;
