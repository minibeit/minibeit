import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { PVImg, SchoolSearch } from "../../Common";
import { signupState } from "../../../recoil/signupState";
import { useRecoilValue } from "recoil";
import * as S from "../style";
import { handleCompressImg } from "../../../utils/imgCompress";

PProfileEditModal.propTypes = {
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

export default function PProfileEditModal({ userData, editUserDataHandler }) {
  const history = useHistory();
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

  const { name, pre_nickname, new_nickname, phoneNum, job, birth } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setInputs({ ...inputs, [name]: value });
  };
  const onNumChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      const { value, name } = e.target;
      setInputs({ ...inputs, [name]: value });
    }
  };
  useEffect(() => {
    if (phoneNum.length === 10) {
      setInputs({
        ...inputs,
        ["phoneNum"]: phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (phoneNum.length === 13) {
      setInputs({
        ...inputs,
        ["phoneNum"]: phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, [phoneNum]);
  const fileChange = (e) => {
    setBasicImg(false);
    handleCompressImg(e.target.files[0]).then((res) => setNewImg(res));
  };
  const imgDel = () => {
    setBasicImg(true);
    setNewImg(undefined);
  };

  return (
    <S.EditContainer>
      <S.EditInput
        value={name}
        name="name"
        type="text"
        placeholder="이름"
        onChange={onChange}
      />
      <br />
      <S.EditInput value={pre_nickname} type="hidden" />
      <S.EditInput
        value={new_nickname}
        name="new_nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
      />
      <br />
      <S.EditSelect onChange={onChange} defaultValue={"DEFAULT"} name="gender">
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
      <br />
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
      <br />
      <S.EditInput name="img" type="file" onChange={fileChange} />
      <br />
      <S.EditInput
        value={phoneNum}
        name="phoneNum"
        type="text"
        placeholder="전화번호"
        onChange={onNumChange}
      />
      <br />
      <S.EditInput
        value={job}
        name="job"
        type="text"
        placeholder="직업"
        onChange={onChange}
      />
      <br />
      <S.EditInput value={birth} name="birth" type="date" onChange={onChange} />
      <br />
      <SchoolSearch use="Signup" />
      <br />
      <S.EditButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          editUserDataHandler(inputs, school, newImg, basicImg);
        }}
      >
        수정
      </S.EditButton>
      <S.EditButton
        onClick={() => {
          history.push(`/user/${pre_nickname}`);
        }}
      >
        수정 취소
      </S.EditButton>
    </S.EditContainer>
  );
}