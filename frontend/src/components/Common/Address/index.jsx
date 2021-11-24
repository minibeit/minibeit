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
    document.querySelector("body").removeAttribute("style");
  };
  const clickOutside = (e) => {
    e.target === e.currentTarget && setModalSwitch(false);
    document.querySelector("body").removeAttribute("style");
  };
  const closeModal = () => {
    setModalSwitch(false);
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.ModalBackground onClick={(e) => clickOutside(e)}>
        <S.ModalBox>
          <S.CloseModalBtn onClick={closeModal}>
            <ArrowBackIcon />
          </S.CloseModalBtn>
          <DaumPostCode onComplete={handleComplete} className="post-code" />
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
