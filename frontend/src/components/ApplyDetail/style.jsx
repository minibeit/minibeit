import styled from "styled-components";

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem 12rem;
  & > div:nth-child(2) {
    position: relative;
    display: flex;
    left: 1rem;
    padding: 1rem 0;
    gap: 1rem;
  }
`;
/* Title */
export const TitleBox = styled.div`
  position: relative;
  display: flex;
  padding: 1rem 1rem 1rem 0;
  border-bottom: 1px solid #c4c4c4;
  left: 1rem;
`;
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  & > p:first-child {
    color: #c4c4c4;
    font-weight: 700;
    margin: 0.6rem 0;
  }
  & > div:nth-child(2) {
    display: flex;
    width: 38.25rem;
    justify-content: space-between;
    & > p:first-child {
      font-size: 2rem;
      font-weight: 700;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    gap: 0.5rem;
  }
`;
export const TitleBookMark = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  & > svg {
    cursor: pointer;
  }
  & > p:last-child {
    font-size: 0.7rem;
  }
`;
/* Content */
export const ContentBox = styled.div`
  width: 70%;
`;
export const DataBox = styled.div`
  & > div:nth-child(2) {
    & > ul {
      margin: 1rem;
      list-style: disc;
      & > li {
        margin: 0.8rem 0;
        & > span {
          font-weight: 500;
          color: #8c8c8c;
          margin-right: 2rem;
        }
      }
    }
  }
`;
export const DataBox2 = styled.div`
  & > div:nth-child(2) {
    & > ul {
      margin: 1rem;
      list-style: disc;
      & > li {
        margin: 0.8rem 0;
        & > span {
          font-weight: 500;
          color: #8c8c8c;
          margin-right: 1rem;
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
    padding: 1rem 1rem 1rem 0;
  }
`;
export const DataContent = styled.div`
  min-height: 10rem;
  padding: 1rem 0;
`;

export const SmTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem;
`;

export const EditBtn = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  :hover {
    color: #0642ff;
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
export const EditTextArea = styled.textarea`
  width: 80%;
  height: 20em;
`;

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
  position: relative;
  width: 30%;
  right: 0;
`;
export const Controller = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  position: sticky;
  height: 17rem;
  margin-top: 4.3rem;
  top: 4rem;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  & > p:first-child {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }
`;
export const ApplyData = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 7px;
  & > div {
    padding: 0.7rem;
    font-size: 0.8rem;
    font-weight: 200;
    & > span {
      font-weight: bold;
      margin: 0 0.7rem;
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
