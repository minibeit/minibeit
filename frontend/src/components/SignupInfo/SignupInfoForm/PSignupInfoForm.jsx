import React, { useState } from "react";
import * as S from "../style";

function PSignupInfoForm({ schoollist, signupHandler }) {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
    gender: "",
    phoneNum: "",
    job: "",
    age: "",
    schoolId: "",
  });
  const { name, nickname, phoneNum, job, age } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
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
      <S.SignupInput
        value={nickname}
        name="nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
      />
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
      <S.SignupInput
        value={phoneNum}
        name="phoneNum"
        type="text"
        placeholder="전화번호"
        onChange={onChange}
      />
      <S.SignupInput
        value={job}
        name="job"
        type="text"
        placeholder="직업"
        onChange={onChange}
      />
      <S.SignupInput
        value={age}
        name="age"
        type="number"
        placeholder="나이"
        onChange={onChange}
      />
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

      <S.SignupButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await signupHandler(inputs);
        }}
      >
        회원가입
      </S.SignupButton>
    </S.FormsignupContainer>
  );
}
export default PSignupInfoForm;
