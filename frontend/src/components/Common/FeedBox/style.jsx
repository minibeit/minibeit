import styled from "styled-components";

export const FeedTag = styled.div`
  position: relative;
  top: 24px;
  & > p {
    background: lightgray;
    width: fit-content;
    white-space: pre;
    padding: 2px 10px;
    border-radius: 21px;
    border: 1px solid gray;
    font-size: 12px;
    z-index: 3;
  }
`;
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
export const Over = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > p {
    white-space: pre;
  }
  & > p:first-child {
    margin-right: 10px;
  }
`;
export const FeedBtn = styled.div`
align-self: end;
margin-left: 12px;
margin-top: 28px;
& >p {
  font-size: 13px;
  background: blue;
  padding: 5px 17px;
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
  flex-wrap: wrap;
  & > p {
    white-space: pre;
    margin-right: 7px;
  }
  & > p:nth-child(2n + 1) {
    font-size: 12px;
  }
`;
export const FeedTimeCheck = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > p {
    white-space: pre;
    margin-right: 7px;
  }
  & > p:nth-child(2n + 1) {
    font-size: 12px;
  }
`;
export const BtnCont = styled.div`
  align-self: end;
  display: flex;
`;

export const FeedBookmark = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
  & > p {
    margin: 0 5px;
  }
`;
export const FeedBookmarkCont = styled.div``;
export const FeedWrap = styled.div``;
export const Review = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > p {
    white-space: pre;
    margin-right: 7px;
  }
  & > p:nth-child(2n + 1) {
    font-size: 12px;
  }
`;
