import React from "react";
import DaumPostCode from "react-daum-postcode";
import Portal from "../Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./style";

export default function Address({ setModalSwitch, handleAddress }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //fullAddress -> 전체 주소반환

    handleAddress(fullAddress);
    setModalSwitch(false);
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <DaumPostCode onComplete={handleComplete} className="post-code" />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
