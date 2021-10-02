import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import * as S from "../style";

function PFEContainer({ post, FEHandler }) {
  const author = useRecoilValue(userState).name;
  const { content, doDate, dueDate, contact, pay, place, time } = post;
  const [inputs, setInputs] = useState({
    title: post.title,
    dueDate: dueDate,
    doDate: doDate || "",
    pay: pay || "",
    time: time || "",
    place: place || "",
    content: content || "",
    phoneNum: contact || "",
  });

  useEffect(() => {
    setInputs({
      title: post.title,
      dueDate: post.dueDate,
      doDate: post.doDate,
      pay: pay,
      time: time,
      place: place,
      content: content,
      phoneNum: contact,
    });
  }, [
    contact,
    content,
    inputs,
    pay,
    place,
    post.doDate,
    post.dueDate,
    post.title,
    time,
  ]);

  const [files, setFiles] = useState();

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "doDate") {
      setInputs({
        ...inputs,
        [name]: value + ":00",
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };
  const fileChange = (e) => {
    setFiles(e.target.files[0]);
  };
  return (
    <>
      <S.FEBottomWrapper>
        <S.FETitle
          placeholder="제목"
          name="title"
          type="text"
          value={inputs.title}
          onChange={onChange}
        />
        <S.FEauthor>
          <p>작성자 : {author}</p>
        </S.FEauthor>
        <p>모집기간</p>
        <S.FEdueDate
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={onChange}
        />
        <p>실험/설문날짜</p>
        <S.FEdoDate
          type="datetime-local"
          name="doDate"
          value={doDate}
          onChange={onChange}
        />
        <p>급여</p>
        <S.FEpay type="number" name="pay" value={pay} onChange={onChange} />
        <p>소요시간</p>
        <S.FEtime type="number" name="time" value={time} onChange={onChange} />
        <S.FEplace
          placeholder="장소"
          type="text"
          name="place"
          value={place}
          onChange={onChange}
        />
        <p>연락처</p>
        <S.FEcontact name="phoneNum" value={contact} onChange={onChange} />
        <S.FEdetailInfo
          name="content"
          placeholder="추가정보"
          rows="5"
          cols="33"
          value={content}
          onChange={onChange}
        />
        <S.FEFile type="file" name="files" onChange={fileChange} />
        <S.FEeditBtn
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await FEHandler(inputs, files);
          }}
        >
          게시물 수정
        </S.FEeditBtn>
      </S.FEBottomWrapper>
    </>
  );
}
export default PFEContainer;
