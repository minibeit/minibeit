import React from "react";
import { PVImg } from "../../../Common";
import SchoolSelect from "./SearchInput";
import * as S from "./style";

export default function Presenter({
  userData,
  onChange,
  onFileChange,
  schoolId,
  setSchoolId,
  checkingNickname,
  changeNickname,
  setChangeNickname,
  checkingPhone,
  changePhone,
  setChangePhone,
  checkingEmail,
  changeEmail,
  setChangeEmail,
  checkingCode,
}) {
  const exceptName = (value) => {
    var regName = /^[가-힣]{2,4}$/;
    if (!regName.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  const exceptNickname = (value) => {
    var regNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,15}$/;
    if (!regNickname.test(value)) {
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
  const exceptEmail = (value) => {
    var regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/; // eslint-disable-line
    if (!regEmail.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <S.ImgEditContainer>
        <S.ImgBox>
          {userData.avatar ? (
            <PVImg img={userData.avatar} />
          ) : (
            <S.Img src="/기본프로필.png" />
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
                defaultValue={userData.name}
                name="name"
                type="text"
                placeholder="이름"
                onChange={onChange}
                onBlur={(e) => {
                  if (!exceptName(e.target.value)) {
                    e.target.value = "";
                    onChange(e);
                    alert("이름은 2~4글자 한글로 입력해주세요");
                  }
                }}
              />
            </div>
          </S.EditInput>
          <S.EmailPhoneInput>
            <p>닉네임</p>
            <div>
              <input
                defaultValue={userData.nickname}
                name="nickname"
                type="text"
                placeholder="닉네임"
                onChange={(e) => setChangeNickname(false)}
              />
              <button
                disabled={changeNickname}
                onClick={(e) => {
                  let value = e.target.previousSibling.value;
                  if (exceptNickname(value)) {
                    checkingNickname(e.target.previousSibling.value);
                  } else {
                    alert("닉네임은 2글자 이상 15글자 이내로 입력해주세요");
                  }
                }}
              >
                중복확인
              </button>
            </div>
          </S.EmailPhoneInput>
        </div>
        <div>
          <S.EditInput>
            <div>
              <p>생년월일</p>
              <input
                defaultValue={userData.birth}
                name="birth"
                type="date"
                onChange={onChange}
              />
            </div>
          </S.EditInput>

          <S.SelectForm>
            <p>관심학교</p>
            <SchoolSelect
              defaultValue={schoolId}
              onChange={(e) => (e ? setSchoolId(e.value) : setSchoolId(null))}
            />
          </S.SelectForm>
        </div>
        <div>
          <S.EditInput>
            <div>
              <p>직업</p>
              <input
                defaultValue={userData.job}
                name="job"
                type="text"
                placeholder="직업"
                onChange={onChange}
              />
            </div>
          </S.EditInput>
          <S.EditInput>
            <div>
              <p>성별</p>
              <select
                onChange={onChange}
                defaultValue={"DEFAULT"}
                name="gender"
              >
                <option value="DEFAULT" disabled>
                  {userData.gender === "MALE" ? "남자" : "여자"}
                </option>
                <option value="MALE" key={0}>
                  남자
                </option>
                <option value="FEMALE" key={1}>
                  여자
                </option>
              </select>
            </div>
          </S.EditInput>
        </div>
        <div>
          <S.EmailPhoneInput>
            <p>연락처</p>
            <div>
              <input
                defaultValue={userData.phoneNum}
                name="phoneNum"
                type="text"
                placeholder="'-' 빼고 입력"
                onChange={() => setChangePhone(false)}
              />
              <button
                disabled={changePhone}
                onClick={(e) => {
                  let value = e.target.previousSibling.value;
                  if (exceptPhone(value)) {
                    checkingPhone(value);
                    e.target.parentNode.nextSibling.setAttribute(
                      "style",
                      "display:flex"
                    );
                  } else {
                    alert("휴대폰 번호를 다시 확인해주세요");
                  }
                }}
              >
                인증
              </button>
            </div>

            <div style={{ display: "none" }}>
              <input />
              <button
                onClick={(e) => {
                  checkingCode(e.target.previousSibling.value, "PHONE");
                  e.target.parentNode.setAttribute("style", "display:none");
                }}
              >
                인증
              </button>
            </div>
          </S.EmailPhoneInput>
          <S.EmailPhoneInput>
            <p>이메일</p>
            <div>
              <input
                defaultValue={userData.email}
                name="email"
                type="text"
                placeholder="이메일"
                onChange={() => setChangeEmail(false)}
              />
              <button
                disabled={changeEmail}
                onClick={(e) => {
                  let value = e.target.previousSibling.value;
                  if (exceptEmail(value)) {
                    checkingEmail(value);
                    e.target.parentNode.nextSibling.setAttribute(
                      "style",
                      "display:flex"
                    );
                  } else {
                    alert("이메일 형식을 확인해주세요");
                  }
                }}
              >
                인증
              </button>
            </div>
            <div style={{ display: "none" }}>
              <input />
              <button
                onClick={(e) => {
                  checkingCode(e.target.previousSibling.value, "EMAIL");
                  e.target.parentNode.setAttribute("style", "display:none");
                }}
              >
                인증
              </button>
            </div>
          </S.EmailPhoneInput>
        </div>
      </S.InfoEditContainer>
    </>
  );
}
