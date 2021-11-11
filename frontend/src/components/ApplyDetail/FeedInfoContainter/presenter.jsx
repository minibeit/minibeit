import React from "react";
import TimeSelectBox from "./TimeSelectBox";
import ApplyDetailImgsModal from "../../Common/Modal/ApplyDetailImgsModal";
import ReveiwBox from "./ReviewBox";

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
  modalSwitch,
  setModalSwitch,
  imgOnClick,
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
      <S.DataBox>
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
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>지급방식 및 상세내용</p>
        </S.DataHeader>
        <S.DataContent>
          <ul>
            <li>
              <span>금액</span> : {payment === "CACHE" ? `${cache}원` : goods}
            </li>
            <li>
              <span>지급</span> : {paymentDetail}
            </li>
          </ul>
        </S.DataContent>
      </S.DataBox>

      <S.DataBox>
        <S.DataHeader>
          <p>상세내용</p>
          {isMine && editSwitch === false && (
            <button onClick={() => setEditSwitch(!editSwitch)}>수정하기</button>
          )}
        </S.DataHeader>
        <S.DataContent>
          {editSwitch ? (
            <div>
              <S.EditTextArea
                defaultValue={updatedContent ? updatedContent : content}
                onChange={(e) => {
                  setNewContent(e.target.value);
                }}
              />
              <button onClick={editSubmit}>수정완료</button>
            </div>
          ) : (
            <S.DetailContent>
              {updatedContent ? <p>{updatedContent}</p> : <p>{content}</p>}
            </S.DetailContent>
          )}
        </S.DataContent>
      </S.DataBox>
      <S.DataBox>
        {files.length !== 0 ? (
          <S.ApplyImgContainer>
            <div>
              <S.BigImg src={files[0] && files[0].url} onClick={imgOnClick} />
            </div>
            <div>
              <div>
                <S.SmImg
                  src={files[1] && files[1].url}
                  onClick={files.length < 2 ? null : imgOnClick}
                />
              </div>
              <div>
                <S.SmImg
                  src={files[2] && files[2].url}
                  onClick={files.length < 3 ? null : imgOnClick}
                />
              </div>
              <div>
                <S.SmImg
                  src={files[3] && files[3].url}
                  onClick={files.length < 4 ? null : imgOnClick}
                />
              </div>
              {feedDetailData.files.length > 4 ? (
                <S.Div onClick={imgOnClick}>+{files.length - 4}</S.Div>
              ) : null}
            </div>
            {modalSwitch ? (
              <ApplyDetailImgsModal
                files={files}
                setModalSwitch={setModalSwitch}
                currentImg={currentImg}
              />
            ) : null}
          </S.ApplyImgContainer>
        ) : null}
      </S.DataBox>

      <S.DataBox>
        <S.DataHeader>
          <p>참여 장소 및 연락처</p>
        </S.DataHeader>
        <S.DataContent>
          <ul>
            <li>
              <span>주소</span> : {place}
            </li>
            <li>
              <span>연락처</span> : {contact}
            </li>
            <li>
              <span>담당자</span> : {businessProfileInfo.adminName}
            </li>
          </ul>
        </S.DataContent>
      </S.DataBox>
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
