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
  overflow: scroll;
  max-width: 41rem;
  border-radius: 20px;
  padding: 32px 36px;
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
  align-items: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;

  height: -webkit-fill-available;
  padding: 96px 0;
`;
export const BCCont2 = styled.div`
  flex: 1;
  margin-top: 10px;
  & > p {
    cursor: pointer;
    background: blue;
    color: white;
    padding: 10px 37px;
    border-radius: 28px;
  }
`;
export const BCInput = styled.input`
  width: 75%;
  background: lightgray;
  padding: 10px 19px;
  border: none;
  border-radius: 8px;
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
export const BCCont = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 80%;
  & > select {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid blue;
    padding: 11px 27px;
    border-radius: 12px;
    color: blue;
    font-size: 17px;
  }
  & > p {
    font-size: 23px;
  }
  & > svg {
    font-size: 50px;
  }
`;
export const BCSelect = styled.select``;
