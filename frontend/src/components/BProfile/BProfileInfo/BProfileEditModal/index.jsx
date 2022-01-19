import React, { useState } from "react";
import Portal from "../../../Common/Modal/Portal";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import { editBprofile } from "../../../../utils/bprofileApi";
import DeleteBProfile from "../../../Common/Alert/DeleteBProfile";
import toast from "react-hot-toast";

import Presenter from "./presenter";

import * as S from "./style";

export default function BProfileEditCont({
  infoData,
  getBusiness,
  setInfoEditModal,
  isAdmin,
}) {
  const [BProfileData, setBProfileData] = useState(infoData);
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editmode, setEditmode] = useState(false);

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
        toast.success("수정되었습니다");
        setInfoEditModal(false);
        getBusiness();
      })
      .catch((err) => toast.error("수정 내용을 다시 한번 확인해주세요"));
  };

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>{isAdmin ? "비즈니스 프로필 수정하기" : "비즈니스 프로필 보기"}</p>
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
              isAdmin={isAdmin}
              setDeleteAlert={setDeleteAlert}
              editmode={editmode}
            />
          )}
        </S.ModalContent>
        <S.SubmitBtnBox>
          {isAdmin && !editmode && (
            <S.BlueBtn onClick={() => setEditmode(true)}>수정하기</S.BlueBtn>
          )}
          {editmode && (
            <S.BlueBtn onClick={() => submitEditBusiness(BProfileData)}>
              수정완료
            </S.BlueBtn>
          )}
        </S.SubmitBtnBox>
        {deleteAlert && (
          <DeleteBProfile
            isAdmin={isAdmin}
            BProfileId={BProfileData.id}
            setDeleteAlert={setDeleteAlert}
          />
        )}
      </S.ModalBox>
    </Portal>
  );
}
