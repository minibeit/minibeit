import React from "react";
import Carousel from "react-material-ui-carousel";
import TimeSelectBox from "./TimeSelectBox";
import ApplyDetailImgsModal from "../../Common/Modal/ApplyDetailImgsModal";
import ReveiwBox from "./ReviewBox";
import EditOnlyDetails from "../../Common/Alert/EditOnlyDetails";
import * as S from "../style";

export default function Presenter({
  id,
  date,
  startDate,
  endDate,
  recruitCondition,
  recruitConditionDetail,
  payment,
  cache,
  goods,
  paymentDetail,
  isMine,
  editSwitch,
  setEditSwitch,
  updatedContent,
  content,
  setNewContent,
  editSubmit,
  files,
  address,
  addressDetail,
  contact,
  businessProfileInfo,
  sliderSwitch,
  setSliderSwitch,
  editAlert,
  setEditAlert,
}) {
  return (
    <S.ContentBox>
      <div>
        <S.DataHeader style={{ border: "none" }}>
          <p>참여날짜 및 시간 선택하기</p>
        </S.DataHeader>
        <S.DataContent>
          <TimeSelectBox
            feedId={id}
            date={date}
            startDate={startDate}
            endDate={endDate}
          />
        </S.DataContent>
      </div>
      <div>
        <S.DataHeader>
          <p>참여조건</p>
        </S.DataHeader>
        <S.DataContent>
          <S.RecruitLabel condition={recruitCondition}>
            {recruitCondition ? "참여조건 있음" : "참여조건 없음"}
          </S.RecruitLabel>
          <div>
            {recruitCondition &&
              recruitConditionDetail.map((a, i) => (
                <S.ListBox key={i}>
                  <li>{a}</li>
                </S.ListBox>
              ))}
          </div>
        </S.DataContent>
      </div>
      <div>
        <S.DataHeader>
          <p>지급방식 및 상세내용</p>
        </S.DataHeader>
        <S.DataContent>
          <S.ListBox>
            <li>
              <div>금액</div>
              <S.PaymentLabel payment={payment}>
                {payment === "CACHE" ? `현금` : "물품"}
              </S.PaymentLabel>
              <div style={{ color: "#505050" }}>
                {payment === "CACHE" ? `${cache}원` : goods}
              </div>
            </li>
          </S.ListBox>
          <S.ListBox>
            <li>
              <div>지급</div>
              <div>{paymentDetail}</div>
            </li>
          </S.ListBox>
        </S.DataContent>
      </div>

      <div>
        <S.DataHeader>
          <p>상세내용</p>
          {isMine && (
            <>
              {editSwitch ? (
                <S.EditBtn onClick={editSubmit}>수정완료</S.EditBtn>
              ) : (
                <S.EditBtn onClick={() => setEditAlert(true)}>
                  수정하기
                </S.EditBtn>
              )}
            </>
          )}
          {editAlert && (
            <EditOnlyDetails
              setEditSwitch={setEditSwitch}
              editSwitch={editSwitch}
              setEditAlert={setEditAlert}
            />
          )}
        </S.DataHeader>
        <S.DataContent>
          {editSwitch ? (
            <S.EditTextArea
              defaultValue={updatedContent ? updatedContent : content}
              onChange={(e) => {
                if (e.target.value.length > 500) {
                  alert("500자 이내로 입력해주세요");
                  e.target.value = e.target.value.slice(0, 500);
                  setNewContent(e.target.value);
                } else {
                  setNewContent(e.target.value);
                }
              }}
            />
          ) : (
            <S.DetailContent>
              {updatedContent ? <p>{updatedContent}</p> : <p>{content}</p>}
            </S.DetailContent>
          )}
          {files.length !== 0 && (
            <>
              <div style={{ padding: "2em 0" }}>
                <Carousel
                  autoPlay={false}
                  animation={"fade"}
                  navButtonsAlwaysVisible={true}
                >
                  {files.map((image, i) => (
                    <S.SliderImg
                      key={i}
                      onClick={() => setSliderSwitch(true)}
                      img={image.url}
                    />
                  ))}
                </Carousel>
              </div>
              {sliderSwitch && (
                <ApplyDetailImgsModal
                  files={files}
                  setSliderSwitch={setSliderSwitch}
                />
              )}
            </>
          )}
        </S.DataContent>
      </div>
      <div>
        <S.DataHeader>
          <p>참여 장소 및 연락처</p>
        </S.DataHeader>
        <S.DataContent>
          <S.ListBox>
            <li>
              <div>주소</div>{" "}
              <S.AddressText
                onClick={() => {
                  window.open(`https://map.naver.com/v5/search/${address}`);
                }}
              >
                {addressDetail ? `${address} ${addressDetail}` : `${address}`}
              </S.AddressText>
            </li>
          </S.ListBox>
          <S.ListBox>
            <li>
              <div>연락처</div> {contact}
            </li>
          </S.ListBox>
          <S.ListBox>
            <li>
              <div>담당자</div> {businessProfileInfo.adminName}
            </li>
          </S.ListBox>
        </S.DataContent>
      </div>
      <div>
        <S.DataHeader>
          <p>참여 후기</p>
        </S.DataHeader>
        <S.DataContent>
          <ReveiwBox businessId={businessProfileInfo.id} />
        </S.DataContent>
      </div>
    </S.ContentBox>
  );
}
