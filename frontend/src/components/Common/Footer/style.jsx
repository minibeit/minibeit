import styled from "styled-components";

export const FooterContainer = styled.div`
  background: #eee;
  min-height: 10em;
  & > div {
    max-width: 53em;
    margin: auto;
  }
`;
export const FooterHeader = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  border-bottom: 1px solid #afafaf;
  padding: 1em;
  flex-wrap: wrap;
  & > p {
    font-size: 0.8em;
    white-space: nowrap;
    cursor: pointer;
  }
  & > a > img {
    width: 2em;
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
