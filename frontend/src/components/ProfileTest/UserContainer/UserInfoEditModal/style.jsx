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
  background: #efefef;
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
  height: 26rem;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
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
export const SignupNickBtn = styled.div`
  height: 15px;
  width: 21px;
  cursor: pointer;
  font-size: 11px;
  background: white;
  padding: 8px;
  border-radius: 9px;
  color: #0642ff;
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
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const NickBox = styled.div``;
export const NicknameCont = styled.div`
  display: flex;
  align-items: end;
`;
export const SignupMSG = styled.div`
  color: ${(props) => props.color};
  font-size: 10px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
