import React, { useState } from "react";
import Portal from "../../../Common/Modal/Portal";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { editBprofile } from "../../../../utils/bprofileApi";

import Presenter from "./presenter";

import * as S from "./style";
import { useHistory } from "react-router";

export default function BProfileEditCont({ infoData, setInfoEditModal }) {
  const history = useHistory();
  const [BProfileData, setBProfileData] = useState(infoData);
  const [admodalSwitch, setadModalSwitch] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    const copy = { ...BProfileData };
    copy[name] = value;
    setBProfileData(copy);
  };
  const onFileChange = (e) => {
    const copy = { ...BProfileData };
    switch (e.target.id) {
      case "reset":
        copy.avatar = null;
        setBProfileData(copy);
        break;
      case "upload":
        copy.avatar = e.target.files[0];
        setBProfileData(copy);
        break;
      default:
        return;
    }
  };
  const onAddressChange = (e) => {
    const copy = { ...BProfileData };
    copy.place = e;
    setBProfileData(copy);
  };

  const submitEditBusiness = (BProfileData) => {
    editBprofile(BProfileData)
      .then((res) => {
        setInfoEditModal(false);
        history.push(`/business/${res.data.data.id}`);
        history.go(0);
      })
      .catch((err) => alert("수정 내용을 다시 한번 확인해주세요"));
  };

  return (
    <>
      <Portal>
        <S.ModalBackground
          onClick={(e) =>
            e.target === e.currentTarget && setInfoEditModal(false)
          }
        >
          <S.ModalBox>
            <S.ModalHeader>
              <p>비즈니스 프로필 수정하기</p>
              <S.CloseModalBtn onClick={() => setInfoEditModal(false)}>
                <CloseIcon />
              </S.CloseModalBtn>
            </S.ModalHeader>
            <S.ModalContent>
              {BProfileData && (
                <Presenter
                  BProfileData={BProfileData}
                  onChange={onChange}
                  onFileChange={onFileChange}
                  onAddressChange={onAddressChange}
                  setadModalSwitch={setadModalSwitch}
                  admodalSwitch={admodalSwitch}
                  submitEditBusiness={submitEditBusiness}
                />
              )}
            </S.ModalContent>
            <S.SubmitBtnBox>
              <button onClick={() => submitEditBusiness(BProfileData)}>
                수정완료
              </button>
            </S.SubmitBtnBox>
          </S.ModalBox>
        </S.ModalBackground>
      </Portal>
    </>
  );
}
