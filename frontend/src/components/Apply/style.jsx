import styled from "styled-components";

/*filter*/
export const FilterBox = styled.div``;
export const ViewSelect = styled.div``;
export const SelectBtn = styled.button``;
export const FilterSubmitBtn = styled.button``;
export const PaymentSelect = styled.select``;

/*list*/
export const FeedBox = styled.div`
  border: 1px solid grey;
`;
export const FeedTitle = styled.h2``;
export const BookmarkBtn = styled.button`
  background: ${(props) => props.color};
`;
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
