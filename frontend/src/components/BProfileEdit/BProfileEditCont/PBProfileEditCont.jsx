import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";
import * as S from "../style";

export default function PBProfileEditCont({ businessId, bpEditHandler }) {
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState();
  const [prevsrc, setprevsrc] = useState("");
  const getProfile = async () => {
    try {
      const result = await getBprofileInfo(businessId);
      const data = result.data;
      if (data) {
        setInputs({
          name: data.name,
          category: data.category,
          place: data.place,
          introduce: data.introduce,
          contact: data.contact,
          avatarChanged: false,
        });
        setprevsrc(data.avatar);
        console.log(prevsrc);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  console.log(inputs);
  console.log(inputs);
  useEffect(() => {
    getProfile();
  }, []);
  console.log(prevsrc);
  console.log(inputs);
  const { category, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fileChange = (e) => {
    console.log(inputs);
    setInputs({
      ...inputs,
      avatarChanged: true,
      avatar: e.target.files[0],
    });
    setprevsrc("");
    setImg(e.target.files[0]);
  };
  return (
    <>
      <S.BPEditCont>
        <S.BPEditInput
          value={inputs.name || ""}
          name="name"
          type="text"
          placeholder="실험실 이름"
          onChange={onChange}
        />
        <S.BPEditInput
          value={category || ""}
          name="category"
          type="text"
          placeholder="카테고리"
          onChange={onChange}
        />
        <S.BPEditInput
          value={place || ""}
          name="place"
          type="text"
          placeholder="장소"
          onChange={onChange}
        />
        <S.BPEditInput
          value={introduce || ""}
          name="introduce"
          type="text"
          placeholder="실험실 소개"
          onChange={onChange}
        />
        <S.BPEditInput
          value={contact || ""}
          name="contact"
          type="text"
          placeholder="연락처"
          onChange={onChange}
        />
        {prevsrc !== "" ? <S.BPEditImg src={prevsrc} /> : null}
        <S.BPEditInput name="img" type="file" onChange={fileChange} />
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await bpEditHandler(inputs, img);
          }}
        >
          수정하기
        </S.BPEditButton>
      </S.BPEditCont>
    </>
  );
}
