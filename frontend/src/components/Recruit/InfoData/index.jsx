import React, { useState } from "react";

import Presenter from "./presenter";

export default function InfoData({ recruit, setRecruit, submit, clickSubmit, movePage, setAskComplete, askComplete}) {
  const [addressModal, setAddressModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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

  const conditionSwitch = () => {
    const copy = { ...recruit };
    copy.condition = !recruit.condition;
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
      alert("이미지는 10개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        copy.images = [...imgArr, e.target.files[0]];
        setRecruit(copy);
      }
    }
  };

  const deleteImg = (e) => {
    var target;
    if (e.target.nodeName === "svg") {
      target = e.target.parentNode;
    } else if (e.target.nodeName === "path") {
      target = e.target.parentNode.parentNode;
    } else {
      target = e.target;
    }
    const copy = { ...recruit };
    const targetFile = copy.images.find((ele) => ele.name === target.name);
    copy.images.splice(copy.images.indexOf(targetFile), 1);
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
      setConfirmModal={setConfirmModal}
      confirmModal={confirmModal}
      submit={submit}
      setAskComplete={setAskComplete}
      askComplete={askComplete}
      clickSubmit={clickSubmit}
      movePage={movePage}
    />
  );
}
