import styled from "styled-components";

export const ListPageContainer = styled.div`
  margin: 8rem;
`;
/*search filter*/
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
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
`;
export const DateSelect = styled.div`
  width: 25rem;
  height: 38px;
`;

export const FilterBox = styled.div`
  width: 20rem;
  border: 1px solid #c4c4c4;
  text-align: center;
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
`;
export const DetailBox = styled.div``;

export const SelectBtn = styled.button``;

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
  }
  & > div:nth-child(2) {
    margin-left: auto;
  }
  & > div:nth-child(2) > p:nth-child(2) {
    text-align: center;
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
