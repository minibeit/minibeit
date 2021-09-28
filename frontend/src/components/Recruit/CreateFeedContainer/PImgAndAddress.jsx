import React, { useState } from "react";

import { PVImg } from "../../Common";
import Address from "../../Common/Address";

import * as S from "../style";

export default function PImgAndAddress({ recruit, setRecruit }) {
  const [modalSwitch, setModalSwitch] = useState(false);

  const fileChange = (e) => {
    const copy = { ...recruit };
    const imgArr = [...copy.images];
    if (e.target.files[0]) {
      copy.images = [...imgArr, e.target.files[0]];
      setRecruit(copy);
    }
  };

  return (
    <>
      <h2>게시글 자료&이미지</h2>
      <S.ImgBox>
        {recruit.images.length !== 0
          ? recruit.images.map((a, i) => {
              return <PVImg key={i} img={recruit.images[i]} />;
            })
          : null}
      </S.ImgBox>
      <S.FileLabel htmlFor="file">사진 추가</S.FileLabel>
      <S.FileInput id="file" type="file" onChange={fileChange} />
      <h2>실험실 주소</h2>
      <S.AddressInput
        type="text"
        readOnly
        onClick={() => setModalSwitch(!modalSwitch)}
        value={recruit.address}
      />
      {modalSwitch ? (
        <Address
          setModalSwitch={setModalSwitch}
          handleAddress={(address) => {
            const copy = { ...recruit };
            copy.address = address;
            setRecruit(copy);
          }}
        />
      ) : null}
      <h2>실험실 연락처</h2>
      <input
        placeholder="000-0000-0000"
        onChange={(e) => {
          const copy = { ...recruit };
          copy.contact = e.target.value;
          setRecruit(copy);
        }}
      />
    </>
  );
}
