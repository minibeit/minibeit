import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import * as S from "../style";

function PFEContainer({ post, FEHandler }) {
  const author = useRecoilValue(userState).name;
  const {
    content,
    doDate,
    dueDate,
    id,
    isMine,
    contact,
    pay,
    place,
    time,
    title,
    images,
  } = post;
  console.log(post, title);
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

  console.log(inputs);
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
    console.log(inputs);
  }, []);

  const [files, setFiles] = useState();

  console.log(title);
  const onChange = (e) => {
    console.log(inputs);
    const { value, name } = e.target;
    console.log(name, value);
    if (name == "doDate") {
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
    console.log(e.target.files[0]);
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
            await FEHandler(
              title,
              dueDate,
              doDate,
              pay,
              time,
              place,
              content,
              contact,
              files
            );
          }}
        >
          게시물 수정
        </S.FEeditBtn>
      </S.FEBottomWrapper>
    </>
  );
}
export default PFEContainer;
