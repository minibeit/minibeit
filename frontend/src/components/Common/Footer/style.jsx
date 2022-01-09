import styled from "styled-components";

export const FooterContainer = styled.div`
  background: #eee;
  min-height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    flex: 0.78;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1000px) {
    & > div {
      flex: 0.89;
      gap: 0.5rem;
    }
  }
  @media only screen and (max-width: 700px) {
    & > div {
      flex: 0.95;
      gap: 0.5rem;
    }
  }
`;
export const FooterHeader = styled.div`
  display: flex;
  gap: 0.5em 2em;
  align-items: center;
  border-bottom: 1px solid #afafaf;
  padding: 1em;
  flex-wrap: wrap;
  & > p {
    font-size: 0.8em;
    white-space: nowrap;
    cursor: pointer;
  }
  & > a {
    text-decoration: none;
    font-size: 0.8em;
    white-space: nowrap;
    color: #000;
    cursor: pointer;
  }
  & > a > img {
    width: 2em;
  }

  @media only screen and (max-width: 1000px) {
    gap: 0.5em 1em;
  }
`;
export const FooterFooter = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  & > p {
    color: #7c7c7c;
    font-size: 0.8em;
  }
`;
export const FooterIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  & > svg {
    width: 2em;
    height: 2em;
  }
`;
