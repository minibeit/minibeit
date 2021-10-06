import styled from "styled-components";

export const FNBottomWrapper = styled.div``;
export const FNTitle = styled.input``;
export const FNSchool = styled.select``;
export const FNType = styled.div``;
export const FNauthor = styled.select``;
export const FNdueDate = styled.input``;
export const FNdoDate = styled.input``;
export const FNpayment = styled.select``;
export const FNcache = styled.input``;
export const FNdoTime = styled.select``;
export const FNcondition = styled.select``;
export const FNconditionDetail = styled.input``;
export const FNcontact = styled.input``;
export const FNplace = styled.input``;
export const FNFile = styled.input``;
export const FNdetailInfo = styled.textarea``;
export const FNcreateBtn = styled.button``;
export const FNLabel = styled.label``;

/* DateSelect */
export const DateBox = styled.div`
  display: flex;
`;
export const HeadCountBox = styled.div`
  display: flex;
`;
export const DoTimeBox = styled.div`
  display: flex;
`;
export const StartEndTimeBox = styled.div`
  display: flex;
`;

/* TimeSelect */
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
  width: 50rem;
  height: 30rem;
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
export const ModalContent = styled.div`
  display: flex;
`;
export const CalendarView = styled.div``;
export const GroupBox = styled.div``;
export const GroupBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border: 0.5px solid grey;
  cursor: pointer;
  background: ${(props) => props.color || "white"};
  border-radius: 50%;
`;
export const ColorView = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => props.color || "none"};
`;
export const TimeBtnBox = styled.div``;

/* CategorySelect */
export const CategoryBtn = styled.button``;

/* Info Data */
export const TitleInput = styled.input`
  width: 20rem;
`;
export const ContentInput = styled.textarea`
  width: 20rem;
  height: 6rem;
`;
export const ConditionInput = styled.input`
  display: block;
`;
export const PaymentInput = styled.input`
  width: 20rem;
`;
export const PaymentMemo = styled.input`
  width: 20rem;
`;

/* img and address */
export const ImgForm = styled.div`
  position: relative;
  display: flex;
  width: 50rem;
  overflow-x: scroll;
  & > div {
    display: flex;
    gap: 20px;
  }
`;
export const ImgBox = styled.div`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  border-radius: 30px;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  display: inline-block;
`;
export const DeleteImg = styled.button`
  position: absolute;
  transform: translate(14rem, 0);
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const FileLabel = styled.label`
  background: #ffffff;
  box-shadow: 10px 10px 30px rgba(189, 189, 189, 0.2);
  border: rgba(189, 189, 189, 0.2) 0.5px solid;
  border-radius: 30px;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  display: inline-block;
`;
export const FileInput = styled.input`
  display: none;
`;
export const AddressInput = styled.input`
  width: 20rem;
`;
