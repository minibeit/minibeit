import React, { useState } from "react";
import Portal from "../Portal";
import { PVImg } from "../..";
import PropTypes from "prop-types";
import { handleCompressImg } from "../../../../utils/imgCompress";
import * as S from "./style";

CreateBProfileModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  CreateBProfile: PropTypes.func.isRequired,
};

export default function CreateBProfileModal({
  setModalSwitch,
  CreateBProfile,
}) {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    place: "",
    introduce: "",
    contact: "",
  });
  const [img, setImg] = useState();
  const { name, category, place, introduce, contact } = inputs;
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
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.BPNewInput
              value={name}
              name="name"
              type="text"
              placeholder="이름"
              onChange={onChange}
            />
            <S.BPNewInput
              value={category}
              name="category"
              type="text"
              placeholder="카테고리"
              onChange={onChange}
            />
            <S.BPNewInput
              value={place}
              name="place"
              type="text"
              placeholder="장소"
              onChange={onChange}
            />
            <S.BPNewInput
              value={introduce}
              name="introduce"
              type="text"
              placeholder="소개"
              onChange={onChange}
            />
            <S.BPNewInput
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
            <S.BPNewInput name="img" type="file" onChange={fileChange} />
            <S.BPSubmitBtn
              onClick={async (e) => {
                e.preventDefault();
                CreateBProfile(inputs, img);
              }}
            >
              생성하기
            </S.BPSubmitBtn>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
