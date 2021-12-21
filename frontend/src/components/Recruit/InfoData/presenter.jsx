import React from "react";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";
import Switch from "@mui/material/Switch";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";
import CloseIcon from "@mui/icons-material/Close";
import RegisterFeed from "../../Common/Alert/RegisterFeed";

import * as S from "../style";
import NotEnoughWrite from "../../Common/Alert/NotEnoughWrite";
import { toast } from "react-toastify";
import { ReactComponent as ArrowIcon } from "../../../svg/체크.svg";

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
        <div>
          <button onClick={() => movePage(1)}>
            <ArrowIcon />
            뒤로가기
          </button>
          <p>
            마지막 단계에요. 아래의 내용들을 채우시고, 모집공고 작성을
            완료해보세요.
          </p>
        </div>
        <S.TitleBox>
          <p>제목</p>
          <input
            name="title"
            defaultValue={recruit.title}
            placeholder="참여자에게 보여주실 제목을 작성해주세요."
            onChange={(e) => {
              if (e.target.value.length > 20) {
                toast.info("게시물의 제목은 20자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 20);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={20}
          />
        </S.TitleBox>
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
              <S.ConditionInput disabled={!recruit.condition} key={i}>
                <input
                  id={i}
                  defaultValue={recruit.conditionDetail[i]}
                  disabled={recruit.condition ? false : true}
                  placeholder="원하시는 참여자의 조건을 작성해주세요."
                  onChange={(e) => {
                    if (e.target.value.length > 20) {
                      toast.info("참여 조건은 20자 이내로 입력해주세요");
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
                  <PlusIcon />
                </button>
              </S.ConditionInput>
            );
          })}
        </S.ConditionBox>
        <S.PaymentBox>
          <div>
            <p>지급 방식</p>
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
            <S.CacheBox>
              <div>
                <p>총지급</p>
                <S.PayInput>
                  <input
                    name="pay"
                    type="text"
                    defaultValue={recruit.pay}
                    onChange={(e) => {
                      if (isNaN(parseInt(e.target.value))) {
                        e.target.value = 0;
                      } else {
                        e.target.value = parseInt(e.target.value);
                      }
                      onChange(e);
                    }}
                  />
                  <span>원</span>
                </S.PayInput>
              </div>
              <div>
                <p>시급</p>
                <S.PayInput>
                  <input
                    value={
                      recruit.pay
                        ? parseInt(recruit.pay) / (recruit.doTime / 60)
                        : ""
                    }
                    readOnly
                  />
                  <span>원</span>
                </S.PayInput>
              </div>
            </S.CacheBox>
          ) : (
            <S.PayInput>
              <input
                name="pay"
                placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
                defaultValue={recruit.pay}
                onChange={(e) => {
                  if (e.target.value.length > 100) {
                    toast.info("100자 이내로 입력해주세요");
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
              defaultValue={recruit.payMemo}
              placeholder="지급 기한과 같은, 보상과 관련한 내용이 있다면 작성해주세요."
              onChange={(e) => {
                if (e.target.value.length > 100) {
                  toast.info("100자 이내로 입력해주세요");
                  e.target.value = e.target.value.slice(0, 100);
                  onChange(e);
                } else {
                  onChange(e);
                }
              }}
            />
          </S.PayInput>
        </S.PaymentBox>
        <S.ContentBox>
          <p>상세 글</p>
          <textarea
            name="content"
            defaultValue={recruit.content}
            placeholder="자세하게 서술하수록 참여자를 빠르게 모집할 수 있어요."
            onChange={(e) => {
              if (e.target.value.length > 500) {
                toast.info("게시물의 상세내용은 500자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 500);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={500}
          />
        </S.ContentBox>
        <S.InputBox>
          <p>참여 장소</p>
          <p>참여자와 만나게 될 장소를 작성해주세요.</p>
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
              defaultValue={recruit.detailAddress}
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
          <p>담당자 연락처</p>
          <p>참여자가 모집 공고에 관해 연락할 수 있는 연락처를 작성해주세요.</p>
          <S.Input>
            <input
              placeholder="'-' 없이 숫자만 입력"
              defaultValue={recruit.contact}
              onChange={(e) => {
                const copy = { ...recruit };
                copy.contact = e.target.value;
                setRecruit(copy);
              }}
              onBlur={(e) => {
                if (!exceptPhone(e.target.value)) {
                  e.target.value = "";
                  onChange(e);
                  toast.info("휴대폰 번호를 다시 확인해주세요");
                }
              }}
            />
          </S.Input>
        </S.InputBox>
        <S.InputBox>
          <p>이미지</p>
          <p>이미지를 제공하시면, 참여자가 쉽게 이해할 수 있어요.</p>
          <S.ImgForm>
            <div>
              <S.FileLabel htmlFor="file">
                <PlusIcon />
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
                        {i === 0 && <S.ThumbnailTag>썸네일</S.ThumbnailTag>}
                        <S.DeleteImg name={a.name} onClick={() => deleteImg(i)}>
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
