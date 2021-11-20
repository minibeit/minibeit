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
    color: black;
    text-decoration: none;
  }
`;
export const TitleBookMark = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  & > svg {
    cursor: pointer;
  }
`;
/* Content */
export const ContentBox = styled.div`
  width: 80%;
  padding: 1rem;
`;
export const DataBox = styled.div`
  & > div:nth-child(2) {
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
export const DataHeader = styled.div`
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  & > p:first-child {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 1rem;
  }
`;
export const DataContent = styled.div`
  min-height: 10rem;
  padding: 1rem 0;
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
export const RemoteBox = styled.div`
  width: 20%;
`;
export const Controller = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  position: sticky;
  height: 17rem;
  margin-top: 4rem;
  top: 4rem;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  & > p:first-child {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
  }
`;
export const ApplyData = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 7px;
  & > div {
    padding: 8px;
    font-size: 1rem;
    font-weight: 100;
    & > span {
      font-weight: bold;
    }
  }
  & > div:first-child {
    border-bottom: 1px solid #c4c4c4;
  }
`;
export const ApplyBtnGroup = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > button {
    font-size: 1rem;
    padding: 7px;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
  }
  & > button:first-child {
    background: #0642ff;
    color: white;
    &:disabled {
      background: #c4c4c4;
    }
  }
  & > button:nth-child(2) {
    background: #f1f1f1;
    color: #c4c4c4;
  }
`;

// apply detail imgs slider
export const ApplyImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  width: 430px;
  margin: 30px 0;

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const BigImg = styled.img`
  width: 312px;
  height: 312px;
  border-radius: 5px;
  object-fit: contain;
  background-color: #000;
  cursor: pointer;
`;

export const SmImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 3px;
  object-fit: contain;
  flex-grow: 1;
  border: 1px solid gray;
  box-sizing: border-box;
  background-color: #e9e9e9;
  cursor: pointer;
`;

export const Div = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: rgba(80, 80, 80, 0.6);
  border-radius: 3px;
  font-size: 30px;
  line-height: 100px;
  color: #ffffff;
  text-align: center;
  z-index: 2;
  cursor: pointer;
`;
