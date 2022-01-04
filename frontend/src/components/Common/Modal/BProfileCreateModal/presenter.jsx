import React from "react";

import { PVImg } from "../../../Common";
import Address from "../../../Common/Address";
import { toast } from "react-toastify";

import * as S from "./style";

export default function Presenter({
  infoData,
  onChange,
  onFileChange,
  addressModal,
  setAddressModal,
  onAddressChange,
}) {
  const exceptName = (value) => {
    var regName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    if (!regName.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  const exceptPhone = (value) => {
    var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
    if (!regPhone.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <S.ImgContainer>
        <S.ImgBox>
          {infoData.avatar ? (
            <PVImg img={infoData.avatar} />
          ) : (
            <S.Img src="/images/기본프로필.png" />
          )}
        </S.ImgBox>
        <div>
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
        </div>
      </S.ImgContainer>
      <S.InfoContainer>
        <div>
          <S.CreateInput>
            <div>
              <p>이름</p>
              <input
                defaultValue={infoData.name}
                name="name"
                type="text"
                placeholder="이름"
                onChange={onChange}
                onBlur={(e) => {
                  if (!exceptName(e.target.value)) {
                    e.target.value = "";
                    onChange(e);
                    toast.info("이름은 2~8글자로 입력해주세요");
                  }
                }}
              />
            </div>
          </S.CreateInput>
        </div>
        <div>
          <S.CreateInput style={{ width: "100%" }}>
            <div>
              <p>주소</p>
              <input
                value={infoData.place}
                name="place"
                type="text"
                placeholder="주소"
                onClick={() => setAddressModal(true)}
                readOnly
              />
              {addressModal ? (
                <Address
                  setModalSwitch={setAddressModal}
                  handleAddress={onAddressChange}
                />
              ) : null}
            </div>
          </S.CreateInput>
        </div>
        <div>
          <S.CreateInput style={{ width: "100%" }}>
            <div>
              <p>상세주소</p>
              <input
                defaultValue={infoData.detailPlace}
                name="detailPlace"
                type="text"
                placeholder="상세 주소"
                onChange={onChange}
              />
            </div>
          </S.CreateInput>
        </div>
        <div>
          <S.CreateInput>
            <div>
              <p>연락처</p>
              <input
                defaultValue={infoData.contact}
                name="contact"
                type="text"
                placeholder="연락처"
                onChange={onChange}
                onBlur={(e) => {
                  if (!exceptPhone(e.target.value)) {
                    e.target.value = "";
                    onChange(e);
                    toast.info("휴대폰 번호를 다시 확인해주세요");
                  }
                }}
              />
            </div>
          </S.CreateInput>
        </div>
      </S.InfoContainer>
    </>
  );
}
