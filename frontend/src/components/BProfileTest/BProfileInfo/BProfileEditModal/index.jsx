import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import { handleCompressImg } from "../../../../utils/imgCompress";
import Portal from "../../../Common/Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";
import { editBprofile } from "../../../../utils/bprofileApi";

import Presenter from "./presenter";

import * as S from "./style";

export default function BProfileEditCont({
  businessId,
  infoData,
  setInfoEditModal,
}) {
  const [BProfileData, setBProfileData] = useState(infoData);
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const [basicImg, setBasicImg] = useState(false);
  const [newImg, setNewImg] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    contact: "",
  });

  const { name, place, contact } = inputs;

  const bpEditHandler = async (inputs, img, basicImg) => {
    editBprofile(businessId, inputs, img, basicImg)
      .then((res) => {
        window.location.replace("/business/" + businessId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const admin = useRecoilValue(userState).name;

  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    setBasicImg(false);
    handleCompressImg(e.target.files[0]).then((res) => setNewImg(res));
  };
  const imgDel = () => {
    setBasicImg(true);
    setNewImg(undefined);
  };

  const closeModal = () => {
    setInfoEditModal(false);
  };

  return (
    <>
      <Portal>
        <S.ModalBackground>
          <S.ModalBox>
            <S.ModalHeader>
              <p>비즈니스 프로필 수정하기</p>
              <S.CloseModalBtn onClick={closeModal}>
                <CloseIcon />
              </S.CloseModalBtn>
            </S.ModalHeader>
            <S.ModalContent>
              {BProfileData && (
                <Presenter
                  closeModal={closeModal}
                  basicImg={basicImg}
                  newImg={newImg}
                  BProfileData={BProfileData}
                  setBProfileData={setBProfileData}
                  imgDel={imgDel}
                  fileChange={fileChange}
                  name={name}
                  onChange={onChange}
                  admin={admin}
                  place={place}
                  setadModalSwitch={setadModalSwitch}
                  admodalSwitch={admodalSwitch}
                  handleAddress={handleAddress}
                  contact={contact}
                  bpEditHandler={bpEditHandler}
                  inputs={inputs}
                />
              )}
            </S.ModalContent>
          </S.ModalBox>
        </S.ModalBackground>
      </Portal>
    </>
  );
}
