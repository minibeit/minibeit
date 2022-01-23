import React from "react";
import { PVImg } from "../../Common";
import Address from "../../Common/Address";

import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";
import { ReactComponent as Star } from "../../../svg/별.svg";
import { ReactComponent as Home } from "../../../svg/홈.svg";
import CloseIcon from "@mui/icons-material/Close";
import RegisterFeed from "../../Common/Alert/RegisterFeed";

import * as S from "../style";
import NotEnoughWrite from "../../Common/Alert/NotEnoughWrite";
import toast from "react-hot-toast";

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
      <S.DataInfoContainer>
        <p>1. 모집글 정보</p>
        <S.TitleBox>
          <p>제목</p>
          <input
            name="title"
            defaultValue={recruit.title}
            placeholder="참여자에게 보여주실 제목을 작성해주세요."
            onChange={(e) => {
              if (e.target.value.length > 40) {
                toast.error("게시물의 제목은 40자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 40);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={40}
          />
        </S.TitleBox>
        <div>
          <S.ConditionBox>
            <p>참여 조건</p>
            <div>
              <S.SelectRadio
                background={'url("/images/모집하기조건O이미지.png")'}
              >
                <input
                  type="radio"
                  onClick={() => conditionSwitch(true)}
                  name="condition"
                  id="conditionTrue"
                />
                <label htmlFor="conditionTrue" />
                <p>
                  참여조건이 있어
                  <br />
                  일부만 참여가능
                </p>
              </S.SelectRadio>
              <S.SelectRadio
                background={'url("/images/모집하기조건X이미지.png")'}
              >
                <input
                  type="radio"
                  onClick={() => conditionSwitch(false)}
                  name="condition"
                  id="conditionFalse"
                  defaultChecked
                />
                <label htmlFor="conditionFalse" />
                <p>
                  조건없이
                  <br />
                  모두 참여가능
                </p>
              </S.SelectRadio>
            </div>
            <div>
              <S.WageBox />
              {recruit.conditionDetail.map((a, i) => {
                return (
                  <S.Input disabled={!recruit.condition} key={i}>
                    <input
                      id={i}
                      defaultValue={recruit.conditionDetail[i]}
                      disabled={recruit.condition ? false : true}
                      placeholder="원하시는 참여자의 조건을 작성해주세요."
                      onChange={(e) => {
                        if (e.target.value.length > 20) {
                          toast.error("참여 조건은 20자 이내로 입력해주세요");
                          e.target.value = e.target.value.slice(0, 20);
                          writeCondition(e);
                        } else {
                          writeCondition(e);
                        }
                      }}
                      maxLength={20}
                    />
                  </S.Input>
                );
              })}
              <S.AddConditionBtn
                onClick={addConditionDetail}
                disabled={recruit.condition ? false : true}
              >
                <PlusIcon /> 추가
              </S.AddConditionBtn>
            </div>
          </S.ConditionBox>
          <S.PaymentBox>
            <p>지급 방식</p>
            <div>
              <S.SelectRadio background={'url("/images/돈다발아이콘.png")'}>
                <input
                  type="radio"
                  onClick={() => {
                    let copy = { ...recruit };
                    copy.payment = "CACHE";
                    copy.pay = "";
                    setRecruit(copy);
                  }}
                  name="payment"
                  id="cache"
                  defaultChecked
                />
                <label htmlFor="cache" />
                <p>현금으로 지급</p>
              </S.SelectRadio>
              <S.SelectRadio background={'url("/images/선물상자아이콘.png")'}>
                <input
                  type="radio"
                  onClick={() => {
                    let copy = { ...recruit };
                    copy.payment = "GOODS";
                    copy.pay = "";
                    setRecruit(copy);
                  }}
                  name="payment"
                  id="goods"
                />
                <label htmlFor="goods" />
                <p>보상품 지급</p>
              </S.SelectRadio>
            </div>
            <S.CacheBox>
              {recruit.payment === "CACHE" ? (
                <>
                  <S.WageBox>
                    <div>
                      {parseInt(recruit.pay) / (recruit.doTime / 60) < 9160 &&
                        "최저시급이 안됩니다"}
                    </div>
                    <p>
                      {recruit.pay
                        ? `시급 : ${
                            parseInt(recruit.pay) / (recruit.doTime / 60)
                          }`
                        : ""}
                    </p>
                  </S.WageBox>
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
                </>
              ) : (
                <>
                  <S.WageBox />
                  <S.PayInput>
                    <input
                      name="pay"
                      placeholder="무엇을 지급하시나요?  ex) 아메리카노 기프티콘"
                      defaultValue={recruit.pay}
                      onChange={(e) => {
                        if (e.target.value.length > 100) {
                          toast.error("100자 이내로 입력해주세요");
                          e.target.value = e.target.value.slice(0, 100);
                          onChange(e);
                        } else {
                          onChange(e);
                        }
                      }}
                    />
                  </S.PayInput>
                </>
              )}
              <S.PayInput>
                <input
                  name="payMemo"
                  defaultValue={recruit.payMemo}
                  placeholder="추가 사항이 있다면 작성해주세요."
                  onChange={(e) => {
                    if (e.target.value.length > 100) {
                      toast.error("100자 이내로 입력해주세요");
                      e.target.value = e.target.value.slice(0, 100);
                      onChange(e);
                    } else {
                      onChange(e);
                    }
                  }}
                />
              </S.PayInput>
            </S.CacheBox>
          </S.PaymentBox>
        </div>
        <S.ContentBox>
          <p>상세 글</p>
          <textarea
            name="content"
            defaultValue={recruit.content}
            placeholder="자세하게 서술하수록 참여자를 빠르게 모집할 수 있어요."
            onChange={(e) => {
              if (e.target.value.length > 500) {
                toast.error("게시물의 상세내용은 500자 이내로 입력해주세요");
                e.target.value = e.target.value.slice(0, 500);
                onChange(e);
              } else {
                onChange(e);
              }
            }}
            maxLength={500}
          />
        </S.ContentBox>
      </S.DataInfoContainer>
      <S.ExtraInfoContainer>
        <div>
          <p>2. 자동 입력</p>
          <p>수정이 필요하신 경우 수정해주세요</p>
        </div>
        <div>
          <S.InputBox>
            <p>참여 장소</p>
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
                    toast.error("휴대폰 번호를 다시 확인해주세요");
                  }
                }}
              />
            </S.Input>
          </S.InputBox>
        </div>
        <S.InputBox>
          <p>이미지</p>
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
      </S.ExtraInfoContainer>
      <S.ThumbnailContainer>
        <p>썸네일 이미지</p>
        <S.FeedBox>
          <S.FeedImgView
            thumbnail={
              recruit.images.length !== 0 &&
              URL.createObjectURL(recruit.images[0])
            }
          >
            <S.FeedBookmark>
              <Star />
              <p>0</p>
            </S.FeedBookmark>
          </S.FeedImgView>
          <S.FeedContentView>
            <S.FeedHeader>
              <p>{recruit.title}</p>
              <div>
                <Home />
                <p>{recruit.businessProfile.name}</p>
              </div>
            </S.FeedHeader>
            <S.FeedInfoData>
              <div>소요시간: {recruit.doTime}분</div>
              <S.RecruitTag recruit={recruit.condition}>
                참여조건 {recruit.condition ? "있음" : "없음"}
              </S.RecruitTag>
              <S.PaymentTag payment={recruit.payment}>
                {recruit.payment === "CACHE" ? (
                  <>
                    <span>현금</span> {recruit.pay}원
                  </>
                ) : (
                  <>
                    <span>물품</span> {recruit.pay}
                  </>
                )}
              </S.PaymentTag>
            </S.FeedInfoData>
          </S.FeedContentView>
        </S.FeedBox>
      </S.ThumbnailContainer>
      <S.SaveBtn onClick={clickSubmit}>작성완료</S.SaveBtn>
      {askComplete && (
        <RegisterFeed
          setAskComplete={setAskComplete}
          recruit={recruit}
          submit={submit}
        />
      )}
      {notEnough && (
        <NotEnoughWrite
          setNotEnough={setNotEnough}
          recruit={recruit}
          movePage={movePage}
        />
      )}
    </S.InputPage>
  );
}
