import React, { useState } from "react";
import Portal from "../../Common/Modal/Portal";
import { PVImg } from "../../Common";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "../style";
import Address from "../../Common/Address";
import { handleCompressImg } from "../../../utils/imgCompress";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

BCreateCont.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  CreateBProfile: PropTypes.func.isRequired,
};

export default function BCreateCont({ setModalSwitch, CreateBProfile }) {
  const [inputs, setInputs] = useState({
    name: "",
    place: "",
    introduce: "afewf",
    contact: "",
  });
  const [img, setImg] = useState();
  const [admodalSwitch, setadModalSwitch] = useState(false);
  const admin = useRecoilValue(userState).name;
  const handleAddress = async (fullAddress) => {
    setInputs({
      ...inputs,
      place: fullAddress,
    });
  };
  const { name, place, contact } = inputs;
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
            <p>비즈니스 프로필 생성하기</p>
            <S.CloseModalBtn onClick={closeModal}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.BNCont1>
              <S.ImgBox>
                {img ? (
                  <PVImg img={img} />
                ) : (
                  <S.Img src="/기본비즈니스프로필.jpeg" />
                )}
              </S.ImgBox>
              <S.ImgDel onClick={imgDel}>기본이미지로 변경</S.ImgDel>
              <S.FileLabel htmlFor="input-file">사진 업로드 하기</S.FileLabel>
              <S.BPEditFileInput
                id="input-file"
                name="img"
                type="file"
                onChange={fileChange}
              />
            </S.BNCont1>
            <S.BNCont2>
              <S.BNCont21>
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
                  <S.BPEditInput
                    value={admin}
                    name="admin"
                    type="text"
                    readOnly
                  />
                </S.BNLabel>
              </S.BNCont21>
              <S.BNCont22>
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
              </S.BNCont22>
              <S.BNCont23>
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
              </S.BNCont23>
            </S.BNCont2>
          </S.ModalContent>
          <S.BPEditButton
            onClick={async (e) => {
              e.preventDefault();
              CreateBProfile(inputs, img);
            }}
          >
            <p>생성하기</p>
          </S.BPEditButton>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
