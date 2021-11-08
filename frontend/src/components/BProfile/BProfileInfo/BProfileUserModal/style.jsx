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
export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
`;
export const BPuser = styled.div`
  margin: 5px;
  padding: 5px 10px;
  background: white;
  border-radius: 8px;
`;
export const BPuser2 = styled.div`
  color: red;
  margin: 5px;
  padding: 5px 10px;
  background: white;
  border-radius: 8px;
`;
export const BPjoin = styled.div`
  & > p {
    white-space: pre;
    color: white;
    background: blue;

    padding: 13px 96px;
    border-radius: 10px;
    cursor: pointer;
  }
`;
export const BPuserdelete = styled.div`
  position: relative;
  top: 21px;
  & > svg {
    font-size: 18px;
    background: gray;
    padding: 3px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
export const JoinContainer = styled.div`
  background: lightgray;
  border-radius: 10px;
  padding: 17px 22px;
  height: 258px;
`;
export const BPJoinBtn = styled.div`
  background: lightgray;
  height: 15px;
  padding: 12px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
`;
export const JoinAssign = styled.div``;
export const JoinInput = styled.div``;
export const JoinBox1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const JoinEditCont = styled.div`
  display: flex;
`;
export const JoinBox2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 227px;
  margin: 10px 0;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
export const JoinEdit = styled.div`
  margin-left: 12px;
  & > p {
    font-size: 13px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
`;
