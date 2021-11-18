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
  submitEditUser,
}) {
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
                onClick={(e) =>
                  checkingNickname(e.target.previousSibling.value)
                }
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
                placeholder="전화번호"
                onChange={() => setChangePhone(false)}
              />
              <button
                disabled={changePhone}
                onClick={(e) => {
                  checkingPhone(e.target.previousSibling.value);
                  e.target.parentNode.nextSibling.setAttribute(
                    "style",
                    "display:flex"
                  );
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
                  checkingEmail(e.target.previousSibling.value);
                  e.target.parentNode.nextSibling.setAttribute(
                    "style",
                    "display:flex"
                  );
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
        <button onClick={() => submitEditUser(userData, schoolId)}>
          수정 완료
        </button>
      </S.InfoEditContainer>
    </>
  );
}
