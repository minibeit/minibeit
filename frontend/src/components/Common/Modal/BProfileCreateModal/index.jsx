import React, { useState } from "react";
import Portal from "../../../Common/Modal/Portal";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { toast } from "react-toastify";

import Presenter from "./presenter";
import * as S from "./style";
import { bprofileNew } from "../../../../utils";
import { useHistory } from "react-router";

export default function BProfileCreateModal({ setModalSwitch }) {
  const history = useHistory();
  const [infoData, setInfoData] = useState({
    name: "",
    place: "",
    detailPlace: "",
    contact: "",
    avatar: null,
  });
  const [addressModal, setAddressModal] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    const copy = { ...infoData };
    copy[name] = value;
    setInfoData(copy);
  };
  const onFileChange = (e) => {
    const copy = { ...infoData };
    switch (e.target.id) {
      case "reset":
        copy.avatar = null;
        setInfoData(copy);
        break;
      case "upload":
        copy.avatar = e.target.files[0];
        setInfoData(copy);
        break;
      default:
        return;
    }
  };
  const onAddressChange = (e) => {
    const copy = { ...infoData };
    copy.place = e;
    setInfoData(copy);
  };
  const createBusiness = (infoData) => {
    bprofileNew(infoData)
      .then((res) => {
        setModalSwitch(false);
        history.push(`/business/${res.data.data.id}?recruit&1`);
      })
      .catch((err) => toast.info("수정 내용을 다시 한번 확인해주세요"));
  };

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>비즈니스 프로필 생성하기</p>
          <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
            <CloseIcon />
          </S.CloseModalBtn>
        </S.ModalHeader>
        <S.ModalContent>
          <Presenter
            infoData={infoData}
            onChange={onChange}
            onFileChange={onFileChange}
            addressModal={addressModal}
            setAddressModal={setAddressModal}
            onAddressChange={onAddressChange}
            createBusiness={createBusiness}
          />
        </S.ModalContent>
        <S.SubmitBtnBox>
          <button
            onClick={() => {
              if (
                infoData.place.length === 0 &&
                infoData.name.length === 0 &&
                infoData.contact.length === 0
              ) {
                toast.info("정보를 확인해주세요");
              } else {
                createBusiness(infoData);
              }
            }}
          >
            생성
          </button>
        </S.SubmitBtnBox>
      </S.ModalBox>
    </Portal>
  );
}
