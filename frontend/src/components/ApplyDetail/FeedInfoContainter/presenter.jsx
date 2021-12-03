import React from "react";
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
  feedDetailData,
  files,
  place,
  contact,
  businessProfileInfo,
  currentImg,
  sliderSwitch,
  setSliderSwitch,
  imgOnClick,
  editAlert,
  setEditAlert,
  editOn,
}) {
  return (
    <S.ContentBox>
      <S.DataBox>
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
      </S.DataBox>
      <S.ConditionsDataBox>
        <S.DataHeader>
          <p>참여조건</p>
        </S.DataHeader>
        <S.DataContent>
          <ul>
            {recruitCondition ? (
              recruitConditionDetail.map((a, i) => <li key={i}>{a}</li>)
            ) : (
              <li>참여조건 없음</li>
            )}
          </ul>
        </S.DataContent>
      </S.ConditionsDataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>지급방식 및 상세내용</p>
        </S.DataHeader>
        <S.DataContent>
          <ul>
            <li>
              <span>금액</span> {payment === "CACHE" ? `${cache}원` : goods}
            </li>
            <li>
              <span>지급</span> {paymentDetail}
            </li>
          </ul>
        </S.DataContent>
      </S.DataBox>

      <S.DataBox>
        <S.DataHeader>
          <div>
            <p>상세내용</p>
            {isMine && editSwitch === false && (
              <S.EditBtn onClick={() => setEditAlert(true)}>수정하기</S.EditBtn>
            )}
          </div>
          {editAlert && (
            <EditOnlyDetails
              setEditSwitch={setEditSwitch}
              editSwitch={editSwitch}
              setEditAlert={setEditAlert}
            />
          )}
        </S.DataHeader>
        <S.DataContent2>
          <S.SmTitle>{feedDetailData.title}</S.SmTitle>
          {editSwitch ? (
            <div>
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
              <S.EditBtn onClick={editSubmit}>수정완료</S.EditBtn>
            </div>
          ) : (
            <S.DetailContent>
              {updatedContent ? <p>{updatedContent}</p> : <p>{content}</p>}
            </S.DetailContent>
          )}

          {files.length !== 0 ? (
            <S.ApplyImgContainer>
              <div>
                <S.BigImg src={files[0] && files[0].url} onClick={imgOnClick} />
              </div>
              <div>
                <div>
                  {files.length < 2 ? (
                    <S.NoImg />
                  ) : (
                    <S.SmImg
                      src={files[1] && files[1].url}
                      onClick={imgOnClick}
                    />
                  )}
                </div>
                <div>
                  {files.length < 3 ? (
                    <S.NoImg />
                  ) : (
                    <S.SmImg
                      src={files[2] && files[2].url}
                      onClick={imgOnClick}
                    />
                  )}
                </div>
                <div>
                  {files.length < 4 ? (
                    <S.NoImg />
                  ) : (
                    <S.SmImg
                      src={files[3] && files[3].url}
                      onClick={imgOnClick}
                    />
                  )}
                </div>
                {feedDetailData.files.length > 4 ? (
                  <S.Div onClick={imgOnClick}>+{files.length - 4}</S.Div>
                ) : null}
              </div>
              {sliderSwitch ? (
                <ApplyDetailImgsModal
                  files={files}
                  setSliderSwitch={setSliderSwitch}
                  currentImg={currentImg}
                />
              ) : null}
            </S.ApplyImgContainer>
          ) : null}
        </S.DataContent2>
      </S.DataBox>
      <S.DataBox2>
        <S.DataHeader>
          <p>참여 장소 및 연락처</p>
        </S.DataHeader>
        <S.DataContent>
          <ul>
            <li>
              <span>주소</span> <div>{place}</div>
            </li>
            <li>
              <span>연락처</span> {contact}
            </li>
            <li>
              <span>담당자</span> {businessProfileInfo.adminName}
            </li>
          </ul>
        </S.DataContent>
      </S.DataBox2>
      <S.DataBox>
        <S.DataHeader>
          <p>실험실 후기</p>
        </S.DataHeader>
        <S.DataContent>
          <ReveiwBox businessId={businessProfileInfo.id} />
        </S.DataContent>
      </S.DataBox>
    </S.ContentBox>
  );
}
