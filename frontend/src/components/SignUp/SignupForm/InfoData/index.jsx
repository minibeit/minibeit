import React from "react";
import { toast } from "react-toastify";

import { PVImg } from "../../../Common";
import * as S from "../style";

export default function InfoData({
  onChange,
  onFileChange,
  inputData,
  defaultEmail,
  checkingNickname,
  checkingEmail,
  checkingCode,
  checkingPhone,
  changeNickname,
  setChangeNickname,
  changePhone,
  setChangePhone,
  changeEmail,
  setChangeEmail,
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

  const exceptName = (value) => {
    var regName = /^[가-힣]{2,5}$/;
    if (!regName.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  const exceptNickname = (value) => {
    var regNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
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
    <div>
      <S.ImgContainer>
        <div>
          <p>프로필 사진</p> <p>(필수아님*)</p>
        </div>
        <div>
          <S.ImgBox>
            {inputData.avatar ? (
              <PVImg img={inputData.avatar} />
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
        </div>
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
              onBlur={(e) => {
                if (!exceptName(e.target.value)) {
                  e.target.value = "";
                  onChange(e);
                  toast.info("이름은 2~5글자 한글로 입력해주세요");
                }
              }}
            />
          </S.NameBox>
          <S.NicknameInput>
            <p>닉네임</p>
            <div>
              <input
                name="nickname"
                type="text"
                placeholder="닉네임"
                onChange={() => setChangeNickname(false)}
              />
              <button
                disabled={changeNickname}
                onClick={(e) => {
                  let value = e.target.previousSibling.value;
                  if (exceptNickname(value)) {
                    checkingNickname(e.target.previousSibling.value);
                  } else {
                    toast.info(
                      "닉네임은 2글자 이상 10글자 이내로 입력해주세요"
                    );
                  }
                }}
              >
                확인
              </button>
            </div>
          </S.NicknameInput>
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
            <S.PhoneInput>
              <div>
                <input
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
                      e.target.textContent = "재전송";
                      e.target.parentNode.nextSibling.setAttribute(
                        "style",
                        "display:flex"
                      );
                      e.target.parentNode.parentNode.nextSibling.setAttribute(
                        "style",
                        "display:inline"
                      );
                    } else {
                      toast.info("휴대폰 번호를 다시 확인해주세요");
                    }
                  }}
                >
                  {changePhone ? "인증완료" : "인증"}
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
                  확인
                </button>
              </div>
            </S.PhoneInput>
            <S.SendMessage>인증번호를 발송했습니다</S.SendMessage>
          </S.PhoneNumBox>
          <S.EmailBox>
            <p>이메일</p>
            <S.EmailInput>
              <div>
                <input
                  defaultValue={defaultEmail}
                  name="email"
                  placeholder="이메일"
                  onChange={(e) => {
                    setChangeEmail(false);
                  }}
                />
                <button
                  disabled={changeEmail}
                  onClick={(e) => {
                    let value = e.target.previousSibling.value;
                    if (exceptEmail(value)) {
                      checkingEmail(value);
                      e.target.textContent = "재전송";
                      e.target.parentNode.nextSibling.setAttribute(
                        "style",
                        "display:flex"
                      );
                      e.target.parentNode.parentNode.nextSibling.setAttribute(
                        "style",
                        "display:inline"
                      );
                    } else {
                      toast.info("이메일 형식을 확인해주세요");
                    }
                  }}
                >
                  {changeEmail ? "인증완료" : "인증"}
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
                  확인
                </button>
              </div>
            </S.EmailInput>
            <S.SendMessage>인증번호를 발송했습니다</S.SendMessage>
          </S.EmailBox>
        </div>
      </S.InfoContainer>
    </div>
  );
}
