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
  const [imgBase64, setImgBase64] = useState("");
  const [img, setImg] = useState();
  const { name, category, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fileChange = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImg(e.target.files[0]);
  };
  const setBProfile = async (inputs, img) => {
    try {
      const result = await bprofileNew(inputs, img);
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
        {imgBase64 !== "" ? <S.BPNewImg src={imgBase64} /> : <S.BPNewImgBox />}

        <S.BPNewInput name="img" type="file" onChange={fileChange} />
        <S.BPSubmitBtn
          onClick={async (e) => {
            e.preventDefault();
            await setBProfile(inputs, img);
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
