import styled from "styled-components";

export const UserInfoContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 518px;
  justify-content: space-between;
  max-width: 408px;
  flex-direction: column;
  align-items: center;
`;
export const BUserInfoContainer1 = styled.div`
  text-align: center;
`;
export const BUserInfoContainer2 = styled.div`
  text-align: center;
`;
export const BProfileDelete = styled.div`
  width: 57px;
  cursor: pointer;
  padding: 4px 7px;
  background: white;
  border-radius: 8px;
`;
export const BProfileEdit = styled.div`
  width: 57px;
  cursor: pointer;
  padding: 4px 7px;
  background: white;
  border-radius: 8px;
`;
export const BPuser = styled.div``;
export const BPuser2 = styled.div`
  color: red;
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
export const BPuserdelete = styled.div``;

export const UserInfoBox = styled.div`
  max-width: 248px;
  display: flex;
  flex-direction: column;
  padding: 20px 17px 20px 17px;
  border-radius: 8px;
  margin: 11px 0;
  width: 100%;
  background: white;
`;
export const UserInfo = styled.div`
  display: flex;
  padding: 9px;
  & > p:first-child {
    flex: 1;
  }
  & > p:nth-child(2) {
    flex: 1;
  }
`;
export const ImgBox = styled.div`
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
`;
export const UserImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const BPJoinBtn = styled.div``;
export const JoinContainer = styled.div``;
export const BPNewNickname = styled.input``;
export const BOtherHead = styled.div``;

export const BPContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 98px 0px;
`;

export const BPbtn = styled.div`
  background: white;
  width: 65px;
  height: 65px;
  margin-left: 29px;
  border-radius: 50%;
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > svg {
    font-size: 35px;
  }
`;
export const BPNewInput = styled.input``;
export const BPSubmitBtn = styled.div``;
export const BICont = styled.div``;
export const BIContHead2 = styled.div`
  display: flex;
  & > p {
    font-size: 17px;
  }
`;
export const BIContHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 125px;
  justify-content: space-evenly;
  & > p:first-child {
    font-size: 31px;
  }
  & > p:nth-child(2) {
    font-size: 20px;
  }
  & > p:nth-child(3) {
    font-size: 20px;
    font-weight: 700;
  }
`;
export const BIContTitle = styled.div``;
export const BIWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BIEdit = styled.div`
  margin-left: 24px;
  & > p {
    cursor: pointer;
    font-size: 12px;
    border-bottom: 1px solid black;
  }
`;
export const BIList = styled.div``;
export const BIeleCont = styled.div`
  cursor: pointer;
  margin: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const BIeleImg = styled.img``;
export const BIeleName = styled.div`
  height: 36px;
  display: flex;
  align-items: end;
  & > p {
    font-size: 19px;
  }
`;
export const BInew = styled.div``;
export const BIdelete = styled.div`
  position: relative;
  top: 54px;
  left: 131px;
  width: 34px;
  height: 34px;
  background: white;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
  display: ${(props) => props.display};
`;
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
  background-color: white;
  width: 20rem;
  height: 15rem;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
`;
export const CloseModalBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
`;
export const ModalContent = styled.div``;
export const JoinBox1 = styled.div``;
export const JoinBox2 = styled.div``;
export const JoinEdit = styled.div``;
export const JoinAssign = styled.div``;
export const JoinInput = styled.div``;
export const BPLeftCont = styled.div`
  flex: 1;
`;
export const BPRightCont = styled.div`
  flex: 2;
`;

export const BoxTitle = styled.div``;
export const BPrightTab = styled.div`
  display: flex;
  min-width: 371px;
  width: 100%;
  margin-bottom: 21px;
`;
export const BPrightTabele = styled.div`
  padding: 0px 9px;
  border-right: 1px solid gray;
  & > p {
    cursor: pointer;
    border-bottom: ${(props) =>
      props.tabIndex === props.index ? "2px solid blue" : null};
  }
`;
export const IfNoneWordCont = styled.div``;
export const ListPaging = styled.div``;
