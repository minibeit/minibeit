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

//not found page
export const NotFound = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  position: relative;
  & > svg {
    width: 2.2rem;
    path {
      fill: #0642ff;
    }
  }

  & > button {
    border: none;
    background-color: #0642ff;
    padding: 0.7rem 2rem;
    font-weight: 700;
    cursor: pointer;
    color: #fff;
    border-radius: 1.2rem;
  }

  @media only screen and (max-width: 700px) {
    height: 45vh;
  }
`;

export const Txt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  & > p:first-child {
    font-size: 1.5rem;
    font-weight: 700;
  }
  & > p:nth-child(2) {
    font-size: 0.9rem;
    color: #7c7c7c;
    line-height: 1.2rem;
  }
`;
