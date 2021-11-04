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
    margin: 4rem 12rem 4rem 12rem;
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
  width: 10rem;
  height: 10rem;
  display: inline-block;
  border-radius: 50%;
`;

/* user */

export const UserInfoContainer = styled.div`
  flex: 1.5;
  padding: 2rem;
  & > div:first-child {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  & button {
    border: none;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;
export const UserInfoData = styled.div`
  display: flex;
  background: #f1f1f1;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  padding: 1rem;
`;
export const FeedContainer = styled.div`
  flex: 3;
  padding: 2rem;
`;
export const CategoryBtnBox = styled.div`
  padding: 1rem;
`;
export const FeedGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;
export const FeedBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 7rem;
  background: #f3f3f3;
  border-radius: 1rem;
  padding: 1rem;
`;
export const FeedLabel = styled.div`
  width: 4rem;
  padding: 0.5rem;
  text-align: center;
  background: #c4c4c4;
  border-radius: 2rem;
  transform: translate(0, 50%);
`;
export const FeedTitleBox = styled.div`
  background-color: indigo;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  padding: 1rem;
  & > p:first-child {
    font-size: 0.7rem;
  }
  & > p:nth-child(2) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
export const FeedContentBox = styled.div`
  background-color: tomato;
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;
export const FeedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  & > div {
    display: flex;
    gap: 2rem;
    & > p:nth-child(2) {
      margin-left: auto;
    }
  }
`;
export const FeedButton = styled.div`
  background-color: violet;
  margin-top: auto;
  display: flex;
  justify-content: end;
  gap: 1rem;
`;

/* business Profile */

export const BusinessListBox = styled.div`
  margin: auto;
  display: flex;
  gap: 1rem;
  text-align: center;
  flex-direction: column;
  & > p:first-child {
    font-size: 1.5rem;
  }
  & > div:nth-child(3) {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;
export const BusinessProfile = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  & > div:first-child {
    cursor: pointer;
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
