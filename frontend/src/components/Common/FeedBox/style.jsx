import styled from "styled-components";

export const FeedTag = styled.div``;
export const FeedCont = styled.div`
  background: white;
  padding: 16px 11px;
  border-radius: 8px;
  display: flex;
  margin: 16px 0;
`;
export const FeedTitle = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: baseline;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  & > p:first-child {
    font-size: 12px;
  }
  & > p {
    white-space: pre;
  }
`;
export const FeedContent = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
`;
export const Over = styled.div``;
export const FeedBtn = styled.div`
align-self: end;
& >p {
  background: blue;
  padding: 7px 22px;
  color: white;
  border-radius: 21px;
  white-space: pre;
  cursor: pointer;
}
}
`;
export const Notyet = styled.div``;
export const FeedDateNum = styled.div`
  display: flex;
  & > p {
    white-space: pre;
    margin-right: 7px;
  }
`;
export const FeedTimeCheck = styled.div`
  display: flex;
  & > p {
    white-space: pre;
    margin-right: 7px;
  }
`;
export const BtnCont = styled.div`
  align-self: end;
`;

export const FeedBookmark = styled.div``;
export const FeedBookmarkCont = styled.div``;
export const FeedWrap = styled.div``;
export const Review = styled.div``;
