import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import * as S from "../style";

function PFNContainer({ schoolList, FNHandler }) {
  console.log(schoolList);
  const author = useRecoilValue(userState).name;
  const [inputs, setInputs] = useState({
    title: "",
    dueDate: "",
    doDate: "",
    pay: "",
    time: "",
    place: "",
    content: "",
    phoneNum: "",
    school: "",
  });
  const [files, setFiles] = useState();
  const {
    title,
    dueDate,
    doDate,
    pay,
    time,
    place,
    content,
    phoneNum,
    school,
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
    console.log(e.target.files[0]);
  };
  return (
    <>
      <S.FNBottomWrapper>
        <S.FNTitle
          placeholder="제목"
          name="title"
          type="text"
          value={title || ""}
          onChange={onChange}
        />
        <S.FNSchool name="school" defaultValue={"DEFAULT"} onChange={onChange}>
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

        <S.FNauthor>
          <p>작성자 : {author}</p>
        </S.FNauthor>
        <p>모집기간</p>
        <S.FNdueDate
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={onChange}
        />
        <p>실험/설문날짜</p>
        <S.FNdoDate
          type="datetime-local"
          name="doDate"
          value={doDate}
          onChange={onChange}
        />
        <p>급여</p>
        <S.FNpay type="number" name="pay" value={pay} onChange={onChange} />
        <p>소요시간</p>
        <S.FNtime type="number" name="time" value={time} onChange={onChange} />
        <S.FNplace
          placeholder="장소"
          type="text"
          name="place"
          value={place}
          onChange={onChange}
        />
        <p>연락처</p>
        <S.FNcontact name="phoneNum" value={phoneNum} onChange={onChange} />
        <S.FNdetailInfo
          name="content"
          placeholder="추가정보"
          rows="5"
          cols="33"
          value={content}
          onChange={onChange}
        />
        <S.FNFile type="file" name="files" onChange={fileChange} />
        <S.FNcreateBtn
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await FNHandler(
              title,
              dueDate,
              doDate,
              pay,
              time,
              place,
              content,
              phoneNum,
              files,
              school
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
