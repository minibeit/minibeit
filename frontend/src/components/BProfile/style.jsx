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
  margin-top: 10px;
  padding: 4px 7px;
  background: white;
  border-radius: 8px;
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
export const NicknameBox = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
}
`;
export const BPJoinBtn = styled.div`
  background: lightgray;
  height: 15px;
  padding: 12px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
`;
export const JoinContainer = styled.div`
  background: lightgray;
  border-radius: 10px;
  padding: 17px 22px;
  height: 258px;
`;
export const BPNewNickname = styled.input``;
export const BOtherHead = styled.div`
  display: flex;
  align-items: center;
  & > p {
    background: gray;
    width: fit-content;
    padding: 5px 21px;
    border-radius: 25px;
  }
`;

export const BPContainer = styled.div`
  display: flex;

  flex-direction: column;
`;
export const BPContainer2 = styled.div`
  display: flex;

  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 98px 0px;
`;

export const BPbtn = styled.div`
  height: 12rem;
  display: flex;
  align-items: center;
  & > svg {
    font-size: 35px;
    display: ${(props) => props.display};
    background: white;
    padding: 20px;
    border-radius: 50%;
    cursor: pointer;
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
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ModalContent = styled.div``;
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
export const JoinAssign = styled.div``;
export const JoinInput = styled.div``;
export const BPLeftCont = styled.div`
  flex: 1;
  margin-bottom: 55px;
  display: flex;
  align-items: start;
  justify-content: center;
`;
export const BPRightCont = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 32px;
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
export const IfNoneWordCont = styled.div`
  margin: 15px 0;
  background: white;
  border-radius: 8px;
  height: 88%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > p {
    font-size: 20px;
    color: gray;
  }
`;
export const IfNoneBtn = styled.div`
  background: blue;
  cursor: pointer;
  padding: 7px 13px;
  border-radius: 21px;
  color: white;
  margin: 10px;
`;
export const ListPaging = styled.div``;
