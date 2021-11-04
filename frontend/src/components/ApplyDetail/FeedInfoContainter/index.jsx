import React, { useState } from "react";

import Presenter from "./presenter";

export default function FeedInfoContainer({
  feedDetailData,
  date,
  editDetail,
}) {
  const [editSwitch, setEditSwitch] = useState(false);
  const [newContent, setNewContent] = useState(
    feedDetailData.updatedContent
      ? feedDetailData.updatedContent
      : feedDetailData.content
  );

  const editSubmit = () => {
    editDetail(feedDetailData.id, newContent);
    setEditSwitch(false);
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
    />
  );
}
