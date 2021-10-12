import styled from "styled-components";

/*filter*/
export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  & > p:first-child {
    color: #0642ff;
    font-size: 30px;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    font-weight: bold;
  }
  & > div:nth-child(3) {
    display: flex;
    gap: 10px;
    width: 30rem;
  }
  ${({ fullScreen }) => {
    if (fullScreen) {
      return `
      position: absolute;
      top: 18rem;
      left: 22rem;
      & > div:nth-child(3) {
        width: 50rem;
      }
      `;
    }
  }}
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
export const FeedBox = styled.div`
  border: 1px solid grey;
`;
export const FeedTitle = styled.h2``;
export const FeedAuthor = styled.div``;
export const FeedInfoData = styled.div`
  display: flex;
`;
export const DataItem = styled.span`
  margin-right: 20px;
`;

/* button */
export const BtnContainer = styled.div``;
export const PageBtn = styled.button`
  &:disabled {
  }
  width: 20px;
`;
