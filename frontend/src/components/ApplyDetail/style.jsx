import styled from "styled-components";

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4rem 12rem 4rem 12rem;
  & > div:nth-child(2) {
    display: flex;
  }
`;
/* Title */
export const TitleBox = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #c4c4c4;
`;
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > p:first-child {
    color: #c4c4c4;
    font-weight: 600;
  }
  & > p:nth-child(2) {
    font-size: 2rem;
    font-weight: 600;
  }
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
  }
`;
export const TitleBookMark = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
/* Content */
export const ContentBox = styled.div`
  width: 75%;
  padding: 1rem;
`;
export const DataBox = styled.div`
  & > p:first-child {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 1rem;
    border-bottom: 1px solid #c4c4c4;
  }
  & > div:nth-child(2) {
    padding: 1rem;
    & > ul {
      margin: 0 1rem 0 1rem;
      list-style: disc;
      & > li {
        margin: 0.5rem 0 0.5rem 0;
        & > span {
          font-weight: bold;
        }
      }
    }
  }
`;

/* date & time */
export const TimeSelectBox = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 20px;
`;
export const Navigation = styled.div`
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 1rem;
    & > svg {
      font-size: 2.5rem;
      color: #aaaaaa;
      cursor: pointer;
    }
  }
`;
export const TimeView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background: #f5f5f5;
  border-radius: 0 0 20px 20px;
  padding: 1rem;
  & > button {
    background: white;
    border: none;
    width: 8rem;
    height: 3rem;
    border-radius: 15px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const DetailContent = styled.div``;
export const EditTextArea = styled.textarea``;

export const Img = styled.img`
  width: 100%;
`;

/* review */
export const ReviewBox = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > div:first-child {
    display: flex;
    gap: 2rem;
    & > p:first-child {
      font-weight: bold;
      color: grey;
    }
    & > p:nth-child(2) {
      color: grey;
    }
  }
`;

/* apply remote controller */
export const ApplyRemote = styled.div``;
export const ApplyData = styled.div``;
