import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";

import * as S from "../style";

PBProfileEditCont.propTypes = {
  bpEditHandler: PropTypes.func.isRequired,
  BProfileData: PropTypes.shape({
    avatar: PropTypes.string,
    category: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    introduce: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  }),
};

export default function PBProfileEditCont({ bpEditHandler, BProfileData }) {
  const [inputs, setInputs] = useState({
    name: BProfileData.name,
    category: BProfileData.category,
    place: BProfileData.place,
    introduce: BProfileData.introduce,
    contact: BProfileData.contact,
  });
  const [newImg, setNewImg] = useState();

  const { name, category, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const fileChange = (e) => {
    setNewImg(e.target.files[0]);
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
        <S.ImgBox>
          {newImg ? (
            <PVImg img={newImg} />
          ) : (
            <S.Img src={BProfileData.avatar} />
          )}
        </S.ImgBox>
        <S.BPEditInput name="img" type="file" onChange={fileChange} />
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            bpEditHandler(inputs, newImg);
          }}
        >
          수정하기
        </S.BPEditButton>
      </S.BPEditCont>
    </>
  );
}
