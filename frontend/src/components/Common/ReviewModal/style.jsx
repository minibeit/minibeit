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
  padding: 46px 55px;
  height: 26rem;
  background: #f1f0f0;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
`;
export const CloseModalBtn = styled.div`
  margin-left: auto;
  height: -webkit-fill-available;
  & > svg {
    cursor: pointer;
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;
export const ReviewBtn = styled.div``;
export const ReviewContentCont = styled.div`
  flex: 2;
  margin: 30px 0px 0px 0;
  background: lightgray;
  border-radius: 17px;
  padding: 20px;
  & > p {
    font-size: 12px;
  }
`;
export const ReviewDate = styled.div``;
export const ReviewDatecont = styled.div`
  margin-right: 33px;
  & > p {
    font-size: 12px;
  }
`;
export const ReviewInfo = styled.div`
  display: flex;
`;
export const ReviewInput = styled.textarea`
  width: -webkit-fill-available;
  height: 228px;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 1px;
  text-align: left;
`;
export const ReviewInputView = styled.div``;
export const ReviewSecond = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ReviewTime = styled.div``;
export const ReviewTimecont = styled.div``;
export const ReviewTitle = styled.div`
  flex: 2;
  margin-top: 8px;
  & > p {
    font-size: 20px;
    font-weight: 700;
    line-height: 29px;
    border-bottom: 2px solid blue;
  }
`;
export const ReviewTitleCont = styled.div`
  flex: 1;
  margin: 30px 30px 30px 0;
`;
export const ReviewTop = styled.div`
  display: flex;

  height: 80%;
`;
