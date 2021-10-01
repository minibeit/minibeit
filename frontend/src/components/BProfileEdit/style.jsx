import styled from "styled-components";

export const BPEditCont = styled.div``;
export const BNCont2_1 = styled.div`
display: flex;
margin: 7px;
width: -webkit-fill-available;
flex-wrap: wrap;
}
`;
export const BNCont2_2 = styled.div`
  margin: 7px;
  width: 97%;
`;
export const BNCont2_3 = styled.div`
  margin: 7px;
  width: 50%;
`;
export const BNLabel = styled.label`
  font-size: 13px;
  margin: 8px 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const BPEditInput = styled.input`
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
  background: #8080801c;
`;

export const BPEditButton = styled.div`
  display: flex;
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
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  overflow: scroll;
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
export const ModalContent = styled.div`
  flex-wrap: wrap;
  display: flex;
`;
export const BNCont1 = styled.div`
  width: 174px;
  flex: 1;
  margin: 41px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const BNCont2 = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 41px 23px;
  flex: 2;
`;
export const BPEditFileInput = styled.input`
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
