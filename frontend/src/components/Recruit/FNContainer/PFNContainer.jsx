import React, { useState } from "react";
import * as S from "../style";

function PFNContainer({ bpList, schoolList, FNHandler }) {
  const [inputs, setInputs] = useState({
    title: "",
    dueDate: "",
    doDate: "",
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
  });
  const [files, setFiles] = useState();
  const {
    title,
    dueDate,
    doDate,
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
  } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fileChange = (e) => {
    setFiles(e.target.files[0]);
  };
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
            onChange={onChange}
          />
        </S.FNLabel>
        <S.FNLabel>
          {" "}
          학교선택
          <S.FNSchool
            name="schoolId"
            defaultValue={"DEFAULT"}
            onChange={onChange}
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
        <S.FNLabel>
          {" "}
          작성자
          <S.FNauthor
            name="businessProfiledId"
            defaultValue={"DEFAULT"}
            onChange={onChange}
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
          모집기간
          <S.FNdueDate
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
          />
        </S.FNLabel>
        <S.FNLabel>
          실험/설문날짜
          <S.FNdoDate
            type="datedoTime-local"
            name="doDate"
            value={doDate}
            onChange={onChange}
          />
        </S.FNLabel>
        <S.FNLabel>
          지급방법
          <S.FNpayment
            defaultValue={"DEFAULT"}
            name="payment"
            onChange={onChange}
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

        {payment === "CACHE" ? (
          <S.FNLabel>
            현금 액수
            <S.FNcache
              type="number"
              name="cache"
              value={cache}
              onChange={onChange}
            />
          </S.FNLabel>
        ) : payment === "GOODS" ? (
          <S.FNLabel>
            보상 종류{" "}
            <S.FNcache
              type="text"
              name="goods"
              value={goods}
              onChange={onChange}
            />
          </S.FNLabel>
        ) : null}

        <S.FNLabel>
          구인조건
          <S.FNcondition
            defaultValue={"DEFAULT"}
            name="condition"
            onChange={onChange}
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

        {condition === "true" ? (
          <S.FNLabel>
            구인조건 상세설명{" "}
            <S.FNconditionDetail
              type="text"
              name="conditionDetail"
              value={conditionDetail}
              onChange={onChange}
            />
          </S.FNLabel>
        ) : null}
        <S.FNLabel>
          소요시간{" "}
          <S.FNdoTime
            defaultValue={"DEFAULT"}
            name="doTime"
            onChange={onChange}
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
        <S.FNLabel>
          {" "}
          장소
          <S.FNplace
            placeholder="장소"
            type="text"
            name="place"
            value={place}
            onChange={onChange}
          />
        </S.FNLabel>
        <S.FNLabel>
          연락처
          <S.FNcontact name="contact" value={contact} onChange={onChange} />
        </S.FNLabel>
        <S.FNLabel>
          추가정보
          <S.FNdetailInfo
            name="content"
            placeholder="추가정보"
            rows="5"
            cols="33"
            value={content}
            onChange={onChange}
          />
        </S.FNLabel>
        <S.FNFile type="file" name="files" onChange={fileChange} />

        <S.FNcreateBtn
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await FNHandler(
              title,
              dueDate,
              doDate,
              payment,
              doTime,
              place,
              content,
              contact,
              files,
              schoolId,
              cache,
              goods
            );
          }}
        >
          게시물 생성
        </S.FNcreateBtn>
      </S.FNBottomWrapper>
    </>
  );
}
export default PFNContainer;
