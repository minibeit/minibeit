import React from "react";

import { PVImg } from "../../../Common";
import Address from "../../../Common/Address";

import * as S from "./style";

export default function BProfileEditCont({
  BProfileData,
  onChange,
  onFileChange,
  onAddressChange,
  setadModalSwitch,
  admodalSwitch,
  submitEditBusiness,
}) {
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
          <S.EditInput>
            <div>
              <p>이름</p>
              <input
                defaultValue={BProfileData.name}
                name="name"
                type="text"
                placeholder="이름"
                onChange={onChange}
              />
            </div>
          </S.EditInput>
          <S.EditInput>
            <div>
              <p>담당자</p>
              <input
                defaultValue={BProfileData.adminNickname}
                name="adminNickname"
                type="text"
                readOnly
              />
            </div>
          </S.EditInput>
        </div>
        <div>
          <S.EditInput style={{ width: "100%" }}>
            <div>
              <p>주소</p>
              <input
                value={BProfileData.place}
                name="place"
                type="text"
                placeholder="주소"
                onClick={() => setadModalSwitch(true)}
                readOnly
              />
              {admodalSwitch ? (
                <Address
                  setModalSwitch={setadModalSwitch}
                  handleAddress={onAddressChange}
                />
              ) : null}
            </div>
          </S.EditInput>
        </div>
        <div>
          <S.EditInput style={{ width: "100%" }}>
            <div>
              <p>상세주소</p>
              <input
                defaultValue=""
                name="detailPlace"
                type="text"
                placeholder="상세 주소"
                onChange={onChange}
              />
            </div>
          </S.EditInput>
        </div>
        <div>
          <S.EditInput>
            <div>
              <p>연락처</p>
              <input
                defaultValue={BProfileData.contact}
                name="contact"
                type="text"
                placeholder="연락처"
                onChange={onChange}
              />
            </div>
          </S.EditInput>
        </div>

        <button onClick={() => submitEditBusiness(BProfileData)}>
          수정완료
        </button>
      </S.InfoEditContainer>
    </>
  );
}
