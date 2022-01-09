import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 57%;
  max-width: 41rem;
  border-radius: 1.25rem;
  padding: 1.5rem 2rem;
  height: 26rem;
  background-color: white;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  @media only screen and (max-width: 700px) {
    width: 80%;
    padding: 1rem;
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
    margin: 1rem 0;
    & > p {
      padding: 0.5rem 0.5rem 0 0;
      font-weight: bold;
      font-size: 1.5rem;
      height: 2rem;
      border-bottom: 3px solid #0642ff;
      margin-left: 1rem;
    }
  }
  & > div:nth-child(3) {
    margin-left: auto;
  }

  @media only screen and (max-width: 700px) {
    gap: 0;
    & > div:nth-child(2) {
      margin: 0.3rem 0 1rem;
      & > div > div {
        transform: translate(-77%, 2%);
      }
    }
  }
`;
export const CalendarBtn = styled.button`
  margin: 1rem 0.5rem;
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

export const ModalContent = styled.div`
  background: #f8f8f8;
  height: 19em;
  overflow-y: scroll;
  overflow-x: hidden;
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

export const UserListView = styled.div``;
export const ManageTable = styled.table`
  width: 100%;
  & td {
    font-size: 0.9em;
  }
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  background: white;
  & > tr:first-child {
    transform: translate(0px, -2px);
    & td {
      text-align: center;
      border: none;
    }
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
  & > tr:nth-child(2) td {
    padding: 0.5em;
    transform: translate(0px, -1px);
    background: #f8f8f8;
    @media only screen and (max-width: 700px) {
      background: none;
    }
  }
`;
export const DateView = styled.td`
  text-align: start;
`;
export const TimeView = styled.td`
  background: ${({ display }) => (display === 0 ? "white" : "none")};
  color: #0642ff;
  border-radius: 1em;
  @media only screen and (max-width: 700px) {
    padding: 0.5em;
    margin: 0.5em;
    position: sticky;
    top: 0;
  }
`;
export const TableRow = styled.tr`
  @media only screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
  & > td {
    @media only screen and (max-width: 700px) {
      padding: 0.2em 0;
    }
  }
`;

export const TableBody = styled.tbody`
  & td {
    text-align: center;
  }
  &::after {
    content: "";
    display: block;
    height: 1em;
  }
`;
export const RejectInput = styled.td`
  & > input {
    width: 50%;
    border: white;
    padding: 0.2em;
    @media only screen and (max-width: 700px) {
      width: auto;
    }
  }
  & > button {
    padding: 0.2em 0.7em;
    border: none;
    background: white;
    color: #c4c4c4;
    cursor: pointer;
  }
  @media only screen and (max-width: 700px) {
    transform: translate(8em, 0.5em);
  }
`;

export const Btn = styled.button`
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  margin: 0 0.2em;
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
