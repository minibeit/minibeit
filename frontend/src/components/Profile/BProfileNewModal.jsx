import { useState } from "react";
import { createPortal } from "react-dom";
import { bprofileNew } from "../../utils";
import PropTypes from "prop-types";

import * as S from "./style";

BProfileNewModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

function BProfileNewModal({ closeModal }) {
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    place: "",
    introduce: "",
    contact: "",
  });
  const { name, category, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const setBProfile = async (inputs) => {
    try {
      const result = await bprofileNew(inputs);
      const data = result.data;
      if (data) {
        closeModal(data);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  return createPortal(
    <>
      <S.ModalWrapper>
        <S.ModalClose onClick={closeModal}>x</S.ModalClose>
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
        <S.BPSubmitBtn
          onClick={async (e) => {
            e.preventDefault();
            await setBProfile(inputs);
          }}
        >
          생성하기
        </S.BPSubmitBtn>
      </S.ModalWrapper>
    </>,
    document.getElementById("modal")
  );
}

export default BProfileNewModal;
