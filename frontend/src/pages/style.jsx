import styled from "styled-components";

export const BackGround = styled.div`
  background-color: #fff;
  max-width: 100%;
  min-height: 70vh;
  padding: 5rem 20rem;
  @media only screen and (max-width: 1000px) {
    padding: 5rem 10rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 2rem;
  }
`;

export const ProfileBackGround = styled(BackGround)`
  background: #f3f3f3;
`;
