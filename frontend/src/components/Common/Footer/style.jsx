import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  z-index: -1;
  background: white;
  min-height: 5.5rem;
  margin: 0 12rem;
  border-top: 1px solid rgba(17, 17, 17, 0.16);
  text-align: center;
  color: #838383;

  & > div {
    font-size: 0.7rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding-top: 0.5rem;
    & > div:first-child {
      display: flex;
      gap: 1rem;
      & > a {
        cursor: pointer;
        & > img {
          width: 2rem;
          height: 2rem;
        }
      }
    }
    & > div:nth-child(3) {
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;
    }
  }
`;
