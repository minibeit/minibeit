import React, { useState } from "react";

import Presenter from "./presenter";

export default function FeedInfoContainer({
  feedDetailData,
  sliderSwitch,
  setSliderSwitch,
  date,
  editDetail,
}) {
  const [editSwitch, setEditSwitch] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [newContent, setNewContent] = useState(
    feedDetailData.updatedContent
      ? feedDetailData.updatedContent
      : feedDetailData.content
  );

  const editSubmit = () => {
    editDetail(feedDetailData.id, newContent);
    setEditSwitch(false);
    setEditAlert(false);
  };

  const [currentImg, setCurrentImg] = useState(0);
  const imgOnClick = (e) => {
    setSliderSwitch(true);
    setCurrentImg(
      feedDetailData.files.findIndex((i) => i.url === e.target.src) !== -1
        ? feedDetailData.files.findIndex((i) => i.url === e.target.src)
        : 4
    );
  };
  return (
    <Presenter
      id={feedDetailData.id}
      startDate={feedDetailData.startDate}
      endDate={feedDetailData.endDate}
      recruitCondition={feedDetailData.recruitCondition}
      recruitConditionDetail={feedDetailData.recruitConditionDetail}
      payment={feedDetailData.payment}
      cache={feedDetailData.cache}
      goods={feedDetailData.goods}
      paymentDetail={feedDetailData.paymentDetail}
      isMine={feedDetailData.isMine}
      updatedContent={feedDetailData.updatedContent}
      content={feedDetailData.content}
      files={feedDetailData.files}
      place={feedDetailData.place}
      contact={feedDetailData.contact}
      businessProfileInfo={feedDetailData.businessProfileInfo}
      editSwitch={editSwitch}
      feedDetailData={feedDetailData}
      date={date}
      setEditSwitch={setEditSwitch}
      setNewContent={setNewContent}
      editSubmit={editSubmit}
      currentImg={currentImg}
      sliderSwitch={sliderSwitch}
      setSliderSwitch={setSliderSwitch}
      imgOnClick={imgOnClick}
      editAlert={editAlert}
      setEditAlert={setEditAlert}
    />
  );
}
