import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";

export default function FilterAndList() {
  const [feedList, setFeedList] = useState();

  const getFeedList = async (page, schoolId, date, filter, category) => {
    await feedlistApi(page, schoolId, date, filter, category)
      .then((res) => {
        setFeedList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postBookmark = async (postId, req) => {
    await bookmarkApi(postId, req)
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PFilterContainer getFeedList={getFeedList} />
      {feedList ? (
        <PListContainer feedList={feedList} postBookmark={postBookmark} />
      ) : null}
    </>
  );
}
