import React, { useState } from "react";
import * as S from "../style";

function PFNContainer({ bpList, schoolList, FNHandler }) {
  const [infoinputs, setInfoInputs] = useState({
    title: "",
    payment: "",
    doTime: "",
    place: "",
    content: "",
    contact: "",
    schoolId: "",
    cache: "",
    goods: "",
    condition: "",
    conditionDetail: "",
    businessProfileId: "",
    headcount: "",
  });
  const [dateinputs, setDateInputs] = useState({
    startDay: "",
    endDay: "",
    startTime: "",
    endTime: "",
  });
  const [files, setFiles] = useState();
  const {
    title,
    payment,
    doTime,
    place,
    content,
    contact,
    schoolId,
    cache,
    goods,
    condition,
    conditionDetail,
    businessProfileId,
    headcount,
  } = infoinputs;
  const { startDay, endDay, startTime, endTime } = dateinputs;
  const onInfoChange = (e) => {
    const { value, name } = e.target;
    setInfoInputs({
      ...infoinputs,
      [name]: value,
    });
  };
  const onDateChange = (e) => {
    const { value, name } = e.target;
    setDateInputs({
      ...dateinputs,
      [name]: value,
    });
  };
  const fileChange = (e) => {
    setFiles(e.target.files[0]);
  };
  // window.addEventListener("beforeunload", function (e) {
  //   let confirmationMessage = "정말 닫으시겠습니까?";
  //   e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
  //   return confirmationMessage; // Gecko, WebKit, Chrome < 34
  // });
  return (
    <>
      <S.FNBottomWrapper>
        <S.FNLabel>
          {" "}
          게시물 제목을 입력하세요
          <S.FNTitle
            placeholder="제목"
            name="title"
            type="text"
            value={title || ""}
            onChange={onInfoChange}
          />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          {" "}
          학교선택
          <S.FNSchool
            name="schoolId"
            defaultValue={"DEFAULT"}
            onChange={onInfoChange}
          >
            <option value="DEFAULT" disabled>
              학교를 선택하세요
            </option>
            {schoolList.map(({ id, name }) => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </S.FNSchool>
        </S.FNLabel>
        <br />
        <S.FNLabel>
          {" "}
          작성자
          <S.FNauthor
            name="businessProfileId"
            defaultValue={"DEFAULT"}
            onChange={onInfoChange}
          >
            <option value="DEFAULT" disabled>
              작성할 비즈니스 프로필을 선택하세요
            </option>
            {bpList.map(({ id, name, avatar }) => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </S.FNauthor>
        </S.FNLabel>
        <S.FNLabel>
          모집 인원수
          <S.FNcache
            type="number"
            name="headcount"
            value={headcount}
            onChange={onInfoChange}
          />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          모집시작 날짜
          <S.FNdueDate
            type="date"
            name="startDay"
            value={startDay}
            onChange={onDateChange}
          />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          모집마감 날짜
          <S.FNdueDate
            type="date"
            name="endDay"
            value={endDay}
            onChange={onDateChange}
          />
        </S.FNLabel>
        <S.FNLabel>
          모집시작 시간
          <S.FNdueDate
            type="time"
            name="startTime"
            value={startTime || ""}
            onChange={onDateChange}
          />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          모집마감 시간
          <S.FNdueDate
            type="time"
            name="endTime"
            value={endTime}
            step="900"
            onChange={onDateChange}
          />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          지급방법
          <S.FNpayment
            defaultValue={"DEFAULT"}
            name="payment"
            onChange={onInfoChange}
          >
            <option value="DEFAULT" disabled>
              지급 방법 선택하세요
            </option>
            <option value="CACHE" key={0}>
              현금
            </option>
            <option value="GOODS" key={1}>
              보상
            </option>
          </S.FNpayment>
        </S.FNLabel>
        <br />
        {payment === "CACHE" ? (
          <S.FNLabel>
            현금 액수
            <S.FNcache
              type="number"
              name="cache"
              value={cache}
              onChange={onInfoChange}
            />
          </S.FNLabel>
        ) : payment === "GOODS" ? (
          <S.FNLabel>
            보상 종류{" "}
            <S.FNcache
              type="text"
              name="goods"
              value={goods}
              onChange={onInfoChange}
            />
          </S.FNLabel>
        ) : null}
        <br />
        <S.FNLabel>
          구인조건
          <S.FNcondition
            defaultValue={"DEFAULT"}
            name="condition"
            onChange={onInfoChange}
          >
            <option value="DEFAULT" disabled>
              구인조건이 있습니까?
            </option>
            <option value={true} key={0}>
              있다
            </option>
            <option value={false} key={1}>
              없다
            </option>
          </S.FNcondition>
        </S.FNLabel>
        <br />
        {condition === "true" ? (
          <S.FNLabel>
            구인조건 상세설명{" "}
            <S.FNconditionDetail
              type="text"
              name="conditionDetail"
              value={conditionDetail}
              onChange={onInfoChange}
            />
          </S.FNLabel>
        ) : null}
        <br />
        <S.FNLabel>
          소요시간{" "}
          <S.FNdoTime
            defaultValue={"DEFAULT"}
            name="doTime"
            onChange={onInfoChange}
          >
            <option value="DEFAULT" disabled>
              소요되는 실험 시간 단위를 고르세요 (단, 분 단위 계산)
            </option>
            <option value={30} key={0}>
              30분
            </option>
            <option value={60} key={1}>
              60분
            </option>
            <option value={90} key={2}>
              90분
            </option>
            <option value={120} key={3}>
              120분
            </option>
            <option value={150} key={4}>
              150분
            </option>
            <option value={180} key={5}>
              180분
            </option>
          </S.FNdoTime>
        </S.FNLabel>
        <br />
        <S.FNLabel>
          {" "}
          장소
          <S.FNplace
            placeholder="장소"
            type="text"
            name="place"
            value={place}
            onChange={onInfoChange}
          />
        </S.FNLabel>

        <br />
        <S.FNLabel>
          연락처
          <S.FNcontact name="contact" value={contact} onChange={onInfoChange} />
        </S.FNLabel>
        <br />
        <S.FNLabel>
          추가정보
          <S.FNdetailInfo
            name="content"
            placeholder="추가정보"
            rows="5"
            cols="33"
            value={content}
            onChange={onInfoChange}
          />
        </S.FNLabel>
        <S.FNFile type="file" name="files" onChange={fileChange} />

        <S.FNcreateBtn
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await FNHandler(infoinputs, dateinputs, files);
          }}
        >
          게시물 생성
        </S.FNcreateBtn>
      </S.FNBottomWrapper>
    </>
  );
}
export default PFNContainer;
