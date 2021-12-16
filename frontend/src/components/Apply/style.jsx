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
  margin: 4rem 13rem;
  min-height: 70vh;
  & > div:nth-child(2) {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #c4c4c4;
  }
`;
export const FilterBtn = styled.button`
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
`;
export const SearchResult = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
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
  padding: 0.5rem 1rem;
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
    & svg {
      width: 1em;
    }
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
  gap: 1rem;
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
export const SearchInput = styled.div`
  background: #f8f8f8;
  display: flex;
  align-items: center;
  max-height: 3rem;
  border-radius: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  & > p:first-child {
    white-space: nowrap;
  }
  & svg {
    width: 1rem;
  }
`;
export const PlaceInput = styled(SearchInput)``;
export const DateInput = styled(SearchInput)`
  & input {
    background: none;
    height: 100%;
    border: none;
    width: 13rem;
    outline: none;
    text-align: center;
    font-size: 1rem;
  }
`;
export const SearchBtn = styled.button`
  color: white;
  background-color: #0642ff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  white-space: nowrap;
`;

/* detail filter */
export const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  max-width: 35rem;
  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  text-align: center;
  z-index: 99;
  & > div:first-child {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    & > p {
      font-weight: bold;
      font-size: 1.2em;
    }
    & svg {
      margin-left: auto;
      cursor: pointer;
    }
  }
  & > p:nth-child(2) {
    text-align: start;
    padding: 0 0.5rem;
  }
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
export const FilterResetBtn = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1em;
  color: #8c8c8c;
`;

export const Box = styled.div`
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
    transition: all 300ms;
  }
`;

export const DetailBox = styled(Box)`
  text-align: start;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
  & > p:first-child {
    font-size: 1rem;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    display: flex;
    gap: 0.5em;
  }
`;
export const CategoryBox = styled(Box)`
  padding: 0.5rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5em;
  }
`;

export const PaymentBtn = styled.button`
  background: white;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  color: black;
  padding: 0.5em 3em;
  border-radius: 0.5rem;
  white-space: nowrap;
  &:disabled {
    background: #b4c6ff;
  }
`;
export const SelectBtn = styled(PaymentBtn)`
  padding: 0.5em 0.5em;
  min-width: 5em;
`;
export const CategoryBtn = styled(PaymentBtn)`
  padding: 0.5em 0.5em;
  min-width: 9em;
`;
export const FilterSaveBtn = styled.button`
  width: 100%;
  height: 3rem;
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
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const FeedBox = styled.div`
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;
  border-radius: 14px;
  height: 10rem;
  width: 100%;
  cursor: pointer;
  gap: 1rem;
  & > div:first-child {
    width: 100%;
    position: relative;
    flex: 1;
    & > img {
      width: inherit;
      border-radius: 14px 0 0 14px;
      position: absolute;
      object-fit: cover;
      height: 10rem;
      z-index: 1;
    }
    & > div:nth-child(2) {
      width: inherit;
      border-radius: 14px 0 0 14px;
      height: 10rem;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      z-index: 5;
      & > div {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 9;
        top: 1rem;
        left: 1rem;
        width: 1.3rem;
        height: 2.2rem;
        & svg {
          width: 1.3rem;
          path {
            fill: #fff;
          }
        }
        & > p {
          text-align: center;
          font-size: 0.9rem;
          color: #fff;
        }
      }
    }
  }
  & > div:nth-child(2) {
    flex: 2;
    width: 100%;
    padding: 1rem 0.5rem;
    height: 8rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > div:nth-child(2) {
    display: flex;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: #8e8e8e;
    & > svg {
      width: 1rem;
      path {
        fill: #8e8e8e;
      }
    }
  }
  & > p:first-child {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const FeedInfoData = styled.div`
  color: #7c7c7c;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  & > div:nth-child(2) {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    background-color: ${({ condition }) => {
      return condition ? "#e6ecff" : "rgba(124,124,124,0.1)";
    }};
  }
  & > div:nth-child(3) {
    & > span {
      margin-right: 0.3rem;
      color: ${({ payment }) => {
        return payment === "CACHE" ? "#00bb34" : "#3558c7";
      }};
    }
  }
`;
