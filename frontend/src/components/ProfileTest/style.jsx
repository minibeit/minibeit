import styled from "styled-components";

export const ProfilePage = styled.div`
  height: 100vh;
  max-width: 100%;
  width: 100vw;
  background: #f3f3f3;
  overflow: auto;
  & > div:first-child {
    margin: 4rem 12rem 4rem 12rem;
  }
`;
export const Container = styled.div`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
`;
export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
export const FeedContainer = styled.div`
  flex: 3;
  padding: 2rem;
`;
export const CategoryBtnBox = styled.div`
  padding: 1rem;
`;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  display: inline-block;
`;
export const UserImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  width: 3rem;
  padding: 0.3rem;
  text-align: center;
  background: #c4c4c4;
  border-radius: 2rem;
  transform: translate(0, 50%);
`;
export const FeedTitleBox = styled.div``;
export const FeedContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  & > div:nth-child(2) {
    margin-top: auto;
  }
`;
