import React, { useState } from "react";

import * as S from "../style";

export default function PProfileEditForm({ schoollist, userData }) {
  const [inputs, setInputs] = useState(userData);
  const [img, setImg] = useState();
  console.log(inputs);
  const { name, nickname, phoneNum, job, age } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    setImg(e.target.files[0]);
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
      <S.EditInput
        value={nickname}
        name="nickname"
        type="text"
        placeholder="닉네임"
        onChange={onChange}
      />
      <br />
      <S.EditSelect onChange={onChange} defaultValue={"DEFAULT"} name="gender">
        <option value="DEFAULT" disabled>
          성별을 선택하세요
        </option>
        <option value="MALE" key={0}>
          남자
        </option>
        <option value="FEMALE" key={1}>
          여자
        </option>
      </S.EditSelect>
      <br />
      {img ? null : <S.OriginalImg src={userData.avatar} />}
      <br />
      <S.EditInput name="img" type="file" onChange={fileChange} />
      <br />
      <S.EditInput
        value={phoneNum}
        name="phoneNum"
        type="text"
        placeholder="전화번호"
        onChange={onChange}
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
      <S.EditInput
        value={age}
        name="age"
        type="number"
        placeholder="나이"
        onChange={onChange}
      />
      <br />
      <S.EditSelect
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
      </S.EditSelect>
      <br />
      <S.EditButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          console.log(inputs, img);
        }}
      >
        수정
      </S.EditButton>
      <S.EditButton>수정 취소</S.EditButton>
    </S.EditContainer>
  );
}
