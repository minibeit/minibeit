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
export const ImgBox = styled.div`
  background-color: gray;
  overflow: hidden;
  width: 40rem;
  display: inline-block;
`;
export const Img = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
export const FileLabel = styled.label`
  background-color: gray;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  display: inline-block;
`;
export const FileInput = styled.input`
  display: none;
`;
export const AddressInput = styled.input`
  width: 20rem;
`;
