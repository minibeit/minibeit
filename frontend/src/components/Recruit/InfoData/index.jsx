import React, { useState } from "react";
import toast from "react-hot-toast";

import Presenter from "./presenter";

export default function InfoData({
  recruit,
  setRecruit,
  submit,
  clickSubmit,
  movePage,
  setAskComplete,
  askComplete,
  setNotEnough,
  notEnough,
}) {
  const [addressModal, setAddressModal] = useState(false);

  const addConditionDetail = () => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr.push("");
    copy.conditionDetail = arr;
    setRecruit(copy);
  };
  const writeCondition = (e) => {
    const copy = { ...recruit };
    const arr = [...copy.conditionDetail];
    arr[e.target.id] = e.target.value;
    copy.conditionDetail = arr;
    setRecruit(copy);
  };

  const conditionSwitch = (e) => {
    const copy = { ...recruit };
    copy.condition = e;
    setRecruit(copy);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...recruit };
    copy[name] = e.target.value;
    setRecruit(copy);
  };

  const fileChange = (e) => {
    const copy = { ...recruit };
    const imgArr = [...copy.images];
    if (imgArr.length >= 10) {
      toast.error("이미지는 10개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        copy.images = [...imgArr, e.target.files[0]];
        setRecruit(copy);
      }
    }
  };

  const deleteImg = (idx) => {
    const copy = { ...recruit };
    const imgArr = [...copy.images];
    imgArr.splice(idx, 1);
    copy.images = imgArr;
    setRecruit(copy);
  };

  return (
    <Presenter
      onChange={onChange}
      recruit={recruit}
      setRecruit={setRecruit}
      conditionSwitch={conditionSwitch}
      writeCondition={writeCondition}
      addConditionDetail={addConditionDetail}
      fileChange={fileChange}
      deleteImg={deleteImg}
      setAddressModal={setAddressModal}
      addressModal={addressModal}
      submit={submit}
      setAskComplete={setAskComplete}
      askComplete={askComplete}
      clickSubmit={clickSubmit}
      movePage={movePage}
      notEnough={notEnough}
      setNotEnough={setNotEnough}
    />
  );
}
