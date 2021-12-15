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
`;
export const SImgBox = styled(ImgBox)`
  width: 6.5rem;
  height: 6.5rem;
`;

/* user */

export const UserInfoContainer = styled.div`
  flex: 1.5;
  padding: 1rem;
  min-width: 18rem;
  margin-top: 1rem;
  & > div:first-child {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
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
    display: flex;
    align-items: flex-start;
    font-size: 0.8rem;

    & > span:first-child {
      flex: 2.5;
      ::before {
        content: "•";
        margin-right: 0.2rem;
      }
    }
    & > span:nth-child(2) {
      flex: 5;
      max-height: 3.5rem;
      ::before {
        content: ":";
        margin-right: 0.2rem;
      }
    }
  }
`;

export const UserListBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 0.8rem;
  background: #0642ff;
  color: white;
  cursor: pointer;
`;
export const InfoEditBtn = styled(UserListBtn)`
  background: #c4c4c4;
`;
export const FeedContainer = styled.div`
  flex: 3;
  padding: 3rem;
`;
export const CategoryBtnBox = styled.div`
  margin-top: 1rem;
  padding: 1rem 0;
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
  }
`;
export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;
export const FeedBox = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  height: 8rem;
  gap: 1.5rem;
  border: 1px solid #c4c4c4;
  box-sizing: content-box;
  background: #fff;
  border-radius: 1rem;
  & > div:first-child {
    width: 100%;
    position: relative;
    flex: 1;
    transform: translateY(-1px);
    & > img {
      width: inherit;
      border-radius: 14px 0 0 14px;
      position: absolute;
      object-fit: cover;
      height: calc(8rem + 2px);
    }
    & > div:nth-child(2) {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 1rem 0;
      z-index: 9;
      position: absolute;
      height: calc(6rem + 2px);
      border-radius: 14px 0 0 14px;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    flex: 1;
    padding: 1rem 0;
  }
`;
export const FeedLabel = styled.div`
  width: 3.7rem;
  padding: 0.3rem;
  text-align: center;
  background: #fff;
  position: absolute;
  z-index: 90;
  border: ${({ status }) => {
    return status === "생성한 모집공고"
      ? "1px solid #1ae5da"
      : "1px solid #7b68ff";
  }};
  border-radius: 2rem;
  transform: translate(15%, -50%);
  color: ${({ status }) => {
    return status === "생성한 모집공고" ? "#1ae5da" : "#7b68ff";
  }};
  font-size: 0.85rem;
`;

export const FeedTitle = styled.div`
  padding: 0.5rem 1.5rem 0;
  color: #fff;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  & > div:first-child {
    display: flex;
    font-size: 0.8rem;
    height: 1rem;
    align-items: baseline;
    gap: 0.2rem;
    & > svg {
      width: 0.7rem;
      path {
        fill: #fff;
      }
    }
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
  }
  & > p:nth-child(4) {
    font-size: 0.7rem;
  }
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
  gap: 0.4rem;
  justify-content: flex-start;
  padding-bottom: 1rem;
  font-size: 0.75rem;
  & > div {
    display: flex;
    align-items: baseline;
    & span {
      margin-left: 0.5rem;
      font-weight: 600;
    }
  }
`;

export const FeedButton = styled.div`
  margin: 0 1rem 0.6rem 0;
  display: flex;
  justify-content: end;
  gap: 1rem;
  & > button {
    width: 8rem;
  }
`;

export const WhiteBtn = styled.button`
  color: #0642ff;
  background-color: #fff;
  border: 1px solid #0642ff;
  padding: 0.3rem 0.5rem;
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

/* profile list */

export const BusinessListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > p {
    width: 7rem;
    padding: 0.5rem;
    text-align: center;
    background: #c4c4c4;
    border-radius: 2rem;
  }
  & > div {
    display: flex;
    gap: 4rem;
    justify-content: flex-start;
  }
`;

export const BusinessProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-items: center;
  text-align: center;
  & > div:first-child {
    cursor: pointer;
    & > p {
      font-size: 0.9rem;
      margin: 0.7rem;
    }
  }
`;

export const AddBProfileBtn = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  & > svg {
    margin: auto;
    width: 3rem;
    height: 3rem;
  }
`;
