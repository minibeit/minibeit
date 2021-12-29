import styled from "styled-components";

export const NavBar = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 99;
  background: white;
  box-shadow: 10px 10px 30px 0px #bdbdbd33;
  min-height: 3.5rem;
  width: 100%;
`;
export const Logo = styled.div`
  font-size: 1.7em;
  color: black;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.5em;
`;
export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 1em;
  cursor: pointer;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
export const Items = styled.div`
  color: #595959;
`;
export const AuthBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1em;
  gap: 1em;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
export const ProfileImg = styled.div`
  background-image: ${({ img }) =>
    img !== "noImg" ? `url(${img})` : 'url("/images/기본프로필.png")'};
  height: 3em;
  width: 3em;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
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
export const MobileListBtn = styled.div``;
