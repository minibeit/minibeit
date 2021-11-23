import styled from "styled-components";

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 99;
  background: white;
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
  min-height: 3.5rem;
`;
export const NavBarLogoContainer = styled.div`
  display: flex;
  & > a {
    text-decoration: none;
    padding: 10px 20px;
    margin: auto;
    & > p {
      font-size: 22px;
      color: black;
      font-weight: 700;
    }
  }
`;
export const NavBarMenuContainer = styled.div`
  display: flex;
  align-items: center;
  & > a > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
export const NavBarMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  & > a {
    text-decoration: none;
    color: black;
  }
`;
export const NavBarAuth = styled.div`
  margin: 0px 12px;
  & > p {
    padding: 7px 14px;
    background: gray;
    color: white;
    border-radius: 7px;
    cursor: pointer;
  }
`;
