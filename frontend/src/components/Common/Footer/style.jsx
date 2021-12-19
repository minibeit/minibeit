import styled from "styled-components";

export const FooterContainer = styled.div`
  position: relative;
  background: #eee;
  z-index: 0;
  max-height: 10rem;
  padding: 6rem 12rem 3.5rem;
  text-align: center;
  & > div {
    font-size: 0.85rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    height: 1.4rem;
    line-height: 1.4rem;
    & > div:first-child {
      display: flex;
      width: 70%;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      & > div:first-child {
        font-size: 1.2rem;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        & > svg {
          width: 2rem;
          height: 2rem;
        }
      }
      & > div:last-child {
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
    }
    & > div:nth-child(2) {
      border-top: 1px solid rgba(17, 17, 17, 0.16);
      margin-bottom: 2rem;
      display: flex;
      width: 100%;
      padding-top: 1rem;
      color: #7c7c7c;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      display: flex;
      & > p {
        font-weight: 600;
        flex: 1;
        cursor: pointer;
      }
    }
  }
`;
