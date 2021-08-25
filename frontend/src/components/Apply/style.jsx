import styled from "styled-components";

export const FLTopWrapper = styled.div``;
export const FLTitle = styled.div``;
export const FLSearchBar = styled.input``;

export const FLSectionWrapper = styled.div`
  border: 1px solid black;
  margin: 30px;
`;
export const FLSectionTopWrapper = styled.div``;
export const FLSectionBottomWrapper = styled.div``;
export const FLSectionAuthor = styled.div``;
export const FLSectionDate = styled.div``;
export const FLSectionTitle = styled.div``;
export const FLpageBtn = styled.button``;
export const FLpageSize = styled.input``;
export const FLPageWrapper = styled.div``;
export const FLPageLists = styled.ul``;
export const FLPageNumber = styled.li``;
export const FLPageButton = styled.button``;
export const SchoolBtn = styled.button``;

export const CalendarWrapper = styled.div`
  width: 350px;
  margin: 100px auto 0;
  box-shadow: 1px 2px 3px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;
export const CalendarHead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px 6px 0 0;
  background-color: #1abc9c;
  color: #fff;
`;
export const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;
export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 99px;
  outline: 0;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
export const DateTime = styled.div`
  margin: 0 auto;
  font-size: 18px;
  font-weight: bold;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .day-cell {
    flex: 0 0 calc(100% / 7);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }
  .day-cell {
    &--faded {
      opacity: 0.4;
    }

    &--today {
      border-radius: 99px;
      background-color: #1abc9c;
      color: #fff;
    }
  }
  .checked {
    border-radius: 99px;
    background-color: red;
    color: #fff;
  }
`;

export const DateCell = styled.div`
  flex: 0 0 calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;
