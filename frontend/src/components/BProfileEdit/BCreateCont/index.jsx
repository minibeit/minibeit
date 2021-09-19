import React, { useState } from "react";
import Portal from "../../Common/Modal/Portal";
import { PVImg } from "../../Common";
import PropTypes from "prop-types";

import * as S from "../style";
import Address from "../../Common/Address";
import { handleCompressImg } from "../../../utils/imgCompress";

BCreateCont.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  CreateBProfile: PropTypes.func.isRequired,
};

export default function BCreateCont({ setModalSwitch, CreateBProfile }) {
  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    introduce: "",
    contact: "",
  });
  const [img, setImg] = useState();
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };
  const { name, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  const fileChange = (e) => {
    handleCompressImg(e.target.files[0]).then((res) => setImg(res));
  };
  const imgDel = () => {
    setImg(undefined);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.BPEditInput
              value={name}
              name="name"
              type="text"
              placeholder="이름"
              onChange={onChange}
            />
            {admodalSwitch ? (
              <Address
                setModalSwitch={setadModalSwitch}
                handleAddress={handleAddress}
              />
            ) : null}
            <S.BPEditInput
              value={place}
              name="place"
              type="text"
              placeholder="장소"
              onClick={() => setadModalSwitch(true)}
              readOnly
            />
            <S.BPEditInput
              value={introduce}
              name="introduce"
              type="text"
              placeholder="소개"
              onChange={onChange}
            />
            <S.BPEditInput
              value={contact}
              name="contact"
              type="text"
              placeholder="연락처"
              onChange={onChange}
            />
            <S.ImgBox>
              {img ? (
                <PVImg img={img} />
              ) : (
                <S.Img src="/기본비즈니스프로필.jpeg" />
              )}
            </S.ImgBox>
            <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
            <S.BPEditInput name="img" type="file" onChange={fileChange} />
            <S.BPEditButton
              onClick={async (e) => {
                e.preventDefault();
                CreateBProfile(inputs, img);
              }}
            >
              생성하기
            </S.BPEditButton>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
