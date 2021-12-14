import styled from "styled-components";

/* Common */

export const ProfilePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 100vw;
  padding: 3rem 0;
  background: #f3f3f3;
  & > div:first-child {
    width: 80%;
    height: 80%;
  }
`;
export const ModeSelectBtn = styled.button`
  background: #e5e5e5;
  border: none;
  cursor: pointer;
  padding: 0.5rem 4rem;
  border-radius: 0.5rem 0.5rem 0 0;
  font-weight: bold;

  &:disabled {
    background: white;
    color: black;
  }
`;
export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 8.5rem;
  height: 8.5rem;
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
`;

/* user */

export const UserInfoContainer = styled.div`
  flex: 1;
  margin-left: 1.5rem;
  min-width: 18rem;
  /* border: 1px solid #7c7c7c; */
  margin-top: 2rem;
  & > div:first-child {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    & button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 0.8rem;
      background: #c4c4c4;
      color: white;
      cursor: pointer;
    }
  }
`;
export const UserInfoData = styled.div`
  display: flex;
  width: -webkit-fill-available;
  background: #f1f1f1;
  flex-direction: column;
  gap: 0.7rem;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  & > div {
    font-size: 0.8rem;
    display: flex;
    align-items: flex-start;

    & > span:first-child {
      flex: 2.5;
      white-space: nowrap;
      ::before {
        content: "•";
        margin-right: 0.2rem;
      }
    }
    & > span:nth-child(2) {
      flex: 4;
      max-height: 2.5rem;
      ::before {
        content: ":";
        margin: 0 0.2rem;
      }
    }
  }
`;
export const FeedContainer = styled.div`
  flex: 3.5;
  padding: 1rem 1rem 1rem 0;
`;
export const CategoryBtnBox = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  & button {
    cursor: pointer;
    background: white;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #cccccc;
  }
  & button:disabled {
    color: black;
    text-decoration: underline;
    text-decoration-color: #0642ff;
  }
`;

export const NoneDiv = styled.div`
  width: 100%;
  height: 20rem;
  margin-top: 1rem;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  & > button {
    max-width: 11rem;
    line-height: 1.2rem;
    padding: 0.3rem 0.5rem;
    border-radius: 1.2rem;
    border: none;
    background: #0642ff;
    color: #fff;
    cursor: pointer;
  }
  & > p {
    color: #acacac;
    line-height: 1.2rem;
  }
`;
export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

export const FeedBox = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  height: 8rem;
  gap: 1.5rem;
  border: 1px solid #c4c4c4;
  box-sizing: content-box;
  background: ${({ postStatus, status }) => {
    if (status === "like" && postStatus === "COMPLETE") return "#b4b4b4";
    else return "#fff";
  }};
  border-radius: 1rem;
  & > div:first-child {
    width: 100%;
    position: relative;
    flex: 1;
    & > img {
      width: inherit;
      border-radius: 14px 0 0 14px;
      position: absolute;
      object-fit: cover;
      height: 8rem;
    }
    & > div:nth-child(2) {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 1rem 0;
      z-index: 9;
      position: absolute;
      height: 6rem;
      border-radius: 14px 0 0 14px;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    flex: 1;
    padding: 1rem 0;
  }
`;

export const FeedTitle = styled.div`
  padding: 0.5rem 1.5rem 0;
  color: #fff;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  & > p:first-child {
    font-size: 0.8rem;
    height: 1rem;
  }
  & > p:nth-child(2) {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: pre-line;
    height: 3rem;
  }
  & > p:nth-child(3) {
    font-weight: 600;
    height: 1.2rem;
    line-height: 1.1rem;
    font-size: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
  & > p:nth-child(4) {
    font-size: 0.7rem;
  }
`;
export const FeedLabel = styled.div`
  position: absolute;
  width: 3.7rem;
  z-index: 19;
  padding: 0.3rem;
  text-align: center;
  border-radius: 2rem;
  transform: translate(15%, -50%);
  color: ${({ status, postStatus }) => {
    if (status === "approve") return "#7b68ff";
    else if (status === "wait") return "#16b4ab";
    else if (status === "complete") return "#0642ff";
    else if (status === "reject") return "#ff0606";
    else if (status === "like" && postStatus === "RECRUIT") return "#0642ff";
    else return "#000";
  }};
  border: ${({ status, postStatus }) => {
    if (status === "approve") return "1px solid #7b68ff";
    else if (status === "wait") return "1px solid #16b4ab";
    else if (status === "complete") return "1px solid #0642ff";
    else if (status === "reject") return "1px solid #ff0606";
    else if (status === "like" && postStatus === "RECRUIT")
      return "1px solid #0642ff";
    else return "1px solid #000";
  }};
  background: #fff;
  font-size: 0.85rem;
`;

export const FeedContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7rem;
`;
export const FeedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  padding-bottom: 1rem;
  font-size: 0.75rem;
  & > div {
    display: flex;
    align-items: baseline;
    & > div:first-child {
      flex: 1;
    }
    & > div:nth-child(2) {
      flex: 1;
      ::before {
        content: "|";
        color: #c4c4c4;
        margin-right: 1rem;
      }
    }
    & span {
      font-weight: 600;
    }
  }
  & > div:nth-child(2) > div:nth-child(2) > span {
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    ${({ condition }) => {
      return condition
        ? "background-color: rgba(123,104,255,0.1); color:#7b68ff;"
        : "background-color:rgba(124,124,124,0.1); color: #7c7c7c";
    }};
  }
`;

export const FeedButton = styled.div`
  margin: 0 1rem 0.6rem 0;
  display: flex;
  justify-content: end;
  gap: 1rem;
  & > button {
  }
`;

export const WhiteBtn = styled.button`
  color: #0642ff;
  background-color: #fff;
  border: 1px solid #0642ff;
  padding: 0.3rem 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    cursor: default;
    color: #7c7c7c;
    border: 1px solid #7c7c7c;
  }
`;

export const BlueBtn = styled(WhiteBtn)`
  color: #fff;
  background-color: #0642ff;
  &:disabled {
    background: #c4c4c4;
    cursor: default;
    color: #7c7c7c;
    border: none;
  }
`;

/* business Profile */

export const BusinessListBox = styled.div`
  margin: 6rem auto;
  display: flex;
  gap: 1rem;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  & > div:nth-child(2) {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }
`;
export const BusinessHeader = styled.div`
  transform: translate(2rem, 0);
  display: flex;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    & > p:nth-child(1) {
      font-size: 1rem;
      font-weight: 600;
    }
    & > p:nth-child(2) {
      font-size: 0.8rem;
      color: #7c7c7c;
      line-height: 1.3rem;
    }
  }
`;
export const BusinessEditBtn = styled.div`
  width: 3rem;
  & > svg {
    width: 1rem;
    cursor: pointer;
    :hover {
      path {
        fill: #0642ff;
      }
    }
  }
  & > button {
    font-size: 0.8rem;
    border: none;
    background-color: inherit;
    :hover {
      color: #0642ff;
    }
  }
`;

export const BusinessProfile = styled.div`
  width: 10rem;
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export const BImgBox = styled(ImgBox)`
  width: 8rem;
  height: 8rem;
`;
export const DeleteBtn = styled.button`
  position: relative;
  transform: translate(360%, 100%);
  border: none;
  border-radius: 100%;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  & > svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`;
export const AddBProfileBtn = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  & > svg {
    margin: auto;
    width: 4rem;
  }
`;
