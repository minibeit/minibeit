import React from "react";
import TimeSelectBox from "./TimeSelectBox";
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
}) {
  return (
    <S.ContentBox>
      <S.DataBox>
        <p>참여날짜 및 시간 선택하기</p>
        <TimeSelectBox
          feedId={id}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
      </S.DataBox>
      <S.DataBox>
        <p>참여조건</p>
        <div>
          <ul>
            {recruitCondition ? (
              recruitConditionDetail.map((a, i) => <li key={i}>{a}</li>)
            ) : (
              <li>참여조건 없음</li>
            )}
          </ul>
        </div>
      </S.DataBox>
      <S.DataBox>
        <p>지급방식 및 상세내용</p>
        <div>
          <ul>
            <li>
              <span>금액</span> : {payment === "CACHE" ? `${cache}원` : goods}
            </li>
            <li>
              <span>지급</span> : {paymentDetail}
            </li>
          </ul>
        </div>
      </S.DataBox>

      <S.DataBox>
        <p>상세내용</p>
        {isMine && editSwitch === false && (
          <button onClick={() => setEditSwitch(!editSwitch)}>수정하기</button>
        )}
        <div>
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
        </div>
      </S.DataBox>
      <S.DataBox>
        <div>
          {feedDetailData && files.map((a, i) => <S.Img key={i} src={a.url} />)}
        </div>
      </S.DataBox>

      <S.DataBox>
        <p>참여 장소 및 연락처</p>
        <div>
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
        </div>
      </S.DataBox>
      <S.DataBox>
        <p>실험실 후기</p>
        <div>
          <ReveiwBox businessId={businessProfileInfo.id} />
        </div>
      </S.DataBox>
    </S.ContentBox>
  );
}