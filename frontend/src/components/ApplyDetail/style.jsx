import styled, { keyframes } from "styled-components";

const fadeOut = keyframes`
from {
 opacity:1;
}
to {
  opacity:0;

}
`;
export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem 10rem;
`;
export const UnderTitle = styled.div`
  position: relative;
  display: flex;
  left: 1rem;
  gap: 1rem;
  & > div:nth-child(2) {
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
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #c4c4c4;
  left: 1rem;
`;
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: inherit;
  & > p:first-child {
    color: #c4c4c4;
    font-size: 1rem;
    font-weight: 700;
    margin: 0.6rem 0;
  }
  & > div:nth-child(2) {
    display: flex;
    width: 100%;
    align-items: center;
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
    & > svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;
export const TitleBookMark = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: ${({ isLike }) => {
    return isLike ? "#0642ff" : "#8c8c8c";
  }};
  cursor: ${({ isLogin }) => {
    return isLogin ? "pointer" : "";
  }};
  & > svg {
    width: 1.2rem;
    height: 1.2rem;
    path {
      fill: ${({ isLike }) => {
        return isLike ? "#0642ff" : "#8c8c8c";
      }};
    }
  }
  & > p:last-child {
    font-size: 0.8rem;
  }
`;
/* Content */
export const ContentBox = styled.div`
  width: 75%;
`;

export const DataBox = styled.div`
  position: relative;
  & > div:first-child {
    border-bottom: 1px solid #c4c4c4;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > p:first-child {
        font-size: 1.5rem;
        font-weight: bold;
        padding: 1rem 1rem 1rem 0;
      }
    }
  }
  & > div:nth-child(2) {
    & > ul {
      margin: 1rem 0;
      list-style: none;
      & > li {
        margin: 1rem 0;
        & > span {
          font-weight: 500;
          font-size: 1rem;
          color: #8c8c8c;
          margin-right: 2rem;
          ::before {
            content: "•";
            color: inherit;
            font-size: inherit;
            margin-right: 0.4rem;
          }
        }
      }
    }
  }
`;

export const ConditionsDataBox = styled(DataBox)`
  position: relative;
  & > div:nth-child(2) {
    & > ul {
      & > li {
        ::before {
          content: "•";
          color: inherit;
          font-size: inherit;
          margin-right: 0.7rem;
        }
      }
    }
  }
`;
export const DataBox2 = styled(DataBox)`
  & > div:nth-child(2) {
    & > ul {
      & > li {
        display: flex;
        & > span {
          margin-right: 1rem;
          min-width: 4rem;
        }
        & > div {
          max-height: 3rem;
        }
      }
    }
  }
`;
export const DataHeader = styled.div`
  border-bottom: 1px solid #c4c4c4;
  & > p:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 1rem 1rem 0;
  }
`;

export const DataContent = styled.div`
  min-height: 8rem;
  padding: 1rem 0;
`;
export const DataContent2 = styled(DataContent)`
  margin-bottom: 2rem;
  & > div:nth-child(2) {
    display: flex;
    align-items: flex-start;
  }
`;
export const SmTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem;
`;

export const EditBtn = styled.button`
  background-color: #0642ff;
  border: 1px solid #0642ff;
  color: #fff;
  border-radius: 1rem;
  height: 1.5rem;
  width: 4.5rem;
  cursor: pointer;
  :hover {
    color: #0642ff;
    background-color: #fff;
    border: 1px solid #0642ff;
  }
`;
/* date & time */
export const TimeSelectBox = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 1.25rem;
  min-height: 19rem;
  display: flex;
  flex-direction: column;
`;
export const Navigation = styled.div`
  flex: 1;
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
  flex: 2.5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  border-radius: 0 0 20px 20px;
  padding: 2rem;
  & > div > button {
    background: white;
    border: none;
    width: 8rem;
    height: 3rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const Xdiv = styled.div`
  & > div {
    background: rgba(0, 0, 0, 0.3);
    width: 8rem;
    height: 3rem;
    border-radius: 1rem;
    z-index: 3;
    position: absolute;
  }
  & > button {
    position: relative;
    background: white;
    border: none;
    width: 8rem;
    height: 3rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const DetailContent = styled.div`
  white-space: pre-line;
  line-height: 1.3rem;
  font-size: 1rem;
`;
export const EditTextArea = styled.textarea`
  width: 80%;
  height: 20em;
`;

export const Img = styled.img`
  width: 100%;
`;

/* review */
export const ReviewItem = styled.div`
  display: flex;
  margin: 1em 0.5em;
  gap: 0.5em;
  & > div:nth-child(3) {
  }
`;
export const ReviewTitle = styled.div`
  display: flex;
  gap: 0.5em;
  & > p {
    font-weight: bold;
    color: #404040;
  }
`;
export const ReviewCount = styled.div`
  display: flex;
  gap: 0.5em;
  & svg {
    width: 1rem;
    & path {
      fill: #0642ff;
    }
  }
  & > p {
    font-weight: bold;
  }
  margin-left: auto;
`;

/* apply remote controller */
export const RemoteBox = styled.div`
  position: relative;
  width: 25%;
  right: 0;
`;

export const Controller = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  position: sticky;
  height: 19rem;
  margin-top: 3.3rem;
  top: 4rem;
  border: 1px solid #c4c4c4;
  border-radius: 1.25rem;
  & > p:first-child {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }
  & > div:nth-child(3) {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem;
    & > div > span {
      margin-right: 0.4rem;
      font-weight: 600;
    }
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
    :hover {
      background: #0642ff;
      color: #fff;
    }
  }
`;

// apply detail imgs slider
export const ApplyImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 27.5rem;
  margin: 4rem 0;

  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const BigImg = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 0.4rem;
  object-fit: contain;
  background-color: #000;
  cursor: pointer;
`;

export const SmImg = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.2rem;
  object-fit: contain;
  flex-grow: 1;
  /* border: 1px solid gray;
  box-sizing: border-box; */
  background-color: #c0bfbf;
  cursor: pointer;
`;
export const NoImg = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 0.2rem;
  object-fit: contain;
  flex-grow: 1;
  background-color: #c0bfbf;
`;
export const Div = styled.div`
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  background-color: rgba(80, 80, 80, 0.6);
  border-radius: 0.2rem;
  font-size: 2rem;
  line-height: 6.25rem;
  color: #ffffff;
  text-align: center;
  z-index: 2;
  cursor: pointer;
`;

export const ViewNum = styled.div`
  animation: ${fadeOut} 5s ease-out;
  font-size: 0.8rem;
  padding: 0.5rem;
  background-color: #e0e8ff;
  border-radius: 0.6rem;
  & > span {
    font-weight: 600;
  }
`;
