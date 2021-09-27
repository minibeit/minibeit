import React, { useState } from "react";

import { useRecoilState } from "recoil";
import { recruitState } from "../../../recoil/recruitState";
import { PVImg } from "../../Common";
import { handleCompressImg } from "../../../utils/imgCompress";
import Address from "../../Common/Address";

import * as S from "../style";

export default function PImgAndAddress() {
  const [recruit, setrecruit] = useRecoilState(recruitState);
  const [images, setImages] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [address, setAddress] = useState("");

  const fileChange = (e) => {
    if (e.target.files[0]) {
      setImages([...images, e.target.files[0]]);
    }
  };

  return (
    <>
      <h2>게시글 자료&이미지</h2>
      <S.ImgBox>
        {images.length !== 0
          ? images.map((a, i) => {
              return <PVImg img={images[i]} />;
            })
          : null}
      </S.ImgBox>
      <S.FileLabel for="file">사진 추가</S.FileLabel>
      <S.FileInput id="file" type="file" onChange={fileChange} />
      <h2>실험실 주소</h2>
      <S.AddressInput
        type="text"
        onClick={() => setModalSwitch(!modalSwitch)}
        value={address}
      />
      {modalSwitch ? (
        <Address
          setModalSwitch={setModalSwitch}
          handleAddress={(address) => {
            setAddress(address);
          }}
        />
      ) : null}
      <h2>실험실 연락처</h2>
      <input type="text" />
    </>
  );
}
