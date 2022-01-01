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
      address={feedDetailData.address}
      addressDetail={feedDetailData.addressDetail}
      contact={feedDetailData.contact}
      businessProfileInfo={feedDetailData.businessProfileInfo}
      editSwitch={editSwitch}
      date={date}
      setEditSwitch={setEditSwitch}
      setNewContent={setNewContent}
      editSubmit={editSubmit}
      sliderSwitch={sliderSwitch}
      setSliderSwitch={setSliderSwitch}
      editAlert={editAlert}
      setEditAlert={setEditAlert}
    />
  );
}
