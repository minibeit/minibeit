import React from "react";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RegisterFeed from "../../Common/Alert/RegisterFeed";

import * as S from "../style";
import NotEnoughWrite from "../../Common/Alert/NotEnoughWrite";

export default function Presenter({
  onChange,
  recruit,
  setRecruit,
  conditionSwitch,
  writeCondition,
  addConditionDetail,
  fileChange,
  deleteImg,
  setAddressModal,
  addressModal,
  setConfirmModal,
  confirmModal,
  submit,
  setAskComplete,
  askComplete,
  setNotEnough,
  notEnough,
  clickSubmit,
  movePage,
}) {
  const exceptPhone = (value) => {
    var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
    if (!regPhone.test(value)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <S.InputPage>
      <S.InputContainer>
        <S.TitleBox>
          <p>제목</p>
          <input
            name="title"
            onChange={(e) => {
              if (e.target.value.length > 20) {
                alert("게시물의 제목은 20자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 20);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={20}
          />
        </S.TitleBox>
        <S.ContentBox>
          <p>상세 모집 요강</p>
          <textarea
            name="content"
            onChange={(e) => {
              if (e.target.value.length > 500) {
                alert("게시물의 상세내용은 500자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 500);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={500}
          />
        </S.ContentBox>
        <S.ConditionBox>
          <div>
            <p>참여 조건</p>
            <Switch
              checked={recruit["condition"]}
              onChange={conditionSwitch}
              name="condition"
              color="primary"
            />
          </div>
          {recruit.conditionDetail.map((a, i) => {
            return (
              <S.ConditionInput key={i}>
                <input
                  id={i}
                  disabled={recruit.condition ? false : true}
                  onChange={(e) => {
                    if (e.target.value.length > 20) {
                      alert("참여 조건은 20자 이내로 입력해주세요");
                      e.target.value = e.target.value.slice(0, 20);
                      writeCondition(e);
                    } else {
                      writeCondition(e);
                    }
                  }}
                  maxLength={20}
                />
                <button
                  onClick={addConditionDetail}
                  disabled={recruit.condition ? false : true}
                >
                  <AddIcon />
                </button>
              </S.ConditionInput>
            );
          })}
        </S.ConditionBox>
        <S.PaymentBox>
          <div>
            <p>금액 및 지급 분류</p>
            <ToggleButtonGroup
              value={recruit.payment}
              exclusive
              onChange={(e, value) => {
                const copy = { ...recruit };
                copy.payment = value;
                setRecruit(copy);
              }}
            >
              <ToggleButton value="CACHE">현금</ToggleButton>
              <ToggleButton value="GOODS">보상</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {recruit.payment === "CACHE" ? (
            <S.PayInput>
              <input
                name="pay"
                type="number"
                onChange={onChange}
                step={100}
                min={0}
              />
              <span>원</span>
            </S.PayInput>
          ) : (
            <S.PayInput>
              <input
                name="pay"
                placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
                onChange={(e) => {
                  if (e.target.value.length > 100) {
                    alert("100자 이내로 입력해주세요");
                    e.target.value = e.target.value.slice(0, 100);
                    onChange(e);
                  } else {
                    onChange(e);
                  }
                }}
              />
            </S.PayInput>
          )}
          <S.PayInput>
            <input
              name="payMemo"
              placeholder="남기실 메모가 있다면 적어주세요"
              onChange={(e) => {
                if (e.target.value.length > 100) {
                  alert("100자 이내로 입력해주세요");
                  e.target.value = e.target.value.slice(0, 100);
                  onChange(e);
                } else {
                  onChange(e);
                }
              }}
            />
          </S.PayInput>
        </S.PaymentBox>
        <S.InputBox>
          <p>게시글 자료&이미지</p>
          <S.ImgForm>
            <div>
              <S.FileLabel htmlFor="file">
                <AddIcon />
              </S.FileLabel>
              <S.FileInput
                id="file"
                type="file"
                accept="image/*"
                onChange={fileChange}
              />
              {recruit.images.length !== 0
                ? recruit.images.map((a, i) => {
                    return (
                      <S.ImgBox key={i}>
                        <S.DeleteImg name={a.name} onClick={deleteImg}>
                          <CloseIcon />
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
          <S.Input>
            <input
              type="text"
              readOnly
              placeholder="주소 찾기"
              onClick={() => setAddressModal(!addressModal)}
              value={recruit.address}
            />
          </S.Input>
          <S.Input>
            <input
              name="detailAddress"
              placeholder="상세 주소를 입력해주세요."
              onChange={onChange}
            />
          </S.Input>
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
          <S.Input>
            <input
              placeholder="'-' 없이 숫자만 입력"
              onChange={(e) => {
                const copy = { ...recruit };
                copy.contact = e.target.value;
                setRecruit(copy);
              }}
              onBlur={(e) => {
                if (!exceptPhone(e.target.value)) {
                  e.target.value = "";
                  onChange(e);
                  alert("휴대폰 번호를 다시 확인해주세요");
                }
              }}
            />
          </S.Input>
        </S.InputBox>
        <S.SaveBtn onClick={clickSubmit}>작성완료</S.SaveBtn>
        {askComplete ? (
          <RegisterFeed
            setAskComplete={setAskComplete}
            recruit={recruit}
            submit={submit}
          />
        ) : null}
        {notEnough ? (
          <NotEnoughWrite
            setNotEnough={setNotEnough}
            recruit={recruit}
            movePage={movePage}
          />
        ) : null}
      </S.InputContainer>
    </S.InputPage>
  );
}
