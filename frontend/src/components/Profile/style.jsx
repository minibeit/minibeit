import styled from "styled-components";

export const UserInfoContainer = styled.div`
  display: flex;
  min-width: 332px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
export const UserEditBtn = styled.div`
  width: 57px;
  margin-top: 10px;
  cursor: pointer;
  padding: 4px 7px;
  background: white;
  border-radius: 8px;
`;

export const BPContainer = styled.div``;
export const BPbtn = styled.div``;
export const BoxTitle = styled.div``;
export const LBprev = styled.div``;
export const LBnext = styled.div``;
export const BPNewInput = styled.input``;
export const ImgBox = styled.div`
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  display: inline-block;
`;
export const UserImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const EditButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  & > p {
    background: blue;
    color: white;
    padding: 8px 30px;
    border-radius: 25px;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const EditContainer1 = styled.div`
  width: 174px;
  flex: 1;
  margin: 41px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const EditContainer2 = styled.div`
  flex: 2;
  margin: 27px 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const EditInput = styled.input`
  border: none;
  border-radius: 8px;
  padding: 4px 0 8px 5px;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.14px;
  text-align: left;
  margin-top: 7px;
  outline: none;
  color: #707070;
  text-decoration: none;
`;
export const PELabel = styled.label`
  font-size: 13px;
  display: flex;
  margin: 0 3px;
  flex-direction: column;
  flex: ${(props) => props.flex};
`;
export const EditContainerSub = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: ${(props) => props.width};
`;
export const EditFInput = styled.input`
  display: none;
`;
export const FileLabel = styled.label`
  padding: 5px;
  cursor: pointer;
  background: #c4c4c4;
  color: white;
  border-radius: 14px;
  width: 100px;
  font-size: 12px;
  text-align: center;
`;
export const EditSelect = styled.select`
  -webkit-appearance: none;
  height: 32px;
  margin: 0 3px;
  border-radius: initial;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  width: 48px;
  margin-top: 7px;
  letter-spacing: 0.14px;
  text-align: left;
  border: none;
  padding: 0px 0 6px 5px;
  color: #707070;
  outline: none;
  border-radius: 8px;
`;
export const ImgDel = styled.div`
  padding: 5px;
  cursor: pointer;
  background: #c4c4c4;
  color: white;
  border-radius: 14px;
  width: 100px;
  font-size: 12px;
  text-align: center;
  margin: 10px 0px;
`;

export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const BPSubmitBtn = styled.div``;
export const LBCont = styled.div``;
export const LBTitle = styled.div``;
export const LBContent = styled.div``;
export const LBList = styled.div``;

export const PTabCont = styled.div`
  display: flex;
  align-items: end;
  margin: 0 50px;
  & > a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
`;
export const ProfileTab1 = styled.div`
  padding: 7px 52px;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background: #d8d6d6;
  @media only screen and (max-width: 480px) {
    font-size: 13px;
    padding: 10px 22px;
    min-width: 57px;
  }
`;
export const ProfileTab2 = styled.div`
  padding: 7px 52px;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background: #9e9e9e;
  position: relative;
  right: 29px;
  z-index: -1;
  @media only screen and (max-width: 480px) {
    font-size: 13px;
    padding: 10px 23px;
    min-width: 83px;
    right: 18px;
    }
  }
`;
export const PTabContent = styled.div`
  margin: 0 50px;
  display: flex;
  flex-wrap: wrap;
  background: #d8d6d6;
  padding: 30px 30px 57px 30px;
`;
export const PleftBox = styled.div`
  flex: 1;
`;
export const PrightBox = styled.div`
  flex: 2;
`;
export const PrightTab = styled.div`
  display: flex;
  min-width: 371px;
  width: 100%;
  margin-bottom: 21px;
`;
export const PrightTabele = styled.div`
  padding: 0px 9px;
  border-right: 1px solid gray;
  & > p {
    cursor: pointer;
    border-bottom: ${(props) =>
      props.tabIndex === props.index ? "2px solid blue" : null};
  }
`;

export const PrightTopBox = styled.div`
  display: flex;
`;
export const PFavorite = styled.div``;
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
  background: #efefef;
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
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
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
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
