import styled from "styled-components";

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4rem 10rem 4rem 10rem;
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
  flex: 3;
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
  }
`;

/* date & time */
export const DateTimeBox = styled.div``;
export const TimeSelectBox = styled.div``;
export const Navigation = styled.div``;
export const TimeView = styled.div``;

export const DetailContent = styled.div``;
export const EditTextArea = styled.textarea``;
export const Condition = styled.p``;

export const Img = styled.img``;

/* review */
export const ReviewBox = styled.div``;
export const ReviewHeader = styled.div``;
export const ReviewContent = styled.div``;

/* apply remote controller */
export const ApplyRemote = styled.div``;
export const ApplyData = styled.div``;
