import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";
import * as S from "../style";
import { handleCompressImg } from "../../../utils/imgCompress";

PSignupInfoForm.propTypes = {
  schoollist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  signupHandler: PropTypes.func.isRequired,
};

function PSignupInfoForm({ schoollist, signupHandler }) {
  // window.addEventListener("beforeunload", function (e) {
  //   let confirmationMessage = "정말 닫으시겠습니까?";
  //   e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
  //   return confirmationMessage; // Gecko, WebKit, Chrome < 34
  // });

  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    gender: "",
    phoneNum: "",
    job: "",
    age: "",
    schoolId: "",
  });
  const [img, setImg] = useState();
  const { name, nickname, phoneNum, job, age } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    handleCompressImg(e.target.files[0]).then((res) => setImg(res));
  };
  const imgDel = () => {
    setImg(undefined);
  };
  return (
    <S.FormsignupContainer>
      <S.SignupInput
        value={name}
        name="name"
        type="text"
        placeholder="이름"
        onChange={onChange}
      />
      <br />
      <S.SignupInput
        value={nickname}
        name="nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
      />
      <br />
      <S.SignupSelect
        onChange={onChange}
        defaultValue={"DEFAULT"}
        name="gender"
      >
        <option value="DEFAULT" disabled>
          성별을 선택하세요
        </option>
        <option value="MALE" key={0}>
          남자
        </option>
        <option value="FEMALE" key={1}>
          여자
        </option>
      </S.SignupSelect>
      <br />
      <S.ImgBox>
        {img ? <PVImg img={img} /> : <S.Img src="/기본프로필.png" />}
      </S.ImgBox>
      <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
      <S.SignupInput name="img" type="file" onChange={fileChange} />
      <br />
      <S.SignupInput
        value={phoneNum}
        name="phoneNum"
        type="text"
        placeholder="전화번호"
        onChange={onChange}
      />
      <br />
      <S.SignupInput
        value={job}
        name="job"
        type="text"
        placeholder="직업"
        onChange={onChange}
      />
      <br />
      <S.SignupInput
        value={age}
        name="age"
        type="number"
        placeholder="나이"
        onChange={onChange}
      />
      <br />
      <S.SignupSelect
        name="schoolId"
        onChange={onChange}
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled>
          학교를 선택하세요
        </option>
        {schoollist.map(({ id, name }) => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </S.SignupSelect>
      <br />
      <S.SignupButton
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signupHandler(inputs, img);
        }}
      >
        회원가입
      </S.SignupButton>
    </S.FormsignupContainer>
  );
}
export default PSignupInfoForm;
