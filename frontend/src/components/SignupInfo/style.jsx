import styled from "styled-components";

export const FormsignupContainer = styled.div`
  display: flex;
  flex-flow: wrap;

  justify-content: center;
`;
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const SignupMSG = styled.div`
  color: ${(props) => props.color};
  font-size: 10px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SignupfileInput = styled.input`
  display: none;
`;
export const SignupInput = styled.input`
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
export const SILabel = styled.label`
  width: ${(props) => props.width};
  font-size: 13px;
  display: flex;
  margin: 0 3px;
  flex-direction: column;
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
export const SITitle = styled.div`
  height: 2rem;
  padding: 16px;
  & > p {
    font-size: 21px;
    font-weight: 600;
  }
`;
export const SICont11 = styled.div``;
export const SICont111 = styled.div`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
`;
export const SICont112 = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;
export const SICont12 = styled.div`
  width: 174px;

  margin: 18px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > p {
    display: inline;
    font-size: 13px;
    & > p {
      display: inline;
      color: #0642ff;
    }
  }
`;
export const SignupButton = styled.div`
  display: flex;
  justify-content: end;
  & > p {
    background: #0642ff;
    padding: 10px;
    font-size: 13px;
    color: white;
    border-radius: 20px;
    max-width: 91px;
    width: -webkit-fill-available;
    text-align: center;
    cursor: pointer;
  }
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
export const SignupSelect = styled.select`
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
export const SIheader = styled.div`
  font-size: 13px;
`;
export const SIindex = styled.div`
  background: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  line-height: 30px;
  margin-right: 13px;
  font-size: 18px;
  font-weight: 600;
`;
export const ViewSelect = styled.div``;
export const ModalPro = styled.div``;
export const NicknameCont = styled.div`
  display: flex;
  align-items: end;
`;
export const NickBox = styled.div``;
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
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 46px 55px;
  height: 26rem;
  background: #f1f0f0;
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
`;
export const CloseModalBtn = styled.button`
  margin-left: auto;
  margin-right: 0.5rem;
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
export const ModalContent = styled.div``;
export const JobClickBlock = styled.div`
  border: 1px solid blue;
  width: 97px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  height: 32px;
  margin-right: 12px;
  cursor: pointer;
  margin-bottom: 12px;
`;
export const JobBlockCont = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-wrap: wrap;
  margin: 28px 0;
`;
export const JobBlock = styled.div`
  width: 97px;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  height: 32px;
  margin-right: 12px;
  margin-bottom: 12px;
`;
export const JobEmoji = styled.div``;
export const JobName = styled.div``;

export const SignupInfoBox = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: lightgrey;
  padding: 1rem 0;
  justify-content: space-around;
  height: auto;
  position: relative;
  bottom: 1rem;
  z-index: -1;
  height: 19rem;
`;
