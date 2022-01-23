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

  const urlFilter = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const replace = (content) => {
      const convertContent = content.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + "</a>";
      });
      const htmlArr = [];
      convertContent.split("\n").forEach(function (text) {
        const textHtml = "<p>" + text + "</p>";
        htmlArr.push(textHtml);
      });
      return { __html: htmlArr.join("") };
    };
    return (
      <div>
        <div dangerouslySetInnerHTML={replace(text)}></div>
      </div>
    );
  };

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
      urlFilter={urlFilter}
    />
  );
}
