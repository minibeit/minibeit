import React from "react";
import Portal from "../../../Common/Modal/Portal";
import CloseIcon from "@mui/icons-material/Close";

import { PVImg } from "../../../Common";
import Address from "../../../Common/Address";

import * as S from "../../style";

export default function BProfileEditCont({
  closeModal,
  basicImg,
  newImg,
  BProfileData,
  imgDel,
  fileChange,
  name,
  onChange,
  admin,
  place,
  setadModalSwitch,
  admodalSwitch,
  handleAddress,
  contact,
  bpEditHandler,
  inputs,
}) {
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <p>비즈니스 프로필 수정하기</p>
            <S.CloseModalBtn onClick={closeModal}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContentEdit>
            <S.BNCont1>
              <S.ImgBox>
                {basicImg === false ? (
                  newImg ? (
                    <PVImg img={newImg} />
                  ) : BProfileData.avatar ? (
                    <S.Img src={BProfileData.avatar} />
                  ) : (
                    <S.Img src="/기본비즈니스프로필.jpeg" />
                  )
                ) : (
                  <S.Img src="/기본비즈니스프로필.jpeg" />
                )}
              </S.ImgBox>
              <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
              <S.FileLabel htmlFor="input-file">사진 업로드 하기</S.FileLabel>
              <S.BPEditFileInput
                name="img"
                id="input-file"
                type="file"
                onChange={fileChange}
              />
            </S.BNCont1>
            <S.BNCont2>
              <S.BNCont21>
                <S.BNLabel>
                  이름
                  <S.BPEditInput
                    value={name}
                    name="name"
                    type="text"
                    placeholder="이름"
                    onChange={onChange}
                  />
                </S.BNLabel>{" "}
                <S.BNLabel>
                  담당자
                  <S.BPEditInput
                    value={admin}
                    name="admin"
                    type="text"
                    readOnly
                  />
                </S.BNLabel>
              </S.BNCont21>
              <S.BNCont22>
                {" "}
                <S.BNLabel>
                  주소
                  <S.BPEditInput
                    value={place}
                    name="place"
                    type="text"
                    placeholder="장소"
                    onClick={() => setadModalSwitch(true)}
                    readOnly
                  />
                </S.BNLabel>
                {admodalSwitch ? (
                  <Address
                    setModalSwitch={setadModalSwitch}
                    handleAddress={handleAddress}
                  />
                ) : null}
              </S.BNCont22>
              <S.BNCont23>
                <S.BNLabel>
                  연락처
                  <S.BPEditInput
                    value={contact}
                    name="contact"
                    type="text"
                    placeholder="연락처"
                    onChange={onChange}
                  />
                </S.BNLabel>
              </S.BNCont23>
              <S.BPEditButton
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  bpEditHandler(inputs, newImg, basicImg);
                }}
              >
                <p>수정하기</p>
              </S.BPEditButton>
            </S.BNCont2>
          </S.ModalContentEdit>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
