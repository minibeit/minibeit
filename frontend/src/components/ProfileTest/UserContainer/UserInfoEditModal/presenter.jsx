import React, { useState } from "react";
import { PVImg, SchoolSelect } from "../../../Common";
import { useRecoilValue } from "recoil";
import * as S from "./style";
import { userState } from "../../../../recoil/userState";

export default function Presenter({
  userData,
  setUserData,
  submitEditUser,
  checkingNickname,
}) {
  const [newNickname, setNewNickname] = useState();
  const userSchoolId = useRecoilValue(userState).schoolId;
  const [schoolId, setSchoolId] = useState(userSchoolId);
  const onChange = (e) => {
    const { value, name } = e.target;
    const copy = { ...userData };
    copy[name] = value;
    setUserData(copy);
  };
  const onFileChange = (e) => {
    const copy = { ...userData };
    switch (e.target.id) {
      case "reset":
        copy.avatar = null;
        setUserData(copy);
        break;
      case "upload":
        copy.avatar = e.target.files[0];
        setUserData(copy);
        break;
      default:
        return;
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
              />
            </div>
          </S.EditInput>
          <S.EditInput>
            <div>
              <p>닉네임</p>
              <input
                defaultValue={userData.nickname}
                name="nickname"
                type="text"
                placeholder="닉네임"
                onChange={(e) => setNewNickname(e.target.value)}
              />
            </div>
            <button
              disabled={
                newNickname && newNickname !== userData.nickname ? false : true
              }
              onClick={() => checkingNickname(newNickname)}
            >
              중복확인
            </button>
          </S.EditInput>
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
              defaultValue={userSchoolId}
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
          <S.EditInput>
            <div>
              <p>연락처</p>
              <input
                defaultValue={userData.phoneNum}
                name="phoneNum"
                type="text"
                placeholder="전화번호"
                onChange={onChange}
              />
            </div>
          </S.EditInput>
        </div>
        <button onClick={() => submitEditUser(userData, schoolId, newNickname)}>
          수정 완료
        </button>
      </S.InfoEditContainer>
    </>
  );
}
