import React from "react";

import { PVImg } from "../../../Common";
import * as S from "../style";

export default function InfoData({
  onChange,
  onFileChange,
  checkingNickname,
  inputData,
  nickNameCheck,
  checkingEmail,
  checkingCode,
  completeEmail,
  setCompleteEmail,
}) {
  const range = (start, end) => {
    var arr = [];
    var length = end - start;
    for (var i = 0; i <= length; i++) {
      arr[i] = start;
      start++;
    }
    return arr;
  };

  return (
    <div>
      <S.ImgContainer>
        <div>
          <p>프로필 사진</p> <p>(필수아님*)</p>
        </div>
        <S.ImgBox>
          {inputData.avatar ? (
            <PVImg img={inputData.avatar} />
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
      </S.ImgContainer>
      <S.InfoContainer>
        <div>
          <S.NameBox>
            <p>이름</p>
            <input
              name="name"
              type="text"
              placeholder="이름"
              onChange={onChange}
            />
          </S.NameBox>
          <S.NickNameBox>
            <p>닉네임</p>
            <div>
              <input
                name="nickname"
                type="text"
                placeholder="닉네임"
                onChange={onChange}
              />
              <button onClick={() => checkingNickname()}>확인</button>
            </div>
            {nickNameCheck && (
              <p style={{ color: "blue" }}>사용가능한 닉네임 입니다</p>
            )}
            {nickNameCheck === false && (
              <p style={{ color: "red" }}>사용불가한 닉네임 입니다</p>
            )}
          </S.NickNameBox>
          <S.GenderBox>
            <p>성별</p>
            <select onChange={onChange} defaultValue={"DEFAULT"} name="gender">
              <option value="DEFAULT" disabled={true}></option>
              <option value="MALE" key={0}>
                남
              </option>
              <option value="FEMALE" key={1}>
                여
              </option>
            </select>
          </S.GenderBox>
          <S.BirthBox>
            <p>생년월일</p>
            <div>
              <select onChange={onChange} defaultValue={"DEFAULT"} name="year">
                <option value="DEFAULT" disabled={true}></option>
                {range(1950, 2020)
                  .reverse()
                  .map((a) => {
                    return (
                      <option value={a} key={a}>
                        {a}
                      </option>
                    );
                  })}
              </select>
              <select onChange={onChange} defaultValue={"DEFAULT"} name="month">
                <option value="DEFAULT" disabled={true}></option>
                {range(1, 12).map((a) => {
                  return (
                    <option value={a < 10 ? `0${a}` : `${a}`} key={a}>
                      {a}
                    </option>
                  );
                })}
              </select>
              <select onChange={onChange} defaultValue={"DEFAULT"} name="date">
                <option value="DEFAULT" disabled={true}></option>
                {range(1, 31).map((a) => {
                  return (
                    <option value={a < 10 ? `0${a}` : `${a}`} key={a}>
                      {a}
                    </option>
                  );
                })}
              </select>
            </div>
          </S.BirthBox>
        </div>
        <div>
          <S.PhoneNumBox>
            <p>연락처</p>
            <div>
              <input value="010" disabled={true} name="phoneNum1" />
              <input name="phoneNum2" type="number" onChange={onChange} />
              <input name="phoneNum3" type="number" onChange={onChange} />
            </div>
          </S.PhoneNumBox>
          <S.EmailBox>
            <p>이메일</p>
            <S.EmailInput>
              <input
                defaultValue={inputData.email}
                name="email"
                disabled={inputData.email ? true : false}
                onChange={(e) => {
                  setCompleteEmail(false);
                  e.target.nextSibling.setAttribute("style", "display:block");
                }}
              />
              <button
                style={{ display: "none" }}
                onClick={(e) => {
                  checkingEmail(e.target.previousSibling.value);
                  e.target.previousSibling.setAttribute("disabled", true);
                  e.target.setAttribute("style", "display:none");
                  e.target.parentNode.nextSibling.setAttribute(
                    "style",
                    "display:flex"
                  );
                }}
              >
                인증
              </button>
            </S.EmailInput>
            {!completeEmail && (
              <div style={{ display: "none" }}>
                <input />
                <button
                  onClick={(e) => checkingCode(e.target.previousSibling.value)}
                >
                  확인
                </button>
              </div>
            )}
          </S.EmailBox>
        </div>
      </S.InfoContainer>
    </div>
  );
}
