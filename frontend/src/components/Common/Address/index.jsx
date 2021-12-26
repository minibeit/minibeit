import React from "react";
import Portal from "../Modal/Portal";
import DaumPostCode from "react-daum-postcode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
      <S.ModalBox>
        <S.CloseModalBtn onClick={closeModal}>
          <ArrowBackIcon />
        </S.CloseModalBtn>
        <DaumPostCode onComplete={handleComplete} className="post-code" />
      </S.ModalBox>
    </Portal>
  );
}
