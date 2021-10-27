import styled from "styled-components";

export const ListPageContainer = styled.div`
  margin: 4rem 8rem 4rem 8rem;
  & > div:nth-child(2) {
    display: flex;
    gap: 10px;
    & > button {
      background: white;
      border: 1px solid #c4c4c4;
      width: 6rem;
      height: 29px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

/*search filter*/
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  position: initial;
  transform: translate(10%, 90%);
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
  &.move-exit-active {
    width: 30rem;
    transform: translate(0);
    transition: all 500ms;
  }
  &.move-exit-done {
    transform: translate(0);
    width: 30rem;
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
  margin-top: 16px;
  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  text-align: center;
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
