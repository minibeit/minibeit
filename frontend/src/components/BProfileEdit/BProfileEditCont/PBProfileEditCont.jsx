import React, { useEffect, useState } from "react";
import { getBprofileInfo } from "../../../utils";
import * as S from "../style";

export default function PBProfileEditCont({ businessId, bpEditHandler }) {
  const [imgBase64, setImgBase64] = useState();
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState();
  const [prevsrc, setprevsrc] = useState();
  const [iscancel, setiscancel] = useState(false);
  const getProfile = async () => {
    try {
      const result = await getBprofileInfo(businessId);
      const data = result.data;
      if (data) {
        setInputs({
          name: data.name,
          category: data.category,
          place: data.place,
          introduce: data.introduce,
          contact: data.contact,
          avatarChanged: false,
        });
        setprevsrc(data.avatar);
        console.log(data.avatar, prevsrc);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  console.log(prevsrc);

  console.log(prevsrc === null);
  console.log(inputs);
  useEffect(() => {
    getProfile();
  }, []);
  console.log(prevsrc);
  console.log(inputs);
  const { category, place, introduce, contact } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fileChange = (e) => {
    if (e.target.files.length !== 0) {
      setiscancel(false);
      let reader = new FileReader();
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        setInputs({
          ...inputs,
          avatarChanged: true,
          avatar: e.target.files[0],
        });
        setImg(e.target.files[0]);
      }
    } else {
      setInputs({
        ...inputs,
        avatarChanged: false,
        avatar: undefined,
      });
      console.log("hwt");
      setiscancel(true);
    }
  };

  return (
    <>
      <S.BPEditCont>
        <S.BPEditInput
          value={inputs.name || ""}
          name="name"
          type="text"
          placeholder="실험실 이름"
          onChange={onChange}
        />
        <S.BPEditInput
          value={category || ""}
          name="category"
          type="text"
          placeholder="카테고리"
          onChange={onChange}
        />
        <S.BPEditInput
          value={place || ""}
          name="place"
          type="text"
          placeholder="장소"
          onChange={onChange}
        />
        <S.BPEditInput
          value={introduce || ""}
          name="introduce"
          type="text"
          placeholder="실험실 소개"
          onChange={onChange}
        />
        <S.BPEditInput
          value={contact || ""}
          name="contact"
          type="text"
          placeholder="연락처"
          onChange={onChange}
        />
        {prevsrc !== null ? (
          imgBase64 !== undefined ? (
            iscancel === false ? (
              <S.BPEditNewImg src={imgBase64} />
            ) : (
              <S.BPEditImg src={prevsrc} />
            )
          ) : (
            <S.BPEditImg src={prevsrc} />
          )
        ) : (
          <S.BPEditImgBox />
        )}
        <S.BPEditInput name="img" type="file" onChange={fileChange} />
        <S.BPEditButton
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await bpEditHandler(inputs, img);
          }}
        >
          수정하기
        </S.BPEditButton>
      </S.BPEditCont>
    </>
  );
}
