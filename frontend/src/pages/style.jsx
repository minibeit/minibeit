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
  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

export const MainBackGround = styled.div`
  background-color: #fff;
  max-width: 100%;
  min-height: 70vh;
`;
export const ProfileBackGround = styled.div`
  background: #f3f3f3;
  padding: 2rem 12rem;
  @media only screen and (max-width: 1000px) {
    padding: 2rem 8rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 2rem 2rem;
  }
`;

export const NotFound = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 1.5rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 700px) {
    height: 50vh;
  }
`;
