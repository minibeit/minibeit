import styled from "styled-components";

/* Common */

export const ProfilePage = styled.div`
  height: 100vh;
  max-width: 100%;
  width: 100vw;
  background: #f3f3f3;
  overflow: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  & > div:first-child {
    margin: 4rem 12rem;
  }
`;
export const ModeSelectBtn = styled.button`
  background: #e5e5e5;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
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
  min-height: 35rem;
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
  background: #f1f1f1;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  & > p {
    font-size: 0.8rem;
    ::before {
      content: "•";
      margin-right: 0.3rem;
    }
  }
  & > p:nth-child(3) {
    display: flex;
    & > p {
      min-height: 2rem;
    }
    & > span {
      min-width: 2.5rem;
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
  padding-top: 1rem;
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
  padding: 1rem 0;
`;
export const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  min-height: 7rem;
  background: #f3f3f3;
  border-radius: 1rem;
  gap: 1rem;
  padding: 1rem;
`;
export const FeedLabel = styled.div`
  width: 3.7rem;
  padding: 0.3rem;
  text-align: center;
  background: #fff;
  border: 1px solid #0642ff;
  border-radius: 2rem;
  transform: translate(15%, 50%);
  color: #0642ff;
  font-size: 0.85rem;
`;
export const FeedTitleBox = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 0.6rem;
  flex-direction: column;
  & > p:nth-child(2) {
    font-size: 0.7rem;
  }
  & > a:nth-child(3) {
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    color: black;
    max-height: 2.2rem;
  }
`;
export const FeedContentBox = styled.div``;
export const FeedInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  & > div {
    display: flex;
    align-items: center;
    color: #8c8c8c;
    font-size: 0.7rem;
    gap: 0.2rem;
    & > svg {
      width: 1rem;
      height: 1rem;
      path {
        fill: #8c8c8c;
      }
    }
  }
`;
export const FeedButton = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: end;
  gap: 1rem;
  & > button {
    background: #ddd;
    color: #000;
    border: none;
    padding: 0.4rem 0.8rem 0.4rem 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    :hover {
      background: #0642ff;
      color: #fff;
    }
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
  background-color: #f1f1f1;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  & > svg {
    margin: auto;
    font-size: 2rem;
  }
`;
