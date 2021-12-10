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
}) {
  const exceptName = (value) => {
    var regName = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
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
      <S.ImgEditContainer>
        <S.ImgBox>
          {BProfileData.avatar ? (
            <PVImg img={BProfileData.avatar} />
          ) : (
            <S.Img src="/images/기본프로필.png" />
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
                onBlur={(e) => {
                  if (!exceptName(e.target.value)) {
                    e.target.value = "";
                    onChange(e);
                    alert("이름은 2~8글자로 입력해주세요");
                  }
                }}
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
                defaultValue={BProfileData.placeDetail}
                name="placeDetail"
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
                onBlur={(e) => {
                  if (!exceptPhone(e.target.value)) {
                    e.target.value = "";
                    onChange(e);
                    alert("휴대폰 번호를 다시 확인해주세요");
                  }
                }}
              />
            </div>
          </S.EditInput>
        </div>
      </S.InfoEditContainer>
    </>
  );
}
