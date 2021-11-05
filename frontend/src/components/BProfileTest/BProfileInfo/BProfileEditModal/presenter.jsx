import React from "react";

import { PVImg } from "../../../Common";
import Address from "../../../Common/Address";

import * as S from "./style";

export default function BProfileEditCont({
  basicImg,
  newImg,
  BProfileData,
  setBProfileData,
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

  return (
    <>
      <S.ImgEditContainer>
        <S.ImgBox>
          {BProfileData.avatar ? (
            <PVImg img={BProfileData.avatar} />
          ) : (
            <S.Img src="/기본비즈니스프로필.jpeg" />
          )}
        </S.ImgBox>
        <S.ImgEditBtn id="reset" onClick={onFileChange}>
          기본이미지로 변경
        </S.ImgEditBtn>
        <S.ImgEditBtn htmlFor="upload">사진 업로드 하기</S.ImgEditBtn>
        <input
          style={{ display: "none" }}
          name="img"
          id="upload"
          type="file"
          onChange={onFileChange}
        />
      </S.ImgEditContainer>
      <S.InfoEditContainer>
        <div>
          <p>이름</p>
          <S.BPEditInput
            value={name}
            name="name"
            type="text"
            placeholder="이름"
            onChange={onChange}
          />
          <p>담당자</p>
          <S.BPEditInput value={admin} name="admin" type="text" readOnly />
        </div>
        <div>
          <p>주소</p>
          <S.BPEditInput
            value={place}
            name="place"
            type="text"
            placeholder="장소"
            onClick={() => setadModalSwitch(true)}
            readOnly
          />
          {admodalSwitch ? (
            <Address
              setModalSwitch={setadModalSwitch}
              handleAddress={handleAddress}
            />
          ) : null}
        </div>
        <div>
          <p>연락처</p>
          <S.BPEditInput
            value={contact}
            name="contact"
            type="text"
            placeholder="연락처"
            onChange={onChange}
          />
        </div>
        <div>상세주소</div>

        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            bpEditHandler(inputs, newImg, basicImg);
          }}
        >
          <p>수정하기</p>
        </button>
      </S.InfoEditContainer>
    </>
  );
}
