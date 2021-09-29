import styled from "styled-components";

export const ProfileTab1 = styled.div`
  padding: 7px 52px;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background: #9e9e9e;
  @media only screen and (max-width: 480px) {
    font-size: 13px;
    padding: 10px 22px;
    min-width: 60px;
  }
`;
export const ProfileTab2 = styled.div`
  padding: 7px 52px;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background: #d8d6d6;
  position: relative;
  right: 29px;
  z-index: 2;
  @media only screen and (max-width: 480px) {
    font-size: 13px;
    padding: 10px 23px;
    min-width: 83px;
    right: 18px;
  }
`;
export const BTabCont = styled.div`
  display: flex;
  align-items: end;
  margin: 0 50px;
  & > a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
`;
export const BTabContent = styled.div`
  margin: 0 50px;
  background: #d8d6d6;
  padding: 30px 30px 57px 30px;
`;
export const TabBox = styled.div`
  display: flex;
`;
