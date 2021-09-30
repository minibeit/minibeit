import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";

import * as S from "../style";
import { handleCompressImg } from "../../../utils/imgCompress";
import Address from "../../Common/Address";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

PBProfileEditCont.propTypes = {
  bpEditHandler: PropTypes.func.isRequired,
  BProfileData: PropTypes.shape({
    avatar: PropTypes.string,
    contact: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  }),
};

export default function PBProfileEditCont({ bpEditHandler, BProfileData }) {
  const admin = useRecoilValue(userState).name;
  const [inputs, setInputs] = useState({
    name: BProfileData.name,
    place: BProfileData.place,
    contact: BProfileData.contact,
  });
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const [basicImg, setBasicImg] = useState(false);
  const [newImg, setNewImg] = useState();
  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };
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
      <S.BNCont1>
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
        <S.FileLabel htmlFor="input-file">사진 업로드 하기</S.FileLabel>
        <S.BPEditFileInput
          name="img"
          id="input-file"
          type="file"
          onChange={fileChange}
        />
      </S.BNCont1>
      <S.BNCont2>
        <S.BNCont2_1>
          <S.BNLabel>
            이름
            <S.BPEditInput
              value={name}
              name="name"
              type="text"
              placeholder="이름"
              onChange={onChange}
            />
          </S.BNLabel>{" "}
          <S.BNLabel>
            담당자
            <S.BPEditInput value={admin} name="admin" type="text" readOnly />
          </S.BNLabel>
        </S.BNCont2_1>
        <S.BNCont2_2>
          {" "}
          <S.BNLabel>
            주소
            <S.BPEditInput
              value={place}
              name="place"
              type="text"
              placeholder="장소"
              onClick={() => setadModalSwitch(true)}
              readOnly
            />
          </S.BNLabel>
          {admodalSwitch ? (
            <Address
              setModalSwitch={setadModalSwitch}
              handleAddress={handleAddress}
            />
          ) : null}
        </S.BNCont2_2>
        <S.BNCont2_3>
          <S.BNLabel>
            연락처
            <S.BPEditInput
              value={contact}
              name="contact"
              type="text"
              placeholder="연락처"
              onChange={onChange}
            />
          </S.BNLabel>
        </S.BNCont2_3>
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            bpEditHandler(inputs, newImg, basicImg);
          }}
        >
          <p>수정하기</p>
        </S.BPEditButton>
      </S.BNCont2>
    </>
  );
}
