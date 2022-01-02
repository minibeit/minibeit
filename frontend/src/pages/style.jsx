import styled from "styled-components";

export const BackGround = styled.div`
  background-color: #fff;
  max-width: 100%;
  min-height: 70vh;
  padding: 2rem 12rem;
  @media only screen and (max-width: 700px) {
    padding: 2rem 2rem;
  }
`;

export const DetailBackGround = styled.div`
  background-color: #fff;
  max-width: 100%;
  min-height: 70vh;
  padding: 2rem 12rem;
  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`;

export const MainBackGround = styled.div`
  background-color: #fff;
  max-width: 100%;
  min-height: 70vh;
`;
export const ProfileBackGround = styled(BackGround)`
  background: #f3f3f3;
`;
