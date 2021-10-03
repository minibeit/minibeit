import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";

import * as S from "../style";

PImgAndAddress.propTypes = {
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
  setRecruit: PropTypes.func.isRequired,
};

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
