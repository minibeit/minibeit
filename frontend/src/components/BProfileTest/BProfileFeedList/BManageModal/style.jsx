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
export const ModalTab = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 12.5rem;
  width: 64%;
  left: 50%;
  height: 3rem;
  z-index: 4;
  max-width: 45.5rem;
  display: flex;
`;
export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 29rem;
  left: 50%;
  width: 57%;
  max-width: 41rem;
  border-radius: 0 20px 20px 20px;
  padding: 32px 36px;
  height: 26rem;
  background-color: white;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;

  & > p {
    font-size: 22px;
    font-weight: 600;
    border-bottom: 3px solid blue;
  }
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
`;
export const ModalContent = styled.div`
  height: 90%;
`;
export const ModalTopContent = styled.div``;
export const ModalSecondContent = styled.div`
  height: 100%;
`;
export const ModalSecondTopBox = styled.div`
  display: flex;
  padding-left: 140px;
  padding-right: 140px;
  height: 7%;
  align-items: center;
  & > p {
    flex: 1;
  }
`;
export const ModalSecondBottomBox = styled.div`
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background: lightgray;
  border-radius: 12px;
  height: 93%;
  display: flex;
  width: -webkit-fill-available;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;
export const BMperson = styled.div`
  display: flex;
  width: -webkit-fill-available;
  & > p {
    flex: 1;
  }
`;
export const BMDate = styled.input`
  border: none;
  cursor: pointer;
`;
export const BMBtnWrapper = styled.div`
  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  width: 140px;
  display: flex;
  justify-content: space-between;
  & > div > p {
    background: blue;
    padding: 4px 20px 2px 20px;
    color: white;
    border-radius: 22px;
    white-space: pre;
  }
`;
export const BMBtn = styled.div`
  & > p {
    cursor: pointer;
    background: white;
    padding: 5px 5px;
    margin-top: 7px;
    border-radius: 0 8px 8px 0;
  }
`;
export const BMBtn2 = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.state};
  padding: 0 35px;
  border-radius: 8px 8px 0px 0px;
`;
export const BMTime = styled.div`
  margin-right: 10px;
  align-items: start;
  display: flex;
  & > p {
    padding: 3px 10px;
    background: gray;
    border-radius: 15px;
  }
`;
export const BMTimeBox = styled.div`
  display: flex;
  width: 95%;
  padding: 19px 0;
  border-bottom: 1px solid #969696;
`;
export const BMBoxCont = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;
export const BMrejectbox = styled.div`
  display: flex;
  align-items: center;
  & > p {
    margin-right: 10px;
  }
`;
export const BMrejectInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 8px 0 0 8px;
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
