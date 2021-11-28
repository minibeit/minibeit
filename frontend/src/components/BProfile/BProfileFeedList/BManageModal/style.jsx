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
  border-radius: 1.25rem;
  padding: 2rem 2.25rem;
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
  flex-direction: column;
  gap: 0.5rem;
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    & > p {
      padding: 0.5rem 0.5rem 0 0;
      font-weight: bold;
      font-size: 1.5rem;
      height: 2rem;
      border-bottom: 3px solid #0642ff;
    }
  }
  & > div:nth-child(3) {
    margin-left: auto;
  }
`;
export const CalendarBtn = styled.button`
  margin: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    :hover {
      path {
        fill: #0642ff;
      }
    }
  }
`;
export const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  transform: translate(-73%, -5%);
`;
export const CloseModalBtn = styled.div`
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  cursor: pointer;
  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;
export const InfoTitle = styled.div`
  display: flex;
  width: 100%;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
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
export const UserListView = styled.div`
  width: 100%;
  padding: 0 1rem;
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
    overflow-y: scroll;
    border-radius: 1rem;
    max-height: 17rem;
    padding: 0 0 0 1rem;
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
    & > div:first-child {
      margin: 0.7rem 0.5rem 0.3rem;
      font-size: 0.8rem;
    }
  }
`;
export const DataNavBar1 = styled.div`
  font-size: 0.7rem;
  z-index: 99;
  padding-bottom: 0.5rem;
  color: #5e5e5e;
  width: 78%;
  position: relative;
  left: 22.5%;
  & > div:first-child {
    display: flex;
    gap: 1rem;
    text-align: center;
    align-items: center;
    & > div {
      width: 3rem;
    }
    & > div:nth-child(2) {
      width: 5rem;
    }
    & > div:nth-child(3) {
      width: 1.7rem;
    }
    & > div:nth-child(4) {
      width: 5rem;
    }
    & > div:nth-child(5) {
      width: 3.5rem;
    }

    & > div:nth-child(6) {
      width: 7rem;
    }
  }
`;
export const DataNavBar = styled.div`
  display: flex;
  z-index: 99;
  padding: 0.5rem;
  background-color: inherit;
  flex: 1;
  & > div:first-child {
    display: flex;
    flex: 1;
  }
  & > div:nth-child(2) {
    display: flex;
    flex: 5;
  }
`;

export const DateInfoBox = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  font-size: 0.9rem;
  & > div:first-child {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    position: sticky;
    margin: 0.2rem auto;
    background-color: #c4c4c4;
    border-radius: 1rem;
    height: 1.7rem;
  }
  & > div:nth-child(2) {
    flex: 5;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 2rem;
    gap: 0.3rem;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      & > div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex: 1;
        & > div {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
`;
export const UserInfoBox = styled.div`
  display: flex;
  gap: 1.5rem;
  z-index: 99;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

export const Btn = styled.button`
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  border: ${({ attend }) =>
    attend === false ? "1px solid #0642ff" : "1px solid white"};
  color: ${({ attend }) => (attend === false ? "#0642ff" : "white")};
  background: ${({ attend }) => (attend === false ? "white" : "#0642ff")};
  cursor: pointer;
  &:disabled {
    background: none;
    color: #b0b0b0;
    cursor: inherit;
  }
`;

export const RejectInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & > p {
    white-space: nowrap;
  }
  & > div {
    flex: 1;
    background: white;
    display: flex;
    & > input {
      flex: 1;
      border: none;
    }
    & > button {
      background: white;
      border: none;
      padding: 0.5rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
