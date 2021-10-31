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
export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
