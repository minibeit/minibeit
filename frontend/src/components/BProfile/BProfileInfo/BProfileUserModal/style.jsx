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
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  & > p {
    font-size: 18px;
    font-weight: 500;
  }
`;
export const ModalContent = styled.div``;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const SearchInput = styled.div`
  display: flex;
  margin: 1rem 0;
  & > div:first-child {
    width: 13rem;
  }
`;
export const UserListView = styled.div`
  height: 17rem;
  background: #f8f8f8;
  border-radius: 1rem;
  overflow-y: scroll;
`;
export const UserEditBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem;
  & > button:nth-child(3) {
    margin-left: auto;
  }
`;
export const UserListBox = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;
export const UserBox = styled.div`
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
export const UserDeleteBtn = styled.button`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  border: none;
  & > svg {
    font-size: 1rem;
  }
`;
