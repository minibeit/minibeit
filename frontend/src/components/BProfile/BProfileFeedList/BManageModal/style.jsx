import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 57%;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
  background-color: white;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  & > p {
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    border-bottom: 3px solid #0642ff;
  }
  & > div:nth-child(2) {
    margin-left: auto;
    & > input {
      margin: 1rem;
    }
  }
`;
export const CloseModalBtn = styled.div`
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
`;
export const ButtonTab = styled.div`
  position: absolute;
  top: -7%;
  left: 3%;
  & > button {
    background: #e5e5e5;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    font-weight: bold;
    &:disabled {
      background: white;
      color: black;
    }
  }
`;
export const InfoTitle = styled.div`
  display: flex;
  width: 100%;
`;
export const DataNavBar = styled.div`
  display: flex;
  & > div:first-child {
    flex: 1;
    display: flex;
    align-items: center;
  }
  & > div:nth-child(2) {
    flex: 5;
  }
`;
export const UserListView = styled.div`
  height: 17rem;
  width: 100%;
  padding: 0 1rem;
  background: #f8f8f8;
  border-radius: 1rem;
  overflow-y: scroll;
  & > div:first-child {
    display: flex;
    padding: 0 0 0.5rem 0;
    position: sticky;
    top: 0;
    left: 0;
    background: #f8f8f8;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const DateInfoBox = styled.div`
  display: flex;
  border-bottom: 1px solid #c4c4c4;
  padding: 0.5rem 0;
  & > div:first-child {
    flex: 1;
  }
  & > div:nth-child(2) {
    flex: 5;
  }
`;
export const UserInfoBox = styled.div`
  display: flex;
  & > div {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    white-space: nowrap;
    text-align: center;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
  & > div:nth-child(3) {
    flex: 0.5;
  }
  & > div:nth-child(4) {
    flex: 2;
  }
  & > div:nth-child(6) {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
