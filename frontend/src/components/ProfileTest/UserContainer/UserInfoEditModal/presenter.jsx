import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg, SchoolSearch } from "../../../Common";
import { signupState } from "../../../../recoil/signupState";
import { useRecoilValue } from "recoil";
import * as S from "./style";
import { handleCompressImg } from "../../../../utils/imgCompress";
import { userState } from "../../../../recoil/userState";
import { nickCheckApi } from "../../../../utils/auth";

Presenter.propTypes = {
  schoollist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  userData: PropTypes.shape({
    avatar: PropTypes.string,
    gender: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    job: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    schoolName: PropTypes.string.isRequired,
  }),
  editUserDataHandler: PropTypes.func.isRequired,
};

export default function Presenter({ userData, editUserDataHandler }) {
  const [inputs, setInputs] = useState({
    name: userData.name,
    pre_nickname: userData.nickname,
    new_nickname: userData.nickname,
    gender: userData.gender,
    phoneNum: userData.phoneNum,
    job: userData.job,
    birth: userData.birth,
  });
  const [newImg, setNewImg] = useState();
  const [basicImg, setBasicImg] = useState(false);
  const school = useRecoilValue(signupState).schoolId;
  const schoolDefault = useRecoilValue(userState).schoolId;
  const [nick, setNick] = useState("notyet");
  const { name, new_nickname, pre_nickname, phoneNum, job, birth } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    if (name === "new_nickname") {
      setNick("notyet");
      if (value.length > 8) {
        window.alert(
          "대/소문자 영어 및 한글, 숫자로 8글자 이내로 입력해 주세요"
        );
      } else {
        setInputs({
          ...inputs,
          new_nickname: value.replace(/^[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/, ""),
        });
      }
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };
  const nickCheck = async () => {
    await nickCheckApi(new_nickname)
      .then(() => setNick(true))
      .catch((err) => setNick(false));
  };
  const onNumChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      const { value, name } = e.target;
      setInputs({ ...inputs, [name]: value });
    }
  };

  const fileChange = (e) => {
    setBasicImg(false);
    handleCompressImg(e.target.files[0]).then((res) => setNewImg(res));
  };
  const imgDel = () => {
    setBasicImg(true);
    setNewImg(undefined);
  };

  return (
    <>
      <S.EditContainer1>
        <S.ImgBox>
          {basicImg === false ? (
            newImg ? (
              <PVImg img={newImg} />
            ) : userData.avatar ? (
              <S.Img src={userData.avatar} />
            ) : (
              <S.Img src="/기본프로필.png" />
            )
          ) : (
            <S.Img src="/기본프로필.png" />
          )}
        </S.ImgBox>
        <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
        <S.FileLabel htmlFor="input-file">사진 업로드 하기</S.FileLabel>
        <S.EditFInput
          name="img"
          id="input-file"
          type="file"
          onChange={fileChange}
        />
      </S.EditContainer1>
      <S.EditContainer2>
        <S.EditContainerSub>
          <S.PELabel flex="1">
            이름
            <S.EditInput
              value={name}
              name="name"
              type="text"
              placeholder="이름"
              onChange={onChange}
            />
          </S.PELabel>
          <S.NickBox>
            <S.NicknameCont>
              <S.PELabel flex="1">
                닉네임
                <S.EditInput
                  value={new_nickname}
                  name="new_nickname"
                  type="text"
                  placeholder="닉네임"
                  onChange={onChange}
                />
              </S.PELabel>
              {new_nickname === pre_nickname ? null : (
                <S.SignupNickBtn onClick={nickCheck}>확인</S.SignupNickBtn>
              )}
            </S.NicknameCont>
            {nick === true ? (
              <S.SignupMSG color="blue">사용가능한 닉네임 입니다</S.SignupMSG>
            ) : nick === false ? (
              <S.SignupMSG color="red">닉네임이 중복됩니다</S.SignupMSG>
            ) : null}
          </S.NickBox>
        </S.EditContainerSub>
        <S.EditContainerSub>
          <S.PELabel flex="1">
            생년월일
            <S.EditInput
              value={birth}
              name="birth"
              type="date"
              onChange={onChange}
            />
          </S.PELabel>
          <S.PELabel flex="1">
            관심학교
            <SchoolSearch use="Signup" />
          </S.PELabel>
        </S.EditContainerSub>
        <S.EditContainerSub>
          <S.PELabel>
            직업
            <S.EditInput
              value={job}
              name="job"
              type="text"
              placeholder="직업"
              onChange={onChange}
            />
          </S.PELabel>
          <S.PELabel>
            성별
            <S.EditSelect
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
            </S.EditSelect>
          </S.PELabel>
        </S.EditContainerSub>
        <S.EditContainerSub width="74%">
          <S.PELabel>
            연락처
            <S.EditInput
              value={phoneNum}
              name="phoneNum"
              type="text"
              placeholder="전화번호"
              onChange={onNumChange}
            />
          </S.PELabel>
        </S.EditContainerSub>
        <S.EditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            if (pre_nickname !== new_nickname && nick !== true) {
              window.alert("닉네임 확인을 해주세요");
            } else {
              editUserDataHandler(
                inputs,
                school,
                schoolDefault,
                newImg,
                basicImg
              );
            }
          }}
        >
          <p>수정</p>
        </S.EditButton>
      </S.EditContainer2>
    </>
  );
}
