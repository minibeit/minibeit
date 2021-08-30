import React, { useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import * as S from "../style";

PProfileEditForm.propTypes = {
  schoollist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  userData: PropTypes.shape({
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    job: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    schoolId: PropTypes.number.isRequired,
  }),
  editUserDataHandler: PropTypes.func.isRequired,
};

export default function PProfileEditForm({
  schoollist,
  userData,
  editUserDataHandler,
}) {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    name: userData.name,
    pre_nickname: userData.nickname,
    new_nickname: userData.nickname,
    gender: userData.gender,
    phoneNum: userData.phoneNum,
    job: userData.job,
    age: userData.age,
    schoolId: userData.schoolId,
  });
  const [newImg, setNewImg] = useState();
  const { name, pre_nickname, new_nickname, phoneNum, job, age } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    setNewImg(e.target.files[0]);
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
      {newImg ? null : <S.OriginalImg src={userData.avatar} />}
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
        defaultValue={userData.schoolId}
      >
        <option value={userData.schoolId} disabled>
          {schoollist.find((ele) => ele.id === userData.schoolId) === undefined
            ? null
            : schoollist.find((ele) => ele.id === userData.schoolId).name}
        </option>
        {schoollist.map(({ id, name }) => (
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
          editUserDataHandler(inputs, newImg);
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
