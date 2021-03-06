import styled, { css } from "styled-components";

export const NavBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
  background: white;
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
  min-height: 3.5rem;
  width: 100%;
  display: flex;
  & > div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3.5rem;
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
export const Logo = styled.div`
  font-size: 1.3em;
  color: black;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.5em;
  white-space: nowrap;

  & > img {
    width: 2.3rem;
    height: 2.3rem;
    padding: 0.5em;
  }
`;
export const NavItems = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  margin: 0 auto;
  white-space: nowrap;
  & > a {
    text-decoration: none;
  }
  @media only screen and (max-width: 1000px) {
    margin: 0;
    gap: 0.7rem;
  }
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
export const Items = styled.a`
  color: #595959;
  cursor: pointer;
`;
export const AuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  white-space: nowrap;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
export const ProfileImgBox = styled.div`
  ${({ sideMenu }) =>
    sideMenu
      ? css`
          width: 5em;
          height: 5em;
        `
      : css`
          width: 3em;
          height: 3em;
        `}
  cursor: pointer;
  & > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const LoginBtn = styled.button`
  background: #f8f8f8;
  padding: 0.7em 1.5em;
  border: none;
  color: #7c7c7c;
  font-weight: bold;
  border-radius: 1.5em;
  cursor: pointer;
  &:hover {
    background: #7c7c7c;
    color: #f8f8f8;
  }
`;
export const MobileListBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  @media only screen and (min-width: 700px) {
    display: none;
  }
`;
export const SideMenu = styled.div`
  min-width: 10em;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding: 1.5em;
    border-bottom: 1px solid #c4c4c4;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding: 1.5em;
    & > a {
      text-decoration: none;
    }
  }
`;
