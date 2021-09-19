import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";

import * as S from "../style";
import { handleCompressImg } from "../../../utils/imgCompress";

PBProfileEditCont.propTypes = {
  bpEditHandler: PropTypes.func.isRequired,
  BProfileData: PropTypes.shape({
    avatar: PropTypes.string,
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
    place: BProfileData.place,
    introduce: BProfileData.introduce,
    contact: BProfileData.contact,
  });
  const [basicImg, setBasicImg] = useState(false);
  const [newImg, setNewImg] = useState();

  const { name, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
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
      <S.BPEditCont>
        <S.BPEditInput
          value={name}
          name="name"
          type="text"
          placeholder="실험실 이름"
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
          {basicImg === false ? (
            newImg ? (
              <PVImg img={newImg} />
            ) : BProfileData.avatar ? (
              <S.Img src={BProfileData.avatar} />
            ) : (
              <S.Img src="/기본비즈니스프로필.jpeg" />
            )
          ) : (
            <S.Img src="/기본비즈니스프로필.jpeg" />
          )}
        </S.ImgBox>
        <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
        <S.BPEditInput name="img" type="file" onChange={fileChange} />
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            bpEditHandler(inputs, newImg, basicImg);
          }}
        >
          수정하기
        </S.BPEditButton>
      </S.BPEditCont>
    </>
  );
}
