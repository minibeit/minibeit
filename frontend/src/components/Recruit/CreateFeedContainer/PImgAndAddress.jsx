import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";
import RecruitConfirmModal from "../../Common/Modal/RecruitConfirmModal";

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
  submit: PropTypes.func.isRequired,
};

export default function PImgAndAddress({ recruit, setRecruit, submit }) {
  const [addressModal, setAddressModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const fileChange = (e) => {
    const copy = { ...recruit };
    const imgArr = [...copy.images];
    if (e.target.files[0]) {
      copy.images = [...imgArr, e.target.files[0]];
      setRecruit(copy);
    }
  };
  const deleteImg = (e) => {
    var targetId = e.target.id;
    const copy = { ...recruit };
    copy.images.splice(targetId, 1);
    setRecruit(copy);
  };

  return (
    <>
      <h2>게시글 자료&이미지</h2>
      <S.ImgForm>
        <div>
          <S.FileLabel htmlFor="file">사진 추가</S.FileLabel>
          <S.FileInput id="file" type="file" onChange={fileChange} />
          {recruit.images.length !== 0
            ? recruit.images.map((a, i) => {
                return (
                  <S.ImgBox key={i}>
                    <S.DeleteImg id={i} onClick={deleteImg}>
                      삭제
                    </S.DeleteImg>
                    <PVImg img={recruit.images[i]} />
                  </S.ImgBox>
                );
              })
            : null}
        </div>
      </S.ImgForm>
      <h2>실험실 주소</h2>
      <S.AddressInput
        type="text"
        readOnly
        onClick={() => setAddressModal(!addressModal)}
        value={recruit.address}
      />
      {addressModal ? (
        <Address
          setModalSwitch={setAddressModal}
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
      <button onClick={() => setConfirmModal(!confirmModal)}>작성완료</button>
      {confirmModal && (
        <RecruitConfirmModal
          setModalSwitch={setConfirmModal}
          submit={submit}
          recruit={recruit}
        />
      )}
    </>
  );
}
