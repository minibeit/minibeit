import React, { useState } from "react";
import * as S from "../style";

export default function PBProfileEditCont({
  name,
  category,
  place,
  introduce,
  contact,
  bpEditHandler,
}) {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    place: "",
    introduce: "",
    contact: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <>
      <S.BPEditCont>
        <S.BPEditInput
          value={name}
          name="name"
          type="text"
          placeholder="실험실 이름"
          onChange={onChange}
        />
        <S.BPEditInput
          value={category}
          name="category"
          type="text"
          placeholder="카테고리"
          onChange={onChange}
        />
        <S.BPEditInput
          value={place}
          name="place"
          type="text"
          placeholder="장소"
          onChange={onChange}
        />
        <S.BPEditInput
          value={introduce}
          name="introduce"
          type="text"
          placeholder="실험실 소개"
          onChange={onChange}
        />
        <S.BPEditInput
          value={contact}
          name="contact"
          type="text"
          placeholder="연락처"
          onChange={onChange}
        />
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await bpEditHandler(inputs);
          }}
        >
          수정하기
        </S.BPEditButton>
      </S.BPEditCont>
    </>
  );
}
