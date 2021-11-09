import React from "react";

import { PVImg } from "../../../Common";
import Address from "../../../Common/Address";

import * as S from "./style";

export default function Presenter({
  infoData,
  onChange,
  onFileChange,
  addressModal,
  setAddressModal,
  onAddressChange,
  createBusiness,
}) {
  return (
    <>
      <S.ImgContainer>
        <S.ImgBox>
          {infoData.avatar ? (
            <PVImg img={infoData.avatar} />
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
      </S.ImgContainer>
      <S.InfoContainer>
        <div>
          <S.CreateInput style={{ width: "100%" }}>
            <div>
              <p>이름</p>
              <input
                defaultValue={infoData.name}
                name="name"
                type="text"
                placeholder="이름"
                onChange={onChange}
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
              />
            </div>
          </S.CreateInput>
        </div>

        <button onClick={() => createBusiness(infoData)}>수정완료</button>
      </S.InfoContainer>
    </>
  );
}
