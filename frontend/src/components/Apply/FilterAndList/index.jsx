import React, { useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";
import PBtnContainer from "./PBtnContainer";

export default function FilterAndList() {
  const [feedList, setFeedList] = useState();
  const [totalPages, setTotalPages] = useState();

  const getFeedList = async (page, schoolId, date, payment) => {
    await feedlistApi(page, schoolId, date, payment)
      .then((res) => {
        setFeedList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postBookmark = async (postId, req) => {
    await bookmarkApi(postId, req)
      .then((res) => {})
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
      {totalPages ? (
        <PBtnContainer totalPages={totalPages} getFeedList={getFeedList} />
      ) : null}
    </>
  );
}
