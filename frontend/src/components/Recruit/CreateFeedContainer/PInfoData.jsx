import React, { useState } from "react";
import PropTypes from "prop-types";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";
import RecruitConfirmModal from "../../Common/Modal/RecruitConfirmModal";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import * as S from "../style";

PInfoData.propTypes = {
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

export default function PInfoData({ recruit, setRecruit, submit }) {
  const [addressModal, setAddressModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const addConditionDetail = () => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr.push("");
    copy.conditionDetail = arr;
    setRecruit(copy);
  };
  const writeCondition = (e) => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr[e.target.id] = e.target.value;
    copy.conditionDetail = arr;
    setRecruit(copy);
  };

  const conditionSwitch = () => {
    const copy = { ...recruit };
    copy.condition = !recruit.condition;
    setRecruit(copy);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...recruit };
    copy[name] = e.target.value;
    setRecruit(copy);
  };

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
    <S.Page>
      <S.InputContainer>
        <S.InputBox>
          <p>제목</p>
          <input name="title" onChange={onChange} />
        </S.InputBox>
        <S.InputBox>
          <p>상세 모집 요강</p>
          <input name="content" onChange={onChange} />
        </S.InputBox>
        <S.InputBox>
          <p>지원 조건</p>
          <Switch
            checked={recruit["condition"]}
            onChange={conditionSwitch}
            name="condition"
            color="primary"
          />
          {recruit.conditionDetail.map((a, i) => {
            return (
              <div key={i}>
                <S.ConditionInput
                  id={i}
                  disabled={recruit.condition ? false : true}
                  onChange={writeCondition}
                />
              </div>
            );
          })}
          <button
            onClick={addConditionDetail}
            disabled={recruit.condition ? false : true}
          >
            +
          </button>
        </S.InputBox>
        <S.InputBox>
          <p>금액 및 지급 분류</p>
          <ToggleButtonGroup
            value={recruit.payment}
            exclusive
            onChange={(e, value) => {
              const copy = { ...recruit };
              copy.payment = value;
              setRecruit(copy);
            }}
            aria-label="text alignment"
          >
            <ToggleButton value="CACHE" aria-label="cache">
              현금
            </ToggleButton>
            <ToggleButton value="GOODS" aria-label="goods">
              보상
            </ToggleButton>
          </ToggleButtonGroup>
          {recruit.payment === "CACHE" ? (
            <>
              <S.PaymentInput
                name="pay"
                type="number"
                defaultValue={0}
                onChange={onChange}
              />
              <span>원</span>
            </>
          ) : (
            <S.PaymentInput
              name="pay"
              placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
              onChange={onChange}
            />
          )}
          <S.PaymentMemo
            name="payMemo"
            placeholder="남기실 메모가 있다면 적어주세요"
            onChange={onChange}
          />
        </S.InputBox>
        <S.InputBox>
          <p>게시글 자료&이미지</p>
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
        </S.InputBox>
        <S.InputBox>
          <p>실험실 주소</p>
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
        </S.InputBox>
        <S.InputBox>
          <p>실험실 연락처</p>
          <input
            placeholder="000-0000-0000"
            onChange={(e) => {
              const copy = { ...recruit };
              copy.contact = e.target.value;
              setRecruit(copy);
            }}
          />
        </S.InputBox>
        <button onClick={() => setConfirmModal(!confirmModal)}>작성완료</button>
        {confirmModal && (
          <RecruitConfirmModal
            setModalSwitch={setConfirmModal}
            submit={submit}
            recruit={recruit}
          />
        )}
      </S.InputContainer>
    </S.Page>
  );
}
