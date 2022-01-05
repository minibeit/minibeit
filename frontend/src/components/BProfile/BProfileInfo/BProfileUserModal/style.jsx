import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 57%;
  max-width: 41rem;
  border-radius: 1.25rem;
  padding: 2rem 2.25rem;
  height: 26rem;
  background-color: white;
  @media only screen and (max-width: 700px) {
    max-width: 22rem;
    width: 75%;
    padding: 1rem 1.5rem;
    height: 20rem;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
  & > p {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
export const ModalContent = styled.div``;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`;
export const SearchInput = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 0.5rem;

  & > div:first-child {
    width: 13rem;
  }
  & > button:last-child {
    padding: 0 0.3rem;
    width: 3rem;
    border: 1px solid hsl(0, 0%, 80%);
    background-color: #fafafa;
    border-radius: 0.5rem;
    color: hsl(0, 0%, 80%);
    cursor: pointer;
    :hover {
      color: #0642ff;
      border-color: #0642ff;
    }
  }
`;
export const UserListView = styled.div`
  height: 17rem;
  background: #f8f8f8;
  border-radius: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  @media only screen and (max-width: 700px) {
    height: 12rem;
  }
`;
export const UserEditBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 1rem;
  & > p:first-child {
    font-size: 0.8rem;
  }
  & > button:nth-child(2) {
    margin-right: auto;
    border: none;
    background-color: inherit;
    cursor: pointer;

    :hover {
      color: #0642ff;
    }
    & > svg {
      width: 0.8rem;
      height: 0.8rem;
      :hover {
        path {
          fill: #0642ff;
        }
      }
    }
  }
  & > button:nth-child(3) {
    margin-left: auto;
    border: none;
    background-color: inherit;
    cursor: pointer;
    :hover {
      color: #0642ff;
    }
  }
`;
export const UserListBox = styled.div`
  display: flex;
  margin: 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
  & > div {
    display: flex;
    justify-content: end;
  }
`;
export const UserBox = styled.div`
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: ${({ color }) => (color === "true" ? "0" : "1px")};
  border: 1px solid ${({ color }) => (color === "true" ? "#0642ff" : "none")};
  cursor: pointer;
`;
export const UserDeleteBtn = styled.button`
  position: absolute;
  transform: translate(0.3rem, -0.3rem);
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  padding: 0;
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
  }
`;
